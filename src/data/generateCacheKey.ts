export const cacheKeyPrefix = "top_albums_cache";
const generateCacheKey = (url: string): string => {
  const encodedUrl = btoa(url);
  // Simple hash function to generate a cache key
  let hash = 0;
  for (let i = 0; i < encodedUrl.length; i++) {
    const char = encodedUrl.charCodeAt(i); //string to char code
    hash = (hash * 31 + char) | 0; // 32-bit integer conversion
  }

  return `${cacheKeyPrefix}_${hash}`;
};

export default generateCacheKey;
