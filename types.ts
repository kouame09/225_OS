export interface Project {
  id: string;
  name: string;
  author: string;
  description: string;
  repoUrl: string;
  stacks: string[];
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
  imageUrl?: string;
  userId?: string; // Links to Supabase Auth User ID
}

export interface GithubMeta {
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  html_url: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}