/**
 * Resolve blog image/thumbnail URLs from /blogs/ (public folder).
 */
export function getBlogImageUrl(pathOrFilename) {
  if (!pathOrFilename) return null;
  if (pathOrFilename.startsWith('http://') || pathOrFilename.startsWith('https://')) {
    return pathOrFilename;
  }
  const base = import.meta.env.BASE_URL || '/';
  const filename = pathOrFilename.replace(/^\/blogs\//, '');
  return `${base}blogs/${filename}`;
}
