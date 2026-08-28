-- The editorial fields the web client had been keeping in its mock file: the
-- topic taxonomy, the reading estimate, and which situation fronts the home
-- page. Content itself is not seeded here, it goes through the dashboard's
-- validate + save path, the same move sayings and intentions made.
--
-- Nullable on purpose: a draft can exist before it is classified. What must
-- not happen is publishing one, and that rule lives in the validator the
-- dashboard and the pipeline share, next to its siblings (a half-translated
-- page, an unattributed image).

alter table situations
  add column topic   text check (topic in ('money', 'work', 'family', 'self', 'friendship', 'hardship')),
  add column minutes int  check (minutes > 0),
  add column feature text check (feature in ('hero', 'band'));

-- The home page has one hero slot and one band slot.
create unique index situations_one_per_feature on situations (feature) where feature is not null;

do $$ begin
  -- The taxonomy check must actually reject, or it is decoration.
  begin
    insert into situations (slug, topic) values ('constraint-probe', 'gym');
    raise exception 'unknown topic was accepted';
  exception when check_violation then null;
  end;
end $$;
