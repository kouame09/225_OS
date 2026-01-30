import { UserProfile } from '../types';
import { getAuthToken } from '../utils/supabaseUtils';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const getProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
        if (!url || !key) throw new Error("Missing Supabase config");

        // Request a list of 1 item instead of forcing a single object
        // This prevents the 406 error in the console when the profile doesn't exist yet
        const response = await fetch(`${url}/rest/v1/profiles?id=eq.${userId}&select=*&limit=1`, {
            method: 'GET',
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Fetch error: ${response.status}`);
        }

        const data = await response.json();
        return (data && data.length > 0) ? data[0] as UserProfile : null;
    } catch (error) {
        console.error('profileService: Fetch failed in getProfile', error);
        return null;
    }
};

export const getAllProfiles = async (): Promise<UserProfile[]> => {
    try {
        if (!url || !key) throw new Error("Missing Supabase config");

        const response = await fetch(`${url}/rest/v1/profiles?is_approved=eq.true&full_name=not.is.null&full_name=neq.&select=*&order=created_at.desc`, {
            method: 'GET',
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Fetch error: ${response.status}`);
        }

        const data = await response.json();
        return (data || []) as UserProfile[];
    } catch (error) {
        console.error('profileService: Fetch failed in getAllProfiles', error);
        return [];
    }
};

export const updateProfile = async (userId: string, updates: Partial<UserProfile>): Promise<{ error?: string }> => {
    try {
        const token = await getAuthToken();
        if (!url || !key || !token) throw new Error("Missing config or auth token");

        // Use UPSERT (POST with merge-duplicates) to ensure row is created if it doesn't exist
        const response = await fetch(`${url}/rest/v1/profiles`, {
            method: 'POST',
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Prefer': 'resolution=merge-duplicates,return=minimal'
            },
            body: JSON.stringify({ ...updates, id: userId })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Update Profile Failed: ${response.status}`);
        }

        return {};
    } catch (error: any) {
        console.error('profileService: Fetch failed in updateProfile', error);
        return { error: error.message || 'An unexpected error occurred' };
    }
};

export const uploadProfileImage = async (userId: string, file: File, type: 'avatar' | 'banner'): Promise<{ url?: string, error?: string }> => {
    try {
        const token = await getAuthToken();
        if (!url || !key || !token) throw new Error("Missing config or auth token");

        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${type}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const response = await fetch(`${url}/storage/v1/object/profiles/${filePath}`, {
            method: 'POST',
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${token}`,
                'Content-Type': file.type
            },
            body: file
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Upload Failed: ${response.status}`);
        }

        const publicUrl = `${url}/storage/v1/object/public/profiles/${filePath}`;
        return { url: publicUrl };
    } catch (error: any) {
        console.error('profileService: Upload failed', error);
        return { error: error.message || 'An unexpected error occurred' };
    }
};

