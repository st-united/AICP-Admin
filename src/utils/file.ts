export const getFileType = (url: string) => {
  const ext = url.split('.').pop()?.toLowerCase();
  if (!ext) return 'unknown';
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'image';
  if (['pdf'].includes(ext)) return 'pdf';
  return 'other';
};
