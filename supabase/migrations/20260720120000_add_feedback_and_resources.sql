-- Downloadable course resources + post-course feedback.
--
-- `resource` supports course-level resources now (section_id null) and lets a
-- future course attach a resource to a specific section without a schema
-- change. Actual file bytes live in the private 'course-resources' storage
-- bucket and are only ever served through a purchase-gated signed URL (see
-- src/pages/api/resource-url.ts), same pattern as CloudFront-signed videos.

create table public.resource (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.course (id) on delete cascade,
  section_id uuid references public.section (id) on delete cascade,
  name text not null,
  storage_path text not null,
  file_type text,
  resource_order int not null default 0,
  created_at timestamptz not null default now()
);

create index resource_course_id_idx on public.resource (course_id);
create index resource_section_id_idx on public.resource (section_id);

create table public.feedback (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.course (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  text text not null,
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create index feedback_user_id_idx on public.feedback (user_id);

alter table public.resource enable row level security;
alter table public.feedback enable row level security;

-- Metadata is public like course/section/video; the signed-URL endpoint is
-- what actually enforces purchase ownership.
create policy "resource readable by anyone" on public.resource
  for select using (true);

create policy "users read their own feedback" on public.feedback
  for select using (auth.uid() = user_id);
create policy "users insert their own feedback" on public.feedback
  for insert with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('course-resources', 'course-resources', false)
on conflict (id) do nothing;

-- TODO: replace storage_path with the real uploaded object key once the PDF
-- is in the 'course-resources' bucket.
insert into public.resource (course_id, name, storage_path, file_type, resource_order) values
  ('4f246168-7ca8-4544-a9f4-3d496f3aea00', 'Intro to Solids Resource Guide', 'intro-to-solids/TODO-resource-guide.pdf', 'pdf', 1);
