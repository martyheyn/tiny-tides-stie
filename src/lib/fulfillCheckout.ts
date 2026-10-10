import type Stripe from 'stripe'
import type { AstroCookies } from 'astro'
import { createBEClient, createServiceRoleClient } from './SupabaseServer'

// Only sign a guest buyer in from the confirmation page shortly after they
// paid -- the session_id sits in the URL/browser history, so an old link
// shouldn't keep working as a login.
const AUTO_SIGN_IN_WINDOW_MS = 60 * 60 * 1000

export type FulfilledCheckout = {
  userId: string
  email: string
  // True when the account owned nothing before this checkout (brand-new
  // accounts included). Only these get signed in automatically: the account
  // then holds nothing but what this buyer just paid for. An account that
  // already owned a course must sign in with an emailed code -- otherwise
  // anyone could get into it just by paying with its email address.
  isFirstPurchase: boolean
}

// Returns the id of the account for `email`, creating the account (already
// confirmed, no email sent) if needed. The on_auth_user_created trigger
// creates the profile row.
async function findOrCreateUserIdByEmail(email: string): Promise<string> {
  const serviceClient = createServiceRoleClient()
  const admin = serviceClient.auth.admin

  // profile.email mirrors auth.users.email (see add_profile_email migration),
  // and reading it has no side effects.
  const { data: profile } = await serviceClient
    .from('profile')
    .select('id')
    .eq('email', email)
    .maybeSingle()
  if (profile) return profile.id

  const { data: created, error: createError } = await admin.createUser({
    email,
    email_confirm: true,
  })
  if (created.user) return created.user.id

  if (createError?.code !== 'email_exists') {
    throw new Error(`createUser failed: ${createError?.message}`)
  }

  // Last resort for older accounts that have no profile row: supabase-js has
  // no admin "get user by email", but generating a magic link returns the
  // user (no email is sent). Avoided above because it replaces the user's
  // pending one-time token, which would invalidate a sign-in code they were
  // just emailed.
  const { data: link, error: linkError } = await admin.generateLink({
    type: 'magiclink',
    email,
  })
  if (!link.user) {
    throw new Error(`generateLink failed: ${linkError?.message}`)
  }
  return link.user.id
}

// Records the purchase for a paid Checkout Session. Idempotent and safe to run
// concurrently: both the Stripe webhook and the confirmation page call it,
// because the buyer often lands on the confirmation page before the webhook
// has arrived (or the webhook arrives without them ever coming back).
export async function fulfillCheckoutSession(
  session: Stripe.Checkout.Session,
): Promise<FulfilledCheckout> {
  const metadata = session.metadata ?? {}
  const courseId = metadata.course_id
  const email = session.customer_details?.email?.trim().toLowerCase()

  if (!courseId) {
    throw new Error(`Checkout session ${session.id} is missing course_id metadata`)
  }

  let userId = metadata.user_id

  // Guest checkout: no account yet at checkout time, so key it on the email
  // the buyer gave Stripe.
  if (!userId) {
    if (!email) {
      throw new Error(`Guest checkout session ${session.id} has no customer email`)
    }
    userId = await findOrCreateUserIdByEmail(email)
  }

  const serviceClient = createServiceRoleClient()

  // "Before this checkout" is judged by the Stripe session's creation time
  // rather than by whether our insert below succeeds, so the answer is the
  // same whether the webhook or the confirmation page gets here first.
  const { count: priorPurchases, error: priorError } = await serviceClient
    .from('purchases')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .lt('created_at', new Date(session.created * 1000).toISOString())
  if (priorError) {
    throw new Error(`prior purchases lookup failed: ${priorError.message}`)
  }
  const isFirstPurchase = (priorPurchases ?? 0) === 0

  const { error } = await serviceClient
    .from('purchases')
    .insert({ user_id: userId, course_id: courseId, created_at: new Date() })

  // 23505 = unique (user_id, course_id) -- already recorded by the other caller
  // or an earlier webhook delivery.
  if (error && error.code !== '23505') {
    throw new Error(`purchases insert failed: ${error.message}`)
  }

  return { userId, email: email ?? '', isFirstPurchase }
}

// Signs the guest buyer in on this response (sets the session cookies). Returns
// false when auto sign-in isn't allowed or fails -- callers then ask the buyer
// to sign in with an emailed code instead.
export async function signInGuestBuyer({
  session,
  fulfilled,
  request,
  cookies,
}: {
  session: Stripe.Checkout.Session
  fulfilled: FulfilledCheckout
  request: Request
  cookies: AstroCookies
}): Promise<boolean> {
  if (!fulfilled.isFirstPurchase || !fulfilled.email) return false
  if (Date.now() - session.created * 1000 > AUTO_SIGN_IN_WINDOW_MS) return false

  const serviceClient = createServiceRoleClient()

  // One sign-in per checkout session: the primary key makes a second insert
  // (reload, shared link, back button) fail.
  const { error: claimError } = await serviceClient
    .from('checkout_sign_ins')
    .insert({ session_id: session.id, user_id: fulfilled.userId })
  if (claimError) {
    if (claimError.code !== '23505') {
      console.error('[signInGuestBuyer] claim failed', { code: claimError.code, message: claimError.message })
    }
    return false
  }

  const { data: link, error: linkError } = await serviceClient.auth.admin.generateLink({
    type: 'magiclink',
    email: fulfilled.email,
  })
  const tokenHash = link.properties?.hashed_token
  if (!tokenHash) {
    console.error('[signInGuestBuyer] generateLink failed', { message: linkError?.message })
    return false
  }

  const { error: verifyError } = await createBEClient({ request, cookies }).auth.verifyOtp({
    token_hash: tokenHash,
    type: 'magiclink',
  })
  if (verifyError) {
    console.error('[signInGuestBuyer] verifyOtp failed', { code: verifyError.code, message: verifyError.message })
    return false
  }

  return true
}
