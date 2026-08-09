-- Run against a scratch database that has the migration applied:
--   psql -d postgres -c 'drop database if exists uswah_test' -c 'create database uswah_test'
--   psql -q -d uswah_test -c "create schema auth; create table auth.users(id uuid primary key);
--     create function auth.uid() returns uuid language sql stable as \$\$ select null::uuid \$\$;"
--   psql -v ON_ERROR_STOP=1 -d uswah_test -f supabase/migrations/20260810000000_init.sql
--   psql -v ON_ERROR_STOP=1 -d uswah_test -f supabase/tests/schema_test.sql
--
-- Fails loudly on the two things that silently break in production: Arabic search
-- missing rows over hamza spelling, and drafts leaking to anonymous readers.

insert into situations (id, slug, published_at) values
  ('11111111-1111-1111-1111-111111111111', 'asked-for-money-again', now()),
  ('22222222-2222-2222-2222-222222222222', 'draft-not-live', null);

insert into situation_translations values
  ('11111111-1111-1111-1111-111111111111','ar','شخص بيطلب مني فلوس كل شوية','الإعتماد على النفس والسعي في الرزق'),
  ('11111111-1111-1111-1111-111111111111','en','Someone keeps asking me for money','Self-reliance and earning your own provision'),
  ('22222222-2222-2222-2222-222222222222','en','Unpublished','Should never appear');

do $$ begin
  -- query spelled without hamza must still find text stored with it
  assert (select count(*) from search_situations('الاعتماد', 'ar')) = 1, 'arabic search must normalize hamza';
  assert (select count(*) from search_situations('asking for money', 'en')) = 1, 'english search must match';
  assert (select count(*) from search_situations('Unpublished', 'en')) = 0, 'search must not return drafts';
end $$;

-- Supabase grants these already; a bare local cluster does not.
do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then create role anon nologin; end if;
end $$;
grant usage on schema public to anon;
grant select on all tables in schema public to anon;
grant execute on all functions in schema public to anon;

do $$ begin
  perform set_config('role', 'anon', true);
  assert (select count(*) from situations) = 1, 'anon sees published situations only';
  assert (select count(*) from situation_translations where title = 'Unpublished') = 0,
         'anon must not read draft translations';
  assert (select count(*) from saved_situations) = 0, 'anon must not read anyone''s saves';
  perform set_config('role', 'none', true);
end $$;

\echo '--- SCHEMA TESTS PASSED ---'
