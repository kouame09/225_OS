import { LaunchpadProduct } from '../types';
import { slugify } from '../utils/slugify';
import { getAuthToken } from '../utils/supabaseUtils';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const mapProductFromDB = (dbProduct: any): LaunchpadProduct => ({
    id: dbProduct.id,
    name: dbProduct.name,
    tagline: dbProduct.tagline,
    description: dbProduct.description,
    url: dbProduct.url,
    image_url: dbProduct.image_url,
    maker_id: dbProduct.maker_id,
    slug: dbProduct.slug,
    contact_email: dbProduct.contact_email,
    created_at: dbProduct.created_at,
    votes_count: dbProduct.votes_count || 0,
    has_voted: dbProduct.has_voted || false,
    maker: dbProduct.maker ? {
        id: dbProduct.maker.id,
        username: dbProduct.maker.username,
        full_name: dbProduct.maker.full_name,
        avatar_url: dbProduct.maker.avatar_url
    } : undefined
});

export const getLaunchpadProducts = async (currentUserId?: string): Promise<LaunchpadProduct[]> => {
    try {
        if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error("Missing Supabase config");

        let select = `*,profiles!maker_id(*),product_votes(count)`;

        if (currentUserId) {
            select = `*,profiles!maker_id(*),product_votes(count),has_voted:product_votes(user_id)`;
        }

        const response = await fetch(`${SUPABASE_URL}/rest/v1/products?select=${select}&order=created_at.desc`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Launchpad Query Failed:", response.status, errorText);
            throw new Error(`Fetch error: ${response.status}`);
        }

        const data = await response.json();

        const processedData = (data || []).map((p: any) => ({
            ...p,
            maker: p.profiles,
            has_voted: currentUserId ? (p.has_voted || []).some((v: any) => v.user_id === currentUserId) : false,
            votes_count: p.product_votes?.[0]?.count || 0
        }));

        return processedData.map(mapProductFromDB);
    } catch (err) {
        console.error("launchpadService: getLaunchpadProducts failed", err);
        return [];
    }
};

export const getLaunchpadProductBySlug = async (slug: string, currentUserId?: string): Promise<LaunchpadProduct | null> => {
    try {
        if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error("Missing Supabase config");

        let select = `*,profiles!maker_id(*),product_votes(count)`;
        if (currentUserId) {
            select = `*,profiles!maker_id(*),product_votes(count),has_voted:product_votes(user_id)`;
        }

        const response = await fetch(`${SUPABASE_URL}/rest/v1/products?slug=eq.${slug}&select=${select}&limit=1`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error(`Fetch error: ${response.status}`);

        const data = await response.json();
        if (!data || data.length === 0) return null;

        const p = data[0];
        const processedProduct = {
            ...p,
            maker: p.profiles,
            has_voted: currentUserId ? (p.has_voted || []).some((v: any) => v.user_id === currentUserId) : false,
            votes_count: p.product_votes?.[0]?.count || 0
        };

        return mapProductFromDB(processedProduct);
    } catch (err) {
        console.error("launchpadService: getLaunchpadProductBySlug failed", err);
        return null;
    }
};

export const addLaunchpadProduct = async (product: Omit<LaunchpadProduct, 'id' | 'created_at' | 'slug'>): Promise<void> => {
    try {
        const token = await getAuthToken();
        if (!SUPABASE_URL || !SUPABASE_KEY || !token) throw new Error("Missing config or auth token");

        const slug = slugify(product.name);

        const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                name: product.name,
                tagline: product.tagline,
                description: product.description,
                url: product.url,
                image_url: product.image_url,
                maker_id: product.maker_id,
                contact_email: product.contact_email,
                slug: slug
            })
        });

        if (!response.ok) throw new Error(`Add Product Failed: ${response.status}`);
    } catch (err) {
        console.error("launchpadService: addLaunchpadProduct failed", err);
        throw err;
    }
};

export const updateLaunchpadProduct = async (id: string, product: Partial<LaunchpadProduct>): Promise<void> => {
    try {
        const token = await getAuthToken();
        if (!SUPABASE_URL || !SUPABASE_KEY || !token) throw new Error("Missing config or auth token");

        const response = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
            method: 'PATCH',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                name: product.name,
                tagline: product.tagline,
                description: product.description,
                url: product.url,
                image_url: product.image_url,
                contact_email: product.contact_email
            })
        });

        if (!response.ok) throw new Error(`Update Product Failed: ${response.status}`);
    } catch (err) {
        console.error("launchpadService: updateLaunchpadProduct failed", err);
        throw err;
    }
};

export const deleteLaunchpadProduct = async (id: string): Promise<void> => {
    try {
        const token = await getAuthToken();
        if (!SUPABASE_URL || !SUPABASE_KEY || !token) throw new Error("Missing config or auth token");

        // First delete votes to avoid foreign key violations if not cascaded
        await fetch(`${SUPABASE_URL}/rest/v1/product_votes?product_id=eq.${id}`, {
            method: 'DELETE',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${token}`
            }
        });

        const response = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
            method: 'DELETE',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error(`Delete Product Failed: ${response.status}`);
    } catch (err) {
        console.error("launchpadService: deleteLaunchpadProduct failed", err);
        throw err;
    }
};

export const toggleVote = async (productId: string, userId: string, isCurrentlyVoted: boolean): Promise<boolean> => {
    try {
        const token = await getAuthToken();
        if (!SUPABASE_URL || !SUPABASE_KEY || !token) throw new Error("Missing config or auth token");

        if (isCurrentlyVoted) {
            // Remove vote
            const response = await fetch(`${SUPABASE_URL}/rest/v1/product_votes?product_id=eq.${productId}&user_id=eq.${userId}`, {
                method: 'DELETE',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error("Failed to remove vote");
            return false;
        } else {
            // Add vote
            const response = await fetch(`${SUPABASE_URL}/rest/v1/product_votes`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                    product_id: productId,
                    user_id: userId
                })
            });
            if (!response.ok) throw new Error("Failed to add vote");
            return true;
        }
    } catch (err) {
        console.error("launchpadService: toggleVote failed", err);
        throw err;
    }
};

export const getUserLaunchpadProducts = async (userId: string): Promise<LaunchpadProduct[]> => {
    try {
        if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error("Missing Supabase config");

        const select = `*,product_votes(count)`;

        const response = await fetch(`${SUPABASE_URL}/rest/v1/products?maker_id=eq.${userId}&select=${select}&order=created_at.desc`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error(`Fetch error: ${response.status}`);

        const data = await response.json();
        const processedData = (data || []).map((p: any) => ({
            ...p,
            votes_count: p.product_votes?.[0]?.count || 0
        }));
        return processedData.map(mapProductFromDB);
    } catch (err) {
        console.error("launchpadService: getUserLaunchpadProducts failed", err);
        return [];
    }
};
