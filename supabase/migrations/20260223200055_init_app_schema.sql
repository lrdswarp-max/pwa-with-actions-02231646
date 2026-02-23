create table if not exists public.app_heartbeat (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now()
);
