import { Announcement } from '../types';
import { getAuthToken } from '../utils/supabaseUtils';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const mapAnnouncementFromDB = (dbAnn: any): Announcement => ({
    id: dbAnn.id,
    title: dbAnn.title,
    description: dbAnn.description,
    date: dbAnn.date,
    location: dbAnn.location,
    learnMoreUrl: dbAnn.learn_more_url,
    registerUrl: dbAnn.register_url,
    order_index: dbAnn.order_index,
    created_at: dbAnn.created_at,
    type: dbAnn.type || 'event',
    tag: dbAnn.tag,
    image_url: dbAnn.image_url,
    is_active: dbAnn.is_active ?? true
});

export const getAnnouncements = async (): Promise<Announcement[]> => {
    try {
        if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error("Missing Supabase config");

        const token = await getAuthToken();
        const authHeader = token ? `Bearer ${token}` : `Bearer ${SUPABASE_KEY}`;

        const response = await fetch(`${SUPABASE_URL}/rest/v1/announcements?select=*&order=order_index.asc,created_at.desc`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Announcements Query Failed:", response.status, errorText);
            throw new Error(`Fetch error: ${response.status}`);
        }

        const data = await response.json();
        return (data || []).map(mapAnnouncementFromDB);
    } catch (err) {
        console.error("announcementService: getAnnouncements failed", err);
        return [];
    }
};

export const addAnnouncement = async (announcement: Omit<Announcement, 'id' | 'created_at'>): Promise<void> => {
    try {
        const token = await getAuthToken();
        if (!SUPABASE_URL || !SUPABASE_KEY || !token) throw new Error("Missing config or auth token");

        const response = await fetch(`${SUPABASE_URL}/rest/v1/announcements`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                title: announcement.title,
                description: announcement.description,
                date: announcement.date,
                location: announcement.location,
                learn_more_url: announcement.learnMoreUrl,
                register_url: announcement.registerUrl,
                order_index: announcement.order_index,
                type: announcement.type,
                tag: announcement.tag,
                image_url: announcement.image_url,
                is_active: announcement.is_active
            })
        });

        if (!response.ok) throw new Error(`Add Announcement Failed: ${response.status}`);
    } catch (err) {
        console.error("announcementService: addAnnouncement failed", err);
        throw err;
    }
};

export const updateAnnouncement = async (id: string | number, announcement: Partial<Announcement>): Promise<void> => {
    try {
        const token = await getAuthToken();
        if (!SUPABASE_URL || !SUPABASE_KEY || !token) throw new Error("Missing config or auth token");

        // Filter out undefined values to only update provided fields
        const body: any = {};
        if (announcement.title !== undefined) body.title = announcement.title;
        if (announcement.description !== undefined) body.description = announcement.description;
        if (announcement.date !== undefined) body.date = announcement.date;
        if (announcement.location !== undefined) body.location = announcement.location;
        if (announcement.learnMoreUrl !== undefined) body.learn_more_url = announcement.learnMoreUrl;
        if (announcement.registerUrl !== undefined) body.register_url = announcement.registerUrl;
        if (announcement.order_index !== undefined) body.order_index = announcement.order_index;
        if (announcement.type !== undefined) body.type = announcement.type;
        if (announcement.tag !== undefined) body.tag = announcement.tag;
        if (announcement.image_url !== undefined) body.image_url = announcement.image_url;
        if (announcement.is_active !== undefined) body.is_active = announcement.is_active;

        const response = await fetch(`${SUPABASE_URL}/rest/v1/announcements?id=eq.${id}`, {
            method: 'PATCH',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) throw new Error(`Update Announcement Failed: ${response.status}`);
    } catch (err) {
        console.error("announcementService: updateAnnouncement failed", err);
        throw err;
    }
};

export const deleteAnnouncement = async (id: string | number): Promise<void> => {
    try {
        const token = await getAuthToken();
        if (!SUPABASE_URL || !SUPABASE_KEY || !token) throw new Error("Missing config or auth token");

        const response = await fetch(`${SUPABASE_URL}/rest/v1/announcements?id=eq.${id}`, {
            method: 'DELETE',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error(`Delete Announcement Failed: ${response.status}`);
    } catch (err) {
        console.error("announcementService: deleteAnnouncement failed", err);
        throw err;
    }
};
