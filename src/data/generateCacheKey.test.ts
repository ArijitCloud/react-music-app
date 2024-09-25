import generateCacheKey, { cacheKeyPrefix } from "./generateCacheKey";

describe("generateCacheKey", () => {
  const url1 = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";
  const url2 = "https://itunes.apple.com/us/rss/topalbums/limit=50/json";

  it("should generate a valid cache key based on the URL starts wtih expected prefix", () => {
    const cacheKey = generateCacheKey(url1);
    expect(cacheKey).toMatch(/^top_albums_cache_/);
  });

  it("should generate different cache keys for different URLs", () => {
    const cacheKey1 = generateCacheKey(url1);
    const cacheKey2 = generateCacheKey(url2);

    expect(cacheKey1).not.toEqual(cacheKey2);
  });

  it("should generate the same cache key for the same URL", () => {
    const cacheKey1 = generateCacheKey(url1);
    const cacheKey2 = generateCacheKey(url1);

    expect(cacheKey1).toEqual(cacheKey2);
  });

  it("should handle empty URL gracefully", () => {
    const cacheKey = generateCacheKey("");
    expect(cacheKey).toBe(`${cacheKeyPrefix}_0`);
  });
});
