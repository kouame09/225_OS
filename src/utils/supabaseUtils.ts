import { supabase } from '../lib/supabaseClient';

// Helper to get auth token (robust against client failure)
export const getAuthToken = async () => {
    try {
        // Increase timeout to 5 seconds
        const { data } = await Promise.race([
            supabase.auth.getSession(),
            new Promise<any>((_, reject) => setTimeout(() => reject('Session Timeout'), 5000))
        ]);

        if (data?.session) {
            return data.session.access_token;
        }

        throw new Error("No session from client");
    } catch (e) {
        console.warn("Supabase client search failed, checking localStorage fallbacks...");

        // Try known Supabase v2 keys first
        const projectRef = import.meta.env.VITE_SUPABASE_URL?.split('//')[1]?.split('.')[0];
        const keys = [
            `sb-${projectRef}-auth-token`,
            'supabase.auth.token' // older versions/manual
        ];

        for (const key of keys) {
            const val = localStorage.getItem(key);
            if (val) {
                try {
                    const session = JSON.parse(val);
                    // Supabase v2 nests it under session or directly
                    const token = session.access_token || session.session?.access_token;
                    if (token) return token;
                } catch (err) { }
            }
        }

        // Last resort: search all keys
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.includes('auth-token') || key.includes('supabase'))) {
                try {
                    const val = localStorage.getItem(key);
                    if (val) {
                        const parsed = JSON.parse(val);
                        const token = parsed.access_token || parsed.session?.access_token || parsed.currentSession?.access_token;
                        if (token) return token;
                    }
                } catch (err) { }
            }
        }

        return null;
    }
};
