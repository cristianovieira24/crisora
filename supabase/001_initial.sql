-- Run once in Supabase SQL Editor. No public or ordinary user writes.
create table if not exists public.projects (
 id text primary key,
 title text not null,
 category text not null,
 description text not null default '',
 image text not null,
 url text not null default '',
 position integer not null default 0,
 published integer not null default 1 check (published in (0,1)),
 featured integer not null default 1 check (featured in (0,1))
);
create table if not exists public.site_settings (
 id text primary key,
 value jsonb not null
);
alter table public.projects enable row level security;
alter table public.site_settings enable row level security;
revoke all on public.projects,public.site_settings from anon,authenticated;
grant all on public.projects,public.site_settings to service_role;
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('crisora-media','crisora-media',false,8388608,array['image/png','image/jpeg','image/webp'])
on conflict (id) do update set public=false,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;
