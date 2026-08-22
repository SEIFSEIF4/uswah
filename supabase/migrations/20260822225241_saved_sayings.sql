create table public.saved_sayings (
  user_id   uuid not null references auth.users(id) on delete cascade,
  saying_id uuid not null references public.sayings(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, saying_id)
);

create index saved_sayings_saying_id_idx on public.saved_sayings (saying_id);

alter table public.saved_sayings enable row level security;

create policy own_saved_sayings
on public.saved_sayings
for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

grant select, insert, delete on table public.saved_sayings to authenticated;
revoke all on table public.saved_sayings from anon;
