-- Mirrors auth.users.email onto public.profile so it's queryable from the
-- public schema (e.g. admin views) without the service-role key.

alter table public.profile add column email text;

update public.profile p
set email = u.email
from auth.users u
where u.id = p.id;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profile (id, email) values (new.id, new.email);
  return new;
end;
$$;

-- Keep profile.email in sync if a user ever changes their auth email.
create or replace function public.handle_user_email_updated()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update public.profile set email = new.email where id = new.id;
  return new;
end;
$$;

create trigger on_auth_user_email_updated
  after update of email on auth.users
  for each row execute function public.handle_user_email_updated();
