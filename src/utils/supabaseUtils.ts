import { supabase } from '../lib/supabaseClient';

// Helper to get auth token (robust against client failure)
export const getAuthToken = async () => {
    try {
        // Race between Supabase client and a timeout
        // This prevents infinite hanging if the client web socket is blocked/stalled
        const { data } = await Promise.race([
            supabase.auth.getSession(),
            new Promise<any>((_, reject) => setTimeout(() => reject('Session Timeout'), 2000))
        ]);

        if (!data?.session) {
            throw new Error("No session from client");
        }

        return data.session.access_token;
    } catch (e) {
        // Fallback: Try reading from localStorage if SDK fails or times out
        console.warn("Supabase client timed out or failed, checking localStorage fallback");
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
                try {
                    const val = localStorage.getItem(key);
                    if (val) return JSON.parse(val).access_token;
                } catch (err) { }
            }
        }
        return null;
    }
};
