export const checkIsLocationAllowed = async (): Promise<boolean> => {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            throw new Error('Failed to fetch location');
        }
        const data = await response.json();
        return data.country_code === 'CI';
    } catch (error) {
        console.error('Error checking location:', error);
        // Default to blocking if check fails, as per plan
        return false;
    }
};
