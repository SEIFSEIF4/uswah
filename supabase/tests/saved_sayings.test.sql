begin;

select plan(6);

insert into auth.users (id, instance_id, aud, role)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated');

insert into sayings (id, slug, saying, grade, published_at)
values ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'save-test', 'Save test', 'sahih', now());

set local role anon;
select throws_ok(
  $$select count(*) from saved_sayings$$,
  '42501',
  null,
  'anon cannot read saved sayings'
);
select throws_ok(
  $$insert into saved_sayings (user_id, saying_id)
    values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-cccc-cccc-cccc-cccccccccccc')$$,
  '42501',
  null,
  'anon cannot insert saved sayings'
);
reset role;

select is(
  has_table_privilege('authenticated', 'public.saved_sayings', 'update'),
  false,
  'authenticated cannot update saved sayings'
);

select set_config('request.jwt.claim.sub', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', true);
set local role authenticated;
insert into saved_sayings (user_id, saying_id)
values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-cccc-cccc-cccc-cccccccccccc');
select is((select count(*) from saved_sayings), 1::bigint, 'owner can read own save');

select set_config('request.jwt.claim.sub', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', true);
select is((select count(*) from saved_sayings), 0::bigint, 'another user cannot read the save');
delete from saved_sayings
where saying_id = 'cccccccc-cccc-cccc-cccc-cccccccccccc';

reset role;
select set_config('request.jwt.claim.sub', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', true);
set local role authenticated;
select is((select count(*) from saved_sayings), 1::bigint, 'another user cannot delete the save');

reset role;
select * from finish();
rollback;
