import { Project } from '../types';
import { supabase } from '../lib/supabaseClient';

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

export const getUserProjects = async (userId: string): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user projects:', JSON.stringify(error, null, 2));
    throw error;
  }
  return (data || []).map(mapProjectFromDB);
};

export const addProject = async (project: Omit<Project, 'id'>): Promise<void> => {
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
    user_id: project.userId
  });

  if (error) {
    console.error('Error adding project:', JSON.stringify(error, null, 2));
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