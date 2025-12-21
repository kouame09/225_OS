import { Project } from '../types';
import { supabase } from '../lib/supabaseClient';
import { slugify } from '../utils/slugify';

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
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', JSON.stringify(error, null, 2));
    return [];
  }

  return (data || []).map(mapProjectFromDB);
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
  console.log('projectService: getUserProjects called for', userId);

  // Create a timeout promise to prevent infinite hanging
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out after 10000ms')), 10000)
  );

  try {
    const supabasePromise = supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    console.log('projectService: sending supabase request...');

    // Race against timeout
    const { data, error } = await Promise.race([
      supabasePromise,
      timeoutPromise
    ]) as any;

    console.log('projectService: response received', { data: data?.length, error });

    if (error) {
      console.error('Error fetching user projects:', JSON.stringify(error, null, 2));
      throw error;
    }
    return (data || []).map(mapProjectFromDB);
  } catch (err) {
    console.error("projectService: Critical error in getUserProjects", err);
    throw err;
  }
};

export const addProject = async (project: Omit<Project, 'id' | 'slug'>): Promise<void> => {
  // Generate slug from project name
  const slug = slugify(project.name);

  const { error } = await supabase.from('projects').insert({
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
  });

  if (error) {
    console.error('Error adding project:', JSON.stringify(error, null, 2));
    throw error;
  }
};

export const updateProject = async (
  id: string,
  updates: Partial<Omit<Project, 'id' | 'slug' | 'userId'>>
): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .update({
      name: updates.name,
      author: updates.author,
      description: updates.description,
      stacks: updates.stacks,
      // Note: We don't update stars, forks, language, updated_at, imageUrl, or repoUrl
      // as these come from GitHub
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating project:', JSON.stringify(error, null, 2));
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) {
    console.error('Error deleting project:', JSON.stringify(error, null, 2));
    throw error;
  }
};