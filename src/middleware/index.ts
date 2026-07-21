import { defineMiddleware } from 'astro:middleware'
import { createBEClient } from '../lib/SupabaseServer'

export const onRequest = defineMiddleware(async (context, next) => {
  const supabase = createBEClient({
    request: context.request,
    cookies: context.cookies,
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  context.locals.user = user
  return next()
})
