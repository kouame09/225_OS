/**
 * Convert a string to a URL-safe slug
 * @param text - The text to slugify
 * @returns A URL-safe slug
 */
export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        // Remove accents
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        // Replace spaces with hyphens
        .replace(/\s+/g, '-')
        // Remove all non-word chars except hyphens
        .replace(/[^\w\-]+/g, '')
        // Replace multiple hyphens with single hyphen
        .replace(/\-\-+/g, '-')
        // Remove leading/trailing hyphens
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

/**
 * Generate a unique slug by appending a number if necessary
 * @param baseSlug - The base slug to start with
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug
 */
export function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
    let slug = baseSlug;
    let counter = 1;

    while (existingSlugs.includes(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
}
