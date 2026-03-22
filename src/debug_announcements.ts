import { getAnnouncements } from './services/announcementService';

const debugAnnouncements = async () => {
    console.log("Fetching all announcements...");
    const ann = await getAnnouncements();
    console.log(`Found ${ann.length} total announcements.`);
    ann.forEach(a => {
        console.log(`- [${a.is_active ? 'ACTIVE' : 'DRAFT'}] ${a.title} (${a.type})`);
    });
};

debugAnnouncements();
