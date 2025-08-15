export const getOriginalFileName = (url: string) => {
  try {
    const decodeUrl = decodeURIComponent(url);
    const parts = decodeUrl.split('+');
    return parts.length > 1 ? parts[1] : parts[0];
  } catch {
    return url;
  }
};

export const isUUID = (str: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
