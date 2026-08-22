-- Push subscriptions for web notifications.
-- Written only via the web app's service-role server actions (no client RLS policies).
-- endpoint is the Push API identity; keys rotate when the browser re-subscribes.

create table push_subscriptions (
  endpoint   text primary key,
  p256dh     text not null,
  auth       text not null,
  user_id    uuid references auth.users(id) on delete set null,
  locale     text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on push_subscriptions (user_id);
create index on push_subscriptions (locale);

alter table push_subscriptions enable row level security;
-- Intentionally no policies: anon/authenticated cannot read or write. The Next.js
-- server uses the service role to upsert on subscribe and to fan out on send.
