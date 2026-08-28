-- Uswah v1 schema.
-- Contract between the Next.js web client and the Flutter app. Neither client writes
-- content; edits go through the service role from the admin screen only.
--
-- Applied to project rjkbhobntyhuochdmkkx (eu-central-1). This file is the source of
-- truth, keep it identical to what is deployed.

-- ── Locales ───────────────────────────────────────────────────────────────────
-- A table, not a check constraint: adding a language is an INSERT, never DDL.
create table locales (
  code text primary key,
  name text not null,
  dir  text not null default 'ltr' check (dir in ('ltr', 'rtl'))
);
insert into locales (code, name, dir) values
  ('en', 'English', 'ltr'),
  ('ar', 'العربية', 'rtl');

-- ── Arabic normalization ──────────────────────────────────────────────────────
-- Strips harakat and tatweel, unifies alef/ya/ta-marbuta forms. Without this,
-- searching الاعتماد misses rows stored as الإعتماد. IMMUTABLE so generated
-- columns can call it; search_path pinned so it is safe to call from RLS paths.
create function ar_norm(t text) returns text
  language sql immutable strict set search_path = '' as $$
  select translate(regexp_replace(t, '[ً-ْـ]', '', 'g'), 'أإآىة', 'اااية')
$$;

-- Picking the config per locale needs its own IMMUTABLE wrapper: a text::regconfig
-- cast is only STABLE, which generated columns reject.
create function tsv(loc text, t text) returns tsvector
  language sql immutable strict set search_path = '' as $$
  select case loc
    when 'ar' then to_tsvector('arabic'::regconfig, public.ar_norm(t))
    else           to_tsvector('english'::regconfig, t)
  end
$$;

do $$ begin
  assert ar_norm('الإعتماد') = ar_norm('الاعتماد'), 'alef forms must normalize alike';
  assert ar_norm('صَبْر') = ar_norm('صبر'), 'harakat must be stripped';
  assert tsv('ar', 'الإعتماد') = tsv('ar', 'الاعتماد'), 'arabic index must normalize';
end $$;

-- ── Sources ───────────────────────────────────────────────────────────────────
create type source_kind  as enum ('quran', 'hadith');
-- No 'daif' value on purpose: you cannot store what you may not publish.
create type source_grade as enum ('quran', 'sahih');

create table sources (
  id            uuid primary key default gen_random_uuid(),
  kind          source_kind  not null,
  grade         source_grade not null,
  collection    text,                        -- 'bukhari' | 'muslim', null for Quran
  ref           text not null,               -- surah:ayah, or book + number
  text_original text not null,               -- the Arabic, transcribed from the collection
  created_at    timestamptz not null default now(),
  constraint quran_has_no_collection check (
    (kind = 'quran'  and collection is null and grade = 'quran') or
    (kind = 'hadith' and collection in ('bukhari', 'muslim') and grade = 'sahih')
  ),
  unique (kind, collection, ref)
);

-- text_original lives on the parent, not here: it is the canonical text, not a
-- rendering of one. Every other language is a translation with a named translator.
create table source_translations (
  source_id  uuid not null references sources(id) on delete cascade,
  locale     text not null references locales(code),
  text       text not null,
  translator text not null,                  -- attribution is a reliability requirement
  primary key (source_id, locale)
);

-- ── Situations ────────────────────────────────────────────────────────────────
create table situations (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,         -- language-neutral, stable, used in deep links
  published_at timestamptz,                  -- null = invisible to both clients
  created_at   timestamptz not null default now()
);

create table situation_translations (
  situation_id uuid not null references situations(id) on delete cascade,
  locale       text not null references locales(code),
  title        text not null,                -- the person's own words, not a topic label
  summary      text not null,
  search_vector tsvector generated always as (tsv(locale, title || ' ' || summary)) stored,
  primary key (situation_id, locale)
);
create index on situation_translations using gin (search_vector);

-- ── Entries ───────────────────────────────────────────────────────────────────
create table entries (
  id           uuid primary key default gen_random_uuid(),
  situation_id uuid not null references situations(id) on delete cascade,
  position     int  not null,
  source_id    uuid not null references sources(id),   -- an entry without a source cannot exist
  reviewed_by  text not null,                          -- who checked it against the collection
  reviewed_at  timestamptz not null,
  unique (situation_id, position)
);
create index on entries (situation_id);
create index on entries (source_id);

create table entry_translations (
  entry_id uuid not null references entries(id) on delete cascade,
  locale   text not null references locales(code),
  body     text not null,                    -- 1-3 minutes of reading per situation, total
  takeaway text not null,                    -- one concrete action
  search_vector tsvector generated always as (tsv(locale, body || ' ' || takeaway)) stored,
  primary key (entry_id, locale)
);
create index on entry_translations using gin (search_vector);

-- ── Saves (the only thing behind auth) ────────────────────────────────────────
create table saved_situations (
  user_id      uuid not null references auth.users(id) on delete cascade,
  situation_id uuid not null references situations(id) on delete cascade,
  created_at   timestamptz not null default now(),
  primary key (user_id, situation_id)
);
create index on saved_situations (situation_id);

-- ── RLS: content is public, saves are private ─────────────────────────────────
alter table locales                enable row level security;
alter table sources                enable row level security;
alter table source_translations    enable row level security;
alter table situations             enable row level security;
alter table situation_translations enable row level security;
alter table entries                enable row level security;
alter table entry_translations     enable row level security;
alter table saved_situations       enable row level security;

create policy read_locales on locales for select to anon, authenticated using (true);

create policy read_published on situations for select to anon, authenticated
  using (published_at is not null);

create policy read_published on situation_translations for select to anon, authenticated
  using (exists (select 1 from situations s
                 where s.id = situation_id and s.published_at is not null));

create policy read_published on entries for select to anon, authenticated
  using (exists (select 1 from situations s
                 where s.id = situation_id and s.published_at is not null));

create policy read_published on entry_translations for select to anon, authenticated
  using (exists (select 1 from entries e join situations s on s.id = e.situation_id
                 where e.id = entry_id and s.published_at is not null));

-- Sources are only reachable through a published entry.
create policy read_published on sources for select to anon, authenticated
  using (exists (select 1 from entries e join situations s on s.id = e.situation_id
                 where e.source_id = sources.id and s.published_at is not null));

create policy read_published on source_translations for select to anon, authenticated
  using (exists (select 1 from entries e join situations s on s.id = e.situation_id
                 where e.source_id = source_translations.source_id
                   and s.published_at is not null));

-- (select auth.uid()) rather than auth.uid(): evaluated once, not per row.
create policy own_saves on saved_situations for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- ── Search ────────────────────────────────────────────────────────────────────
-- One implementation, both clients call it. The query needs the same normalization
-- as the index or Arabic never matches.
create function search_situations(q text, loc text)
  returns table (slug text, title text, summary text, rank real)
  language sql stable security invoker set search_path = '' as $$
  select s.slug, t.title, t.summary,
         ts_rank(t.search_vector, query) as rank
  from public.situation_translations t
  join public.situations s on s.id = t.situation_id
  cross join lateral websearch_to_tsquery(
    (case loc when 'ar' then 'arabic' else 'english' end)::regconfig,
    case loc when 'ar' then public.ar_norm(q) else q end
  ) as query
  where t.locale = loc
    and s.published_at is not null
    and t.search_vector @@ query
  order by rank desc
  limit 30
$$;
