-- Log of magic-link/OTP requests, used to rate limit POST /api/auth/magiclink
-- (prevents unlimited OTP-email spam / email enumeration). Written and read
-- only via the service-role client, same pattern as beta_codes.

create table public.otp_request_log (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  ip text,
  created_at timestamptz not null default now()
);

create index otp_request_log_email_created_at_idx on public.otp_request_log (email, created_at);
create index otp_request_log_ip_created_at_idx on public.otp_request_log (ip, created_at);

alter table public.otp_request_log enable row level security;
-- No policies: inaccessible to anon/authenticated clients, service-role only.
