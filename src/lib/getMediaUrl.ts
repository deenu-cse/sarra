export function getMediaUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path; // Cloudinary or base64 URLs
  const base = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');
  return `${base}${path}`; // Prepend backend base URL for local uploads
}
