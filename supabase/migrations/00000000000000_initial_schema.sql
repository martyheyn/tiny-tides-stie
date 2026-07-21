-- Reconstructed schema for the Tiny Tides courses feature.
--
-- The original Supabase project was deleted. This file was rebuilt entirely
-- from how src/lib/**, src/pages/api/**, and the course Svelte components
-- query the database (see PLAN in project history for the call-site trace).
-- Run this once against a fresh Supabase project, then fill in the
-- `-- TODO` seed rows below with real course content.

create extension if not exists pgcrypto;

-- ============================================================================
-- Tables
-- ============================================================================

create table public.course (
  id uuid primary key,                 -- must equal courses-md frontmatter `id`
  name text not null,
  slug text not null unique,
  price_id text                        -- Stripe Price ID, fill in per course
);

create table public.section (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.course (id) on delete cascade,
  slug text not null,
  label text not null,
  description text,
  section_order int not null
);

create index section_course_id_idx on public.section (course_id);

create table public.video (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.course (id) on delete cascade,
  section_id uuid not null references public.section (id) on delete cascade,
  slug text not null,
  name text not null,
  host_url text not null,              -- CloudFront object key
  length int,                          -- seconds
  video_order int not null
);

create index video_course_id_idx on public.video (course_id);
create index video_section_id_idx on public.video (section_id);

create table public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id uuid not null references public.course (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create index purchases_user_id_idx on public.purchases (user_id);

-- Superset of the two column sets used in the app:
--   loadCourses.ts        -> user_id, course_id, section_id, video_slug, updated_at
--   Video.svelte          -> id, user_id, video_id, progress_seconds, completed
create table public.video_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  video_id uuid references public.video (id) on delete cascade,
  course_id uuid references public.course (id) on delete cascade,
  section_id uuid references public.section (id) on delete cascade,
  video_slug text,
  progress_seconds numeric,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (user_id, video_id)
);

create index video_progress_user_id_idx on public.video_progress (user_id);

create table public.profile (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  updated_at timestamptz
);

-- A single code can be shared by many beta testers, scoped to one course.
-- Redemption grants free access by inserting straight into `purchases`
-- (see redeem_beta_code() below), so every existing purchase-gated query
-- (loadCourses.ts, getCourseVideo.ts, video-url.ts, [course].astro) works
-- unchanged for beta testers.
create table public.beta_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  course_id uuid not null references public.course (id) on delete cascade,
  max_redemptions int not null default 1,
  active boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.beta_code_redemptions (
  id uuid primary key default gen_random_uuid(),
  beta_code_id uuid not null references public.beta_codes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  redeemed_at timestamptz not null default now(),
  unique (beta_code_id, user_id)
);

create index beta_code_redemptions_user_id_idx on public.beta_code_redemptions (user_id);

-- ============================================================================
-- View: section_with_progress
--
-- Chapters + embedded videos with per-user completion, derived from
-- auth.uid() rather than an explicit filter (getCourseVideo.ts and
-- [course].astro both select('*') with no user_id filter, so the view must
-- resolve the current user itself). security_invoker keeps RLS applied under
-- the querying user, so auth.uid() reflects the caller, not the view owner.
-- ============================================================================

create or replace view public.section_with_progress
with (security_invoker = on) as
select
  s.id as section_id,
  s.label,
  s.slug,
  s.description,
  s.section_order,
  s.course_id,
  count(v.id) as total_videos,
  count(v.id) filter (where coalesce(vp.completed, false)) as completed_videos,
  coalesce(
    jsonb_agg(
      jsonb_build_object(
        'id', v.id,
        'name', v.name,
        'slug', v.slug,
        'host_url', v.host_url,
        'length', v.length,
        'completed', coalesce(vp.completed, false),
        'video_order', v.video_order
      )
      order by v.video_order
    ) filter (where v.id is not null),
    '[]'::jsonb
  ) as videos
from public.section s
left join public.video v on v.section_id = s.id
left join public.video_progress vp
  on vp.video_id = v.id and vp.user_id = auth.uid()
group by s.id, s.label, s.slug, s.description, s.section_order, s.course_id;

-- ============================================================================
-- Row Level Security
-- ============================================================================

alter table public.course enable row level security;
alter table public.section enable row level security;
alter table public.video enable row level security;
alter table public.purchases enable row level security;
alter table public.video_progress enable row level security;
alter table public.profile enable row level security;
alter table public.beta_codes enable row level security;
alter table public.beta_code_redemptions enable row level security;

-- Course catalog is public (listing/detail pages render for anonymous visitors;
-- actual video playback is gated separately by signed CloudFront URLs).
create policy "course readable by anyone" on public.course
  for select using (true);

create policy "section readable by anyone" on public.section
  for select using (true);

create policy "video readable by anyone" on public.video
  for select using (true);

-- purchases: only the Stripe webhook writes (via SUPABASE_SERVICE_ROLE_KEY,
-- which bypasses RLS entirely) -- no client-facing insert/update policy.
create policy "users read their own purchases" on public.purchases
  for select using (auth.uid() = user_id);

create policy "users read their own progress" on public.video_progress
  for select using (auth.uid() = user_id);
create policy "users insert their own progress" on public.video_progress
  for insert with check (auth.uid() = user_id);
create policy "users update their own progress" on public.video_progress
  for update using (auth.uid() = user_id);

create policy "users read their own profile" on public.profile
  for select using (auth.uid() = id);
create policy "users update their own profile" on public.profile
  for update using (auth.uid() = id);

-- No policies on beta_codes: it stays inaccessible to anon/authenticated
-- clients (admin/SQL-editor only) so codes can't be enumerated and redemption
-- can only happen through the validated redeem_beta_code() RPC below.

create policy "users read their own redemptions" on public.beta_code_redemptions
  for select using (auth.uid() = user_id);

-- ============================================================================
-- Trigger: auto-create a profile row on signup
--
-- Profile.svelte upserts onConflict: 'id' -- this guarantees a row already
-- exists so that upsert always resolves to an update, and client code never
-- needs an insert policy on profile.
-- ============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profile (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- Function: redeem_beta_code
--
-- The only way a beta code turns into course access. Runs as security
-- definer so it can insert into `purchases` on the caller's behalf (normal
-- authenticated clients have no insert policy there -- only the Stripe
-- webhook, via the service-role key, writes purchases directly). Call from
-- the client with: supabase.rpc('redeem_beta_code', { p_code: 'SOME-CODE' })
-- ============================================================================

create or replace function public.redeem_beta_code(p_code text)
returns uuid -- course_id granted
language plpgsql
security definer set search_path = public
as $$
declare
  v_code public.beta_codes%rowtype;
  v_redemptions int;
begin
  if auth.uid() is null then
    raise exception 'must be signed in to redeem a code';
  end if;

  select * into v_code
  from public.beta_codes
  where code = upper(trim(p_code))
  for update; -- lock the row so concurrent redemptions can't race past max_redemptions

  if not found or not v_code.active then
    raise exception 'invalid beta code';
  end if;

  if v_code.expires_at is not null and v_code.expires_at <= now() then
    raise exception 'this beta code has expired';
  end if;

  select count(*) into v_redemptions
  from public.beta_code_redemptions
  where beta_code_id = v_code.id;

  if v_redemptions >= v_code.max_redemptions then
    raise exception 'this beta code has already been fully redeemed';
  end if;

  if exists (
    select 1 from public.purchases
    where user_id = auth.uid() and course_id = v_code.course_id
  ) then
    raise exception 'you already have access to this course';
  end if;

  insert into public.purchases (user_id, course_id) values (auth.uid(), v_code.course_id);
  insert into public.beta_code_redemptions (beta_code_id, user_id) values (v_code.id, auth.uid());

  return v_code.course_id;
end;
$$;

revoke all on function public.redeem_beta_code(text) from public;
grant execute on function public.redeem_beta_code(text) to authenticated;

-- ============================================================================
-- Seed data
-- ============================================================================

insert into public.course (id, name, slug, price_id) values
  ('4f246168-7ca8-4544-a9f4-3d496f3aea00', 'Intro to Solids', 'intro-to-solids', null),
  ('785adc72-276c-4865-804a-171670a015ab', 'Lactation Help', 'lactation-help', null);
-- TODO: set real price_id (Stripe Price ID) for each course above.

-- TODO: the section/video rows below are placeholders so the app doesn't 404
-- on first_chapter/first_video from courses-md frontmatter. Replace label,
-- description, host_url, name, and length with real content, and add the
-- remaining chapters/videos for each course.

with new_section as (
  insert into public.section (course_id, slug, label, description, section_order)
  values (
    '4f246168-7ca8-4544-a9f4-3d496f3aea00',
    'eat-this',
    'TODO: chapter label',
    'TODO: chapter description',
    1
  )
  returning id
)
insert into public.video (course_id, section_id, slug, name, host_url, length, video_order)
select
  '4f246168-7ca8-4544-a9f4-3d496f3aea00',
  new_section.id,
  'play-with-food',
  'TODO: video name',
  'TODO: replace with CloudFront object key',
  null,
  1
from new_section;

-- TODO: pick real codes (and adjust max_redemptions/expires_at) before
-- sharing with beta testers -- these placeholders let 20 people each redeem
-- one course for free, with no expiration.
insert into public.beta_codes (code, course_id, max_redemptions, expires_at) values
  ('BETA-INTRO-SOLIDS', '4f246168-7ca8-4544-a9f4-3d496f3aea00', 20, null),
  ('BETA-LACTATION', '785adc72-276c-4865-804a-171670a015ab', 20, null);

with new_section as (
  insert into public.section (course_id, slug, label, description, section_order)
  values (
    '785adc72-276c-4865-804a-171670a015ab',
    'lactation-1',
    'TODO: chapter label',
    'TODO: chapter description',
    1
  )
  returning id
)
insert into public.video (course_id, section_id, slug, name, host_url, length, video_order)
select
  '785adc72-276c-4865-804a-171670a015ab',
  new_section.id,
  'lactation-class-vid-1',
  'TODO: video name',
  'TODO: replace with CloudFront object key',
  null,
  1
from new_section;
