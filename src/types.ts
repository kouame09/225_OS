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
  slug: string;
  userId?: string;
}

export interface UserProfile {
  id: string;
  email?: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  banner_url?: string;
  headline?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  created_at?: string;
  is_approved?: boolean;
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
