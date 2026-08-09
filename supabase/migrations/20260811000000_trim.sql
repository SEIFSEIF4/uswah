-- Trim what nothing reads.
-- entries(situation_id) duplicates the leading column of unique(situation_id, position).
-- saved_situations(situation_id) serves no query: saves are read by user, which the PK covers.
-- locales.name is unread; clients need only `code` and `dir`.

drop index entries_situation_id_idx;
drop index saved_situations_situation_id_idx;
alter table locales drop column name;
