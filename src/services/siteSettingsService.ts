import { getAuthToken } from '../utils/supabaseUtils';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface SiteSetting {
  key: string;
  value: boolean;
}

export const getSiteSetting = async (key: string, defaultValue: boolean = true): Promise<boolean> => {
  try {
    if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error("Missing Supabase config");

    const response = await fetch(`${SUPABASE_URL}/rest/v1/site_settings?key=eq.${key}&select=*`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.pgrst.object+json'
      }
    });

    if (!response.ok) {
      if (response.status === 406) return defaultValue;
      throw new Error(`Fetch error: ${response.status}`);
    }

    const data = await response.json();
    return data?.value ?? defaultValue;
  } catch (err) {
    console.error("siteSettingsService: getSiteSetting failed", err);
    return defaultValue;
  }
};

export const updateSiteSetting = async (key: string, value: boolean): Promise<void> => {
  try {
    const token = await getAuthToken();
    if (!SUPABASE_URL || !SUPABASE_KEY || !token) throw new Error("Missing config or auth token");

    const response = await fetch(`${SUPABASE_URL}/rest/v1/site_settings?key=eq.${key}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ value })
    });

    if (!response.ok) throw new Error(`Update Setting Failed: ${response.status}`);
  } catch (err) {
    console.error("siteSettingsService: updateSiteSetting failed", err);
    throw err;
  }
};

export const getAllSiteSettings = async (): Promise<Record<string, boolean>> => {
  try {
    if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error("Missing Supabase config");

    const response = await fetch(`${SUPABASE_URL}/rest/v1/site_settings?select=*`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status}`);
    }

    const data = await response.json();
    const settings: Record<string, boolean> = {};
    (data || []).forEach((setting: any) => {
      settings[setting.key] = setting.value;
    });
    return settings;
  } catch (err) {
    console.error("siteSettingsService: getAllSiteSettings failed", err);
    return {};
  }
};
