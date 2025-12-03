-- Create projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  author text not null,
  description text,
  repo_url text not null,
  stacks text[] default '{}'::text[],
  stars integer default 0,
  forks integer default 0,
  language text,
  updated_at timestamp with time zone,
  image_url text,
  user_id uuid references auth.users(id) on delete cascade
);

-- Enable Row Level Security (RLS)
alter table public.projects enable row level security;

-- Create policies
-- 1. Allow public read access to all projects
create policy "Public projects are viewable by everyone"
  on public.projects for select
  using ( true );

-- 2. Allow authenticated users to insert their own projects
create policy "Users can insert their own projects"
  on public.projects for insert
  with check ( auth.uid() = user_id );

-- 3. Allow users to update their own projects
create policy "Users can update their own projects"
  on public.projects for update
  using ( auth.uid() = user_id );

-- 4. Allow users to delete their own projects
create policy "Users can delete their own projects"
  on public.projects for delete
  using ( auth.uid() = user_id );

-- Set up Realtime
alter publication supabase_realtime add table public.projects;
