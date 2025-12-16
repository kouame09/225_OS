export default function handler(request, response) {
    // Get country from Vercel header
    // Fallback to 'CI' for localhost/development to avoid blocking the developer
    const country = request.headers['x-vercel-ip-country'] || 'CI';

    const allowed = country === 'CI';

    response.status(200).json({
        allowed,
        country,
        timestamp: new Date().toISOString()
    });
}
