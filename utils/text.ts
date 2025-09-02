/**
 * Generates a concise summary from a given text.
 * It takes the first 5 lines and ensures the total length does not exceed 150 characters.
 * @param text The input string.
 * @returns A summary string.
 */
export const generateSummary = (text: string): string => {
    if (!text) return '';

    const lines = text.split('\n');
    const summaryLines = lines.slice(0, 5);
    let summary = summaryLines.join('\n').trim();

    if (summary.length > 150) {
        summary = summary.substring(0, 150).trim();
        // Ensure we don't cut a word in half
        const lastSpace = summary.lastIndexOf(' ');
        if (lastSpace > 0) {
            summary = summary.substring(0, lastSpace);
        }
    }
    
    // Add ellipsis if original text is longer than the generated summary
    if (summary.length < text.trim().length) {
        summary += '...';
    }

    return summary;
};
<<<<<<< HEAD

/**
 * Sanitizes a string to be used as a valid filename.
 * Replaces invalid characters, trims whitespace, and limits length.
 * @param filename The input string.
 * @returns A sanitized filename string.
 */
export const sanitizeFilename = (filename: string): string => {
    if (!filename) return 'untitled';
    // Replace invalid filesystem characters with an underscore
    // and limit the length to prevent issues.
    const sanitized = filename.replace(/[\/\\?%*:|"<>]/g, '_').substring(0, 100);
    return sanitized.trim() || 'untitled';
};
=======
>>>>>>> feature-branch
