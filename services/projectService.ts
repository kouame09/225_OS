import { Project } from '../types';
import { supabase } from '../lib/supabaseClient';
import { slugify } from '../utils/slugify';

// Helper to get auth token (robust against client failure)
const getAuthToken = async () => {
  const { data } = await supabase.auth.getSession();
  if (data.session?.access_token) return data.session.access_token;
  // Fallback: Parse LocalStorage for sb-*-auth-token
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
      try { return JSON.parse(localStorage.getItem(key) || '{}').access_token; } catch (e) { }
    }
  }
  return null;
};

// Helper to map DB snake_case to Frontend camelCase
const mapProjectFromDB = (dbProject: any): Project => ({
  id: dbProject.id,
  name: dbProject.name,
  author: dbProject.author,
  description: dbProject.description,
  repoUrl: dbProject.repo_url,
  stacks: dbProject.stacks || [],
  stars: dbProject.stars,
  forks: dbProject.forks,
  language: dbProject.language,
  updatedAt: dbProject.updated_at,
  imageUrl: dbProject.image_url,
  slug: dbProject.slug,
  userId: dbProject.user_id
});

export const getProjects = async (): Promise<Project[]> => {
  // FALLBACK: Use raw fetch because supabase-js client is hanging
  try {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) throw new Error("Missing Supabase config");

    const response = await fetch(`${url}/rest/v1/projects?select=*&order=created_at.desc`, {
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return (data || []).map(mapProjectFromDB);
  } catch (err) {
    console.error("projectService: Raw fetch failed in getProjects", err);
    throw err;
  }
};

export const getProjectById = async (id: string): Promise<Project | undefined> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching project:', JSON.stringify(error, null, 2));
    return undefined;
  }

  return mapProjectFromDB(data);
};

export const getProjectBySlug = async (slug: string): Promise<Project | undefined> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching project:', JSON.stringify(error, null, 2));
    return undefined;
  }

  return mapProjectFromDB(data);
};

export const getUserProjects = async (userId: string): Promise<Project[]> => {
  // FALLBACK: Use raw fetch because supabase-js client is hanging
  try {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) throw new Error("Missing Supabase config");

    const response = await fetch(`${url}/rest/v1/projects?user_id=eq.${userId}&select=*&order=created_at.desc`, {
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return (data || []).map(mapProjectFromDB);
  } catch (err) {
    console.error("projectService: Raw fetch failed", err);
    throw err;
  }
};

export const addProject = async (project: Omit<Project, 'id' | 'slug'>): Promise<void> => {
  try {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const token = await getAuthToken();

    if (!url || !key || !token) throw new Error("Missing config or auth token");

    // Generate slug from project name
    const slug = slugify(project.name);

    const response = await fetch(`${url}/rest/v1/projects`, {
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name: project.name,
        author: project.author,
        description: project.description,
        repo_url: project.repoUrl,
        stacks: project.stacks,
        stars: project.stars,
        forks: project.forks,
        language: project.language,
        updated_at: project.updatedAt,
        image_url: project.imageUrl,
        slug: slug,
        user_id: project.userId
      })
    });

    if (!response.ok) {
      throw new Error(`Add Project Failed: ${response.status} ${response.statusText}`);
    }
  } catch (err) {
    console.error("projectService: Raw fetch failed in addProject", err);
    throw err;
  }
};

export const updateProject = async (
  id: string,
  updates: Partial<Omit<Project, 'id' | 'slug' | 'userId'>>
): Promise<void> => {
  try {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const token = await getAuthToken();

    if (!url || !key || !token) throw new Error("Missing config or auth token");

    const response = await fetch(`${url}/rest/v1/projects?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: updates.name,
        author: updates.author,
        description: updates.description,
        stacks: updates.stacks
      })
    });

    if (!response.ok) {
      throw new Error(`Update Project Failed: ${response.status} ${response.statusText}`);
    }
  } catch (err) {
    console.error("projectService: Raw fetch failed in updateProject", err);
    throw err;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  try {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const token = await getAuthToken();

    if (!url || !key || !token) throw new Error("Missing config or auth token");

    const response = await fetch(`${url}/rest/v1/projects?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Delete Project Failed: ${response.status} ${response.statusText}`);
    }
  } catch (err) {
    console.error("projectService: Raw fetch failed in deleteProject", err);
    throw err;
  }
};