export const getOriginalFileName = (url: string) => {
  try {
    const decodeUrl = decodeURIComponent(url);
    const parts = decodeUrl.split('+');
    return parts.length > 1 ? parts[1] : parts[0];
  } catch {
    return url;
  }
};
