-- Intentions (Nawiya): the everyday-act surface, until now hard-coded in the
-- web client (web/lib/mock/intentions.ts). One row per act; the act name, the
-- corrected intention and the note are per locale in intention_translations.
-- The dorar.net record for an intention already lives in dorar_hadith under
-- the same slug. The group taxonomy is Nawiya's own and deliberately separate
-- from situation topics: situations classify a problem, intentions an act.
--
-- Edits go through the service role from the dashboard only.

create table intentions (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  act_group       text not null check (act_group in (
    'worship', 'body', 'daily', 'order', 'travel', 'occasions', 'people',
    'service', 'self', 'learning', 'knowledge', 'craft', 'stewardship'
  )),
  source_original text,                      -- the Arabic of the source, when quoted
  published_at    timestamptz,               -- null = invisible to both clients
  created_at      timestamptz not null default now()
);

create table intention_translations (
  intention_id uuid not null references intentions(id) on delete cascade,
  locale       text not null check (locale in ('en', 'ar', 'tr')),
  act          text not null,                -- the ordinary act, before any reframing
  intention    text not null,                -- what it becomes with the intention corrected
  note         text not null,
  source_label text not null,                -- "Sahih Muslim 2734", in this language
  primary key (intention_id, locale)
);

alter table intentions enable row level security;
alter table intention_translations enable row level security;

create policy read_published on intentions for select to anon, authenticated
  using (published_at is not null);
create policy read_published on intention_translations for select to anon, authenticated
  using (exists (select 1 from intentions i
                 where i.id = intention_id and i.published_at is not null));

do $$ begin
  -- The taxonomy check must actually reject, or it is decoration.
  begin
    insert into intentions (slug, act_group) values ('constraint-probe', 'gym');
    raise exception 'unknown group was accepted';
  exception when check_violation then null;
  end;
end $$;
