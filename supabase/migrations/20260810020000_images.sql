-- Images for situations.
--
-- Sourced from museum open-access and other public-domain archives: manuscript
-- painting, historical photography, maps. Figures are allowed. Depictions of the
-- Prophet ﷺ are not, and neither are depictions of other prophets or the companions.
--
-- That rule is enforced the same way source verification is, as a constraint, not a
-- convention. An image cannot be stored without a named person who cleared it.

alter table situations
  add column image_url        text,
  add column image_credit     text,   -- "Folio from a Shahnama, Iran, 1341"
  add column image_source_url text,   -- where it came from, for anyone checking
  add column image_license    text,   -- 'public-domain' | 'cc0' | 'cc-by-4.0' | ...
  add column image_cleared_by text,   -- who confirmed it depicts nothing it must not
  add column image_cleared_at timestamptz;

-- Either there is no image, or there is a fully attributed and cleared one.
alter table situations add constraint image_is_attributed_and_cleared check (
  image_url is null or (
    image_credit     is not null and
    image_source_url is not null and
    image_license    is not null and
    image_cleared_by is not null and
    image_cleared_at is not null
  )
);

-- Alt text is per language, so it lives with the other translated strings.
alter table situation_translations add column image_alt text;

do $$ begin
  -- An image without clearance must be impossible, not merely discouraged.
  begin
    insert into situations (slug, image_url) values ('constraint-probe', 'https://example.org/x.jpg');
    raise exception 'image constraint did not fire';
  exception when check_violation then null;
  end;
  delete from situations where slug = 'constraint-probe';
end $$;
