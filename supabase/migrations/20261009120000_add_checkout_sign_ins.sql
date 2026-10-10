-- One row per Stripe Checkout Session that was used to auto sign in a guest
-- buyer on the confirmation page (src/lib/fulfillCheckout.ts). The primary
-- key makes that sign-in one-time: reloading the page or reusing the
-- session_id link can't log anyone in again.
--
-- Server-only (service role). RLS on with no policies so the anon/auth keys
-- can't read or write it.

create table public.checkout_sign_ins (
  session_id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.checkout_sign_ins enable row level security;
