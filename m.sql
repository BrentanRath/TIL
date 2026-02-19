create table if not exists til_views (
  slug text primary key,
  count bigint default 0
);

alter table til_views enable row level security;

create policy "Allow public read" on til_views
  for select to anon using (true);

create or replace function increment_til_view(slug_param text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count bigint;
begin
  insert into til_views (slug, count) values (slug_param, 1)
  on conflict (slug) do update set count = til_views.count + 1
  returning count into new_count;
  return new_count;
end;
$$;

grant execute on function increment_til_view(text) to anon;
