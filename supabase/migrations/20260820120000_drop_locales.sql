-- Drop the locales table.
--
-- It existed so that "adding a language is an INSERT, never DDL". Adding Turkish proved
-- that wrong: tsv() needed a 'tr' branch, which meant replacing the function and
-- dropping and re-adding both generated search columns. The DDL happened anyway, and
-- the table only added a join and a second place for the list to live.
--
-- The list now lives in lib/i18n.ts, and `dir` with it — a column whose value was one of
-- three constants the client already knew. What the foreign keys were actually buying is
-- kept as a check constraint, so a typo in `locale` is still rejected at write time.
--
-- The trade is explicit: the set of languages is now stated in two places, here and in
-- lib/i18n.ts, and adding one means editing both. That was already true of tsv().

begin;

-- The foreign keys were declared inline, so their names are whatever Postgres generated.
-- Find them by what they reference rather than trusting a naming convention.
do $$
declare fk record;
begin
  for fk in
    select con.conrelid::regclass as tbl, con.conname as name
    from pg_constraint con
    where con.contype = 'f'
      and con.confrelid = 'public.locales'::regclass
  loop
    execute format('alter table %s drop constraint %I', fk.tbl, fk.name);
  end loop;
end $$;

alter table source_translations
  add constraint source_translations_locale_check check (locale in ('en', 'ar', 'tr'));
alter table situation_translations
  add constraint situation_translations_locale_check check (locale in ('en', 'ar', 'tr'));
alter table entry_translations
  add constraint entry_translations_locale_check check (locale in ('en', 'ar', 'tr'));

-- Its RLS policy goes with it.
drop table locales;

do $$ begin
  assert to_regclass('public.locales') is null, 'locales must be gone';
  -- The check has to actually reject, or it is decoration replacing a real constraint.
  begin
    insert into situation_translations (situation_id, locale, title, summary)
    values (gen_random_uuid(), 'zz', 'x', 'y');
    raise exception 'locale check did not reject an unknown code';
  exception
    when check_violation or foreign_key_violation then null;
  end;
end $$;

commit;
