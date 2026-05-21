import { Pitch } from '../types';
import { slugify } from '../utils/slugify';
import { getAuthToken } from '../utils/supabaseUtils';

const mapPitchFromDB = (p: any): Pitch => {
    // console.log("pitchService: Data from DB:", p);
    return {
        id: p.id,
        created_at: p.created_at,
        user_id: p.user_id,
        project_name: p.project_name,
        problem: p.problem,
        pitch: p.pitch,
        need: p.need,
        email: p.email,
        location: p.location,
        link: p.link,
        slug: p.slug,
        user: p.profiles ? {
            id: p.profiles.id,
            username: p.profiles.username,
            full_name: p.profiles.full_name,
            avatar_url: p.profiles.avatar_url
        } : undefined
    };
};

export const getPitches = async (): Promise<Pitch[]> => {
    try {
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const token = await getAuthToken() || key;

        const response = await fetch(`${url}/rest/v1/pitches?select=*,profiles:user_id(*)&order=created_at.desc`, {
            method: 'GET',
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Fetch error: ${response.status}`);
        }

        const data = await response.json();
        return (data || []).map((p: any) => mapPitchFromDB(p));
    } catch (err) {
        console.error("pitchService: getPitches failed", err);
        return [];
    }
};

export const getPitchBySlug = async (slug: string): Promise<Pitch | null> => {
    try {
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const token = await getAuthToken() || key;

        const response = await fetch(`${url}/rest/v1/pitches?slug=eq.${slug}&select=*,profiles:user_id(*)`, {
            method: 'GET',
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.pgrst.object+json'
            }
        });

        if (!response.ok) return null;
        const data = await response.json();
        return mapPitchFromDB(data);
    } catch (err) {
        console.error("pitchService: getPitchBySlug failed", err);
        return null;
    }
};

export const getUserPitches = async (userId: string): Promise<Pitch[]> => {
    try {
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const token = await getAuthToken() || key;

        const response = await fetch(`${url}/rest/v1/pitches?user_id=eq.${userId}&select=*,profiles:user_id(id,full_name,avatar_url,headline)&order=created_at.desc`, {
            method: 'GET',
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Fetch error: ${response.status}`);
        }

        const data = await response.json();
        return (data || []).map((p: any) => mapPitchFromDB(p));
    } catch (err) {
        console.error("pitchService: getUserPitches failed", err);
        return [];
    }
};

export const addPitch = async (pitch: Omit<Pitch, 'id' | 'created_at' | 'slug'>): Promise<void> => {
    try {
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const token = await getAuthToken();

        if (!token) throw new Error("Authentication required");

        const slug = `${slugify(pitch.project_name)}-${Math.random().toString(36).substring(2, 7)}`;
        
        const body = {
            project_name: pitch.project_name,
            problem: pitch.problem,
            pitch: pitch.pitch,
            need: pitch.need,
            email: pitch.email,
            location: pitch.location,
            link: pitch.link,
            user_id: pitch.user_id,
            slug: slug
        };

        console.log("pitchService: Sending POST with body:", body);

        const response = await fetch(`${url}/rest/v1/pitches`, {
            method: 'POST',
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation' // Return object to see what happened
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("pitchService: POST Error response:", errorText);
            throw new Error(`Add Pitch Failed: ${response.status} ${errorText}`);
        }

        const responseData = await response.json();
        console.log("pitchService: POST Success response:", responseData);
    } catch (err) {
        console.error("pitchService: addPitch failed", err);
        throw err;
    }
};

export const updatePitch = async (id: string, pitch: Partial<Pitch>): Promise<void> => {
    try {
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const token = await getAuthToken();

        if (!token) throw new Error("Authentication required");

        const body = {
            project_name: pitch.project_name,
            problem: pitch.problem,
            pitch: pitch.pitch,
            need: pitch.need,
            email: pitch.email,
            location: pitch.location,
            link: pitch.link
        };

        console.log("pitchService: Sending PATCH for id", id, "with body:", body);

        const response = await fetch(`${url}/rest/v1/pitches?id=eq.${id}`, {
            method: 'PATCH',
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("pitchService: PATCH Error response:", errorText);
            throw new Error(`Update Pitch Failed: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("pitchService: PATCH Success response:", responseData);
    } catch (err) {
        console.error("pitchService: updatePitch failed", err);
        throw err;
    }
};

export const deletePitch = async (id: string): Promise<void> => {
    try {
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const token = await getAuthToken();

        if (!token) throw new Error("Authentication required");

        const response = await fetch(`${url}/rest/v1/pitches?id=eq.${id}`, {
            method: 'DELETE',
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Delete Pitch Failed: ${response.status}`);
        }
    } catch (err) {
        console.error("pitchService: deletePitch failed", err);
        throw err;
    }
};
