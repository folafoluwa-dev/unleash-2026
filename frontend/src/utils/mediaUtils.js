const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

/**
 * Resolves a media URL returned by Django.
 * - If the URL is absolute (starts with http), return it unchanged.
 * - If it's a relative path (e.g., "/media/speakers/photo.jpg"), prepend the API base.
 * - If the value is null/undefined, return null.
 */
export function getMediaUrl(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${API_BASE}${path}`;
}