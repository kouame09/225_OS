import { LaunchpadProduct } from '../types';
import { slugify } from '../utils/slugify';
import { supabase } from '../lib/supabaseClient';
import { getAuthToken } from '../utils/supabaseUtils';

// Helper pour transformer les données DB en types TS
const mapProductFromDB = (p: any, currentUserId?: string): LaunchpadProduct => ({
    id: p.id,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    url: p.url,
    image_url: p.image_url,
    maker_id: p.maker_id,
    slug: p.slug,
    contact_email: p.contact_email,
    app_store_url: p.app_store_url,
    play_store_url: p.play_store_url,
    created_at: p.created_at,
    votes_count: p.product_votes?.[0]?.count || 0,
    has_voted: currentUserId ? (p.has_voted || []).some((v: any) => v.user_id === currentUserId) : false,
    maker: p.profiles ? {
        id: p.profiles.id,
        username: p.profiles.username,
        full_name: p.profiles.full_name,
        avatar_url: p.profiles.avatar_url
    } : undefined
});

export const getLaunchpadProducts = async (currentUserId?: string): Promise<LaunchpadProduct[]> => {
    try {
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const token = await getAuthToken() || key;

        const response = await fetch(`${url}/rest/v1/products?select=*,profiles:maker_id(*),product_votes(count),has_voted:product_votes(user_id)&order=created_at.desc`, {
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
        return (data || []).map((p: any) => mapProductFromDB(p, currentUserId));
    } catch (err) {
        console.error("launchpadService: getLaunchpadProducts failed", err);
        return [];
    }
};

export const getLaunchpadProductBySlug = async (slug: string, currentUserId?: string): Promise<LaunchpadProduct | null> => {
    try {
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const token = await getAuthToken() || key;

        const response = await fetch(`${url}/rest/v1/products?slug=eq.${slug}&select=*,profiles:maker_id(*),product_votes(count),has_voted:product_votes(user_id)`, {
            method: 'GET',
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.pgrst.object+json'
            }
        });

        if (!response.ok) {
            if (response.status === 406) return null;
            throw new Error(`Fetch error: ${response.status}`);
        }

        const data = await response.json();
        return mapProductFromDB(data, currentUserId);
    } catch (err) {
        console.error("launchpadService: getLaunchpadProductBySlug failed", err);
        return null;
    }
};

export const addLaunchpadProduct = async (product: Omit<LaunchpadProduct, 'id' | 'created_at' | 'slug'>): Promise<void> => {
    const slug = slugify(product.name);
    
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const sessionToken = await getAuthToken();
    const token = sessionToken || SUPABASE_KEY;

    const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({
            name: product.name,
            tagline: product.tagline,
            description: product.description,
            url: product.url,
            image_url: product.image_url,
            maker_id: product.maker_id,
            contact_email: product.contact_email,
            app_store_url: product.app_store_url,
            play_store_url: product.play_store_url,
            slug: slug
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Add Product Error:", response.status, errorText);
        throw new Error(`Erreur lors de l'ajout: ${response.status}`);
    }
};

export const updateLaunchpadProduct = async (id: string, product: Partial<LaunchpadProduct>): Promise<void> => {
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const sessionToken = await getAuthToken();
    const token = sessionToken || SUPABASE_KEY;

    const response = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({
            name: product.name,
            tagline: product.tagline,
            description: product.description,
            url: product.url,
            image_url: product.image_url,
            contact_email: product.contact_email,
            app_store_url: product.app_store_url,
            play_store_url: product.play_store_url
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Update Product Error:", response.status, errorText);
        throw new Error(`Erreur lors de la mise à jour: ${response.status}`);
    }
};

export const deleteLaunchpadProduct = async (id: string): Promise<void> => {
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const sessionToken = await getAuthToken();
    const token = sessionToken || SUPABASE_KEY;

    // Delete votes first (in case of no cascade)
    await fetch(`${SUPABASE_URL}/rest/v1/product_votes?product_id=eq.${id}`, {
        method: 'DELETE',
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${token}` }
    });

    const response = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
        method: 'DELETE',
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
        throw new Error(`Delete Product Error: ${response.status}`);
    }
};

export const toggleVote = async (productId: string, userId: string, isCurrentlyVoted: boolean): Promise<boolean> => {
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const sessionToken = await getAuthToken();
    const token = sessionToken || SUPABASE_KEY;

    if (isCurrentlyVoted) {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/product_votes?product_id=eq.${productId}&user_id=eq.${userId}`, {
            method: 'DELETE',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Remove Vote Error: ${response.status}`);
        return false;
    } else {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/product_votes`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ product_id: productId, user_id: userId })
        });
        if (!response.ok) throw new Error(`Add Vote Error: ${response.status}`);
        return true;
    }
};

export const getUserLaunchpadProducts = async (userId: string): Promise<LaunchpadProduct[]> => {
    try {
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const token = await getAuthToken() || key;

        const response = await fetch(`${url}/rest/v1/products?maker_id=eq.${userId}&select=*,product_votes(count)&order=created_at.desc`, {
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
        return (data || []).map((p: any) => mapProductFromDB(p));
    } catch (err) {
        console.error("launchpadService: getUserLaunchpadProducts failed", err);
        return [];
    }
};

export const uploadProductImage = async (file: File): Promise<string> => {
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Use the resilient getAuthToken helper instead of raw getSession which hangs
    const sessionToken = await getAuthToken();
    const token = sessionToken || SUPABASE_KEY;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    console.log("Upload: starting for", file.name, "->", filePath, "size:", file.size);

    // Use AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch(
            `${SUPABASE_URL}/storage/v1/object/launchpad-images/${filePath}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'apikey': SUPABASE_KEY,
                    'x-upsert': 'false',
                },
                body: file,
                signal: controller.signal,
            }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Upload failed:", response.status, errorBody);
            throw new Error(`Upload échoué (${response.status}): ${errorBody}`);
        }

        console.log("Upload successful!");

        // Build the public URL
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/launchpad-images/${filePath}`;
        console.log("Public URL:", publicUrl);
        return publicUrl;

    } catch (err: any) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
            console.error("Upload timed out after 15s");
            throw new Error("L'upload a expiré. Vérifiez votre connexion internet et réessayez.");
        }
        console.error("Upload exception:", err);
        throw err;
    }
};
