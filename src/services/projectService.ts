import { Project } from '../types';
import { supabase } from '../lib/supabaseClient';
import { slugify } from '../utils/slugify';

// Helper to get auth token (robust against client failure)
const getAuthToken = async () => {
  // 1. FASTEST: Sync LocalStorage check
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
      try {
        const val = localStorage.getItem(key);
        if (val) return JSON.parse(val).access_token;
      } catch (e) { }
    }
  }

  // 2. BACKUP: Supabase with timeout
  try {
    const { data } = await Promise.race([
      supabase.auth.getSession(),
      new Promise<any>((_, reject) => setTimeout(() => reject('Session Timeout'), 1000))
    ]);
    return data.session?.access_token || null;
  } catch (e) {
    return null;
  }
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
  try {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) throw new Error("Missing Supabase config");

    const response = await fetch(`${url}/rest/v1/projects?id=eq.${id}&select=*`, {
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.pgrst.object+json' // Return single object
      }
    });

    if (!response.ok) {
      if (response.status === 406) return undefined; // Not found
      throw new Error(`Fetch error: ${response.status}`);
    }

    const data = await response.json();
    return mapProjectFromDB(data);
  } catch (err) {
    console.error("projectService: Fetch failed in getProjectById", err);
    return undefined;
  }
};

export const getProjectBySlug = async (slug: string): Promise<Project | undefined> => {
  try {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) throw new Error("Missing Supabase config");

    const response = await fetch(`${url}/rest/v1/projects?slug=eq.${slug}&select=*`, {
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.pgrst.object+json'
      }
    });

    if (!response.ok) {
      if (response.status === 406) return undefined;
      throw new Error(`Fetch error: ${response.status}`);
    }

    const data = await response.json();
    return mapProjectFromDB(data);
  } catch (err) {
    console.error("projectService: Fetch failed in getProjectBySlug", err);
    return undefined;
  }
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

/**
 * Synchronizes project statistics from GitHub and updates the local database.
 * No auth token required as this is typically called during public viewing,
 * using the anon key for the PATCH (if RLS allows) or simply returning data.
 * NOTE: If RLS requires Auth for PATCH, this will only work for logged in users.
 */
export const syncProjectStats = async (project: Project): Promise<Partial<Project>> => {
  try {
    const { fetchGithubMetadata } = await import('./githubService');
    const githubData = await fetchGithubMetadata(project.repoUrl);

    const updates = {
      stars: githubData.stargazers_count,
      forks: githubData.forks_count,
      updatedAt: githubData.updated_at
    };

    // Only update DB if values actually changed
    if (
      updates.stars !== project.stars ||
      updates.forks !== project.forks ||
      updates.updatedAt !== project.updatedAt
    ) {
      const url = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

      // We try to get token, but if it's a public view by guest, 
      // the DB update might fail depending on RLS.
      const token = await getAuthToken();

      if (url && key) {
        await fetch(`${url}/rest/v1/projects?id=eq.${project.id}`, {
          method: 'PATCH',
          headers: {
            'apikey': key,
            'Authorization': `Bearer ${token || key}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            stars: updates.stars,
            forks: updates.forks,
            updated_at: updates.updatedAt
          })
        });
      }
    }

    return updates;
  } catch (err) {
    console.error("projectService: Failed to sync with GitHub", err);
    return {};
  }
};
