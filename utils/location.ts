export const checkIsLocationAllowed = async (): Promise<boolean> => {
    try {
        // Bypass check in development environment
        if (import.meta.env.DEV) {
            return true;
        }

        // Use our own server-side API which checks Vercel headers or falls back to 'CI' in dev
        const response = await fetch('/api/check-location');

        if (!response.ok) {
            console.warn('Location check API failed, failing gracefully');
            return false;
        }

        const data = await response.json();
        return data.allowed === true;
    } catch (error) {
        console.error('Error checking location:', error);
        // Default to blocking if check fails completely
        return false;
    }
};
