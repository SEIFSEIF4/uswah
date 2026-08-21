-- Turkish as a third locale.
--
-- The locales row is the easy half — the schema was built so a language is an INSERT.
-- The other half is tsv(): it hard-codes 'english' for everything that is not Arabic,
-- so Turkish text would be stemmed by English rules. Postgres ships a 'turkish'
-- configuration, so this only needs a branch.
--
-- tsv() cannot be replaced in place while generated columns depend on it, so the two
-- search_vector columns come off and go back on either side of the replacement. Both
-- are recomputed on the way back in, which is why the GIN indexes are recreated too.
-- On a content table of this size that is seconds; on a large one it would want a
-- concurrent rebuild instead.

begin;

insert into locales (code, dir) values ('tr', 'ltr');

alter table situation_translations drop column search_vector;
alter table entry_translations      drop column search_vector;

create or replace function tsv(loc text, t text) returns tsvector
  language sql immutable strict set search_path = '' as $$
  select case loc
    when 'ar' then to_tsvector('arabic'::regconfig, public.ar_norm(t))
    when 'tr' then to_tsvector('turkish'::regconfig, t)
    else           to_tsvector('english'::regconfig, t)
  end
$$;

alter table situation_translations
  add column search_vector tsvector
  generated always as (tsv(locale, title || ' ' || summary)) stored;
alter table entry_translations
  add column search_vector tsvector
  generated always as (tsv(locale, body || ' ' || takeaway)) stored;

create index on situation_translations using gin (search_vector);
create index on entry_translations using gin (search_vector);

do $$ begin
  -- Turkish must stem, or the branch above did nothing: both forms of "kitap" should
  -- land on one lexeme, and must not collide with the English path.
  assert tsv('tr', 'kitaplar') = tsv('tr', 'kitap'), 'turkish index must stem';
  assert tsv('ar', 'الإعتماد') = tsv('ar', 'الاعتماد'), 'arabic normalization must survive';
end $$;

commit;
