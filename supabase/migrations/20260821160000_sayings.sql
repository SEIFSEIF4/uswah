-- Sayings: the quote comparisons behind /quotes, until now hard-coded in the
-- web client (web/lib/mock/quotes.ts). One row per saying; the commentary is
-- ours, per locale, in saying_translations. The dorar.net record for a saying
-- already lives in dorar_hadith under the same slug, so it is joined there,
-- never duplicated here.
--
-- The grade check accepts values the sources enum refuses on purpose: a
-- comparison can be DRAFTED against a hasan, disputed or historical source,
-- but the publish constraint keeps it a draft until a scholarly reviewer joins
-- and that decision is revisited. Edits go through the service role from the
-- dashboard only.

create table sayings (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  saying          text not null,             -- the quote as it circulates, in its own language
  grade           text not null check (grade in ('quran', 'sahih', 'hasan', 'disputed', 'historical')),
  situation_slug  text references situations(slug),  -- the situation it belongs with, when one exists
  source_original text,                      -- the Arabic of the Islamic source, when quoted
  published_at    timestamptz,               -- null = invisible to both clients
  created_at      timestamptz not null default now(),
  -- You cannot publish what no reviewer could grade sahih.
  constraint weak_grades_stay_drafts check (
    published_at is null or grade in ('quran', 'sahih')
  )
);

create table saying_translations (
  saying_id    uuid not null references sayings(id) on delete cascade,
  locale       text not null check (locale in ('en', 'ar', 'tr')),
  angle        text not null,                -- what the Islamic source actually says
  closeness    text not null,                -- honest note on how close the two are
  source_label text not null,                -- "Sahih al-Bukhari 1471", in this language
  primary key (saying_id, locale)
);

alter table sayings enable row level security;
alter table saying_translations enable row level security;

create policy read_published on sayings for select to anon, authenticated
  using (published_at is not null);
create policy read_published on saying_translations for select to anon, authenticated
  using (exists (select 1 from sayings s
                 where s.id = saying_id and s.published_at is not null));

do $$ begin
  -- The publish gate must actually reject, or it is decoration.
  begin
    insert into sayings (slug, saying, grade, published_at)
    values ('constraint-probe', 'x', 'disputed', now());
    raise exception 'weak grade published without a reviewer';
  exception when check_violation then null;
  end;
end $$;
