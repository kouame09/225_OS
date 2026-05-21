import { Article, UserProfile } from '../types';
import { slugify } from '../utils/slugify';
import { getAuthToken } from '../utils/supabaseUtils';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const buildHeaders = async (token?: string) => {
  const auth = token || await getAuthToken() || SUPABASE_ANON_KEY;
  return {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${auth}`,
    'Content-Type': 'application/json'
  };
};

const ADMIN_USER_IDS = new Set<string>(['d9751b0d-7e14-4dd9-b715-915d324f64e3']);
const ADMIN_NAME = 'Prince Kouamé';

const fetchProfiles = async (userIds: string[]): Promise<Map<string, UserProfile>> => {
  if (userIds.length === 0) return new Map();
  const uniqueIds = [...new Set(userIds)];
  const idFilter = uniqueIds.map(id => `id.eq.${id}`).join(',');
  const headers = await buildHeaders();

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=id,full_name,avatar_url,headline&${idFilter}`, {
      method: 'GET',
      headers
    });

    if (!response.ok) return new Map();

    const data = await response.json();
    const map = new Map<string, UserProfile>();
    (data || []).forEach((p: any) => {
      let fullName = p.full_name;
      if (!fullName && ADMIN_USER_IDS.has(p.id)) {
        fullName = ADMIN_NAME;
      }
      map.set(p.id, {
        id: p.id,
        full_name: fullName,
        avatar_url: p.avatar_url,
        headline: p.headline
      });
    });

    for (const uid of uniqueIds) {
      if (!map.has(uid) && ADMIN_USER_IDS.has(uid)) {
        map.set(uid, {
          id: uid,
          full_name: ADMIN_NAME
        });
      }
    }

    return map;
  } catch {
    return new Map();
  }
};

const mapArticleFromDB = (a: any): Article => {
  return {
    id: a.id,
    created_at: a.created_at,
    user_id: a.user_id,
    title: a.title,
    category: a.category,
    slug: a.slug,
    image_url: a.image_url,
    summary: a.summary,
    content: a.content,
    tags: a.tags || [],
    status: a.status || 'published',
    user: undefined
  };
};

const enrichArticlesWithProfiles = async (articles: Article[]): Promise<Article[]> => {
  if (articles.length === 0) return articles;
  const userIds = articles.map(a => a.user_id);
  const profiles = await fetchProfiles(userIds);
  return articles.map(a => ({
    ...a,
    user: profiles.get(a.user_id)
  }));
};

export const getArticles = async (): Promise<Article[]> => {
  try {
    const headers = await buildHeaders();
    const response = await fetch(`${SUPABASE_URL}/rest/v1/articles?select=*&status=eq.published&order=created_at.desc`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status}`);
    }

    const data = await response.json();
    const articles = (data || []).map((a: any) => mapArticleFromDB(a));
    return enrichArticlesWithProfiles(articles);
  } catch (err) {
    console.error("articleService: getArticles failed", err);
    return [];
  }
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  try {
    const headers = await buildHeaders();
    const response = await fetch(`${SUPABASE_URL}/rest/v1/articles?slug=eq.${slug}&status=eq.published&select=*`, {
      method: 'GET',
      headers: { ...headers, 'Accept': 'application/vnd.pgrst.object+json' }
    });

    if (!response.ok) return null;
    const data = await response.json();
    const article = mapArticleFromDB(data);
    const profiles = await fetchProfiles([article.user_id]);
    article.user = profiles.get(article.user_id);
    return article;
  } catch (err) {
    console.error("articleService: getArticleBySlug failed", err);
    return null;
  }
};

export const getUserArticles = async (userId: string): Promise<Article[]> => {
  try {
    const headers = await buildHeaders();
    const response = await fetch(`${SUPABASE_URL}/rest/v1/articles?user_id=eq.${userId}&select=*&order=created_at.desc`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status}`);
    }

    const data = await response.json();
    const articles = (data || []).map((a: any) => mapArticleFromDB(a));
    return enrichArticlesWithProfiles(articles);
  } catch (err) {
    console.error("articleService: getUserArticles failed", err);
    return [];
  }
};

export const addArticle = async (article: Omit<Article, 'id' | 'created_at' | 'slug'>): Promise<void> => {
  try {
    const token = await getAuthToken();
    if (!token) throw new Error("Authentication required");

    const baseSlug = slugify(article.title);
    const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;

    const headers = await buildHeaders(token);
    const response = await fetch(`${SUPABASE_URL}/rest/v1/articles`, {
      method: 'POST',
      headers: { ...headers, 'Prefer': 'return=minimal' },
      body: JSON.stringify({
        title: article.title,
        category: article.category,
        image_url: article.image_url || null,
        summary: article.summary,
        content: article.content,
        tags: article.tags,
        user_id: article.user_id,
        slug: slug,
        status: article.status || 'published'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Add Article Failed: ${response.status} ${errorText}`);
    }
  } catch (err) {
    console.error("articleService: addArticle failed", err);
    throw err;
  }
};

export const updateArticle = async (id: string, article: Partial<Omit<Article, 'id' | 'created_at' | 'user_id'>>): Promise<void> => {
  try {
    const token = await getAuthToken();
    if (!token) throw new Error("Authentication required");

    const body: any = {
      title: article.title,
      category: article.category,
      image_url: article.image_url || null,
      summary: article.summary,
      content: article.content,
      tags: article.tags,
      status: article.status
    };

    const headers = await buildHeaders(token);
    const response = await fetch(`${SUPABASE_URL}/rest/v1/articles?id=eq.${id}`, {
      method: 'PATCH',
      headers: { ...headers, 'Prefer': 'return=minimal' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Update Article Failed: ${response.status} ${errorText}`);
    }
  } catch (err) {
    console.error("articleService: updateArticle failed", err);
    throw err;
  }
};

export const deleteArticle = async (id: string): Promise<void> => {
  try {
    const token = await getAuthToken();
    if (!token) throw new Error("Authentication required");

    const headers = await buildHeaders(token);
    const response = await fetch(`${SUPABASE_URL}/rest/v1/articles?id=eq.${id}`, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) {
      throw new Error(`Delete Article Failed: ${response.status}`);
    }
  } catch (err) {
    console.error("articleService: deleteArticle failed", err);
    throw err;
  }
};
