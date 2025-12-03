import { GithubMeta } from '../types';

const GITHUB_API_BASE = 'https://api.github.com/repos';

export const extractRepoInfo = (url: string): { owner: string; repo: string } | null => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname !== 'github.com') return null;
    
    const parts = urlObj.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return null;
    
    return { owner: parts[0], repo: parts[1] };
  } catch (e) {
    return null;
  }
};

export const fetchGithubMetadata = async (url: string): Promise<GithubMeta> => {
  const repoInfo = extractRepoInfo(url);
  if (!repoInfo) {
    throw new Error('Invalid GitHub URL');
  }

  const response = await fetch(`${GITHUB_API_BASE}/${repoInfo.owner}/${repoInfo.repo}`);
  
  if (!response.ok) {
    if (response.status === 404) throw new Error('Repository not found');
    if (response.status === 403) throw new Error('GitHub API rate limit exceeded');
    throw new Error('Failed to fetch GitHub data');
  }

  return await response.json();
};