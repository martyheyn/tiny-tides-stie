-- Stripe test-mode and live-mode object IDs are separate namespaces, so a single
-- price_id column can't work across a local (test key) and production (live key)
-- environment sharing the same Supabase project. Split into mode-specific columns.

alter table public.course
  add column price_id_test text,
  add column price_id_live text;

-- Any existing price_id was set against a live-mode key (per the "No such price"
-- error seen when using it with a test-mode secret key), so carry it over as-is.
update public.course
  set price_id_live = price_id
  where price_id is not null;

alter table public.course
  drop column price_id;

comment on column public.course.price_id_test is 'Stripe Price ID (test mode) for one-time course purchase.';
comment on column public.course.price_id_live is 'Stripe Price ID (live mode) for one-time course purchase.';
