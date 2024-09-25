import CacheManager from "./CacheManager";

describe("CacheManager", () => {
  const mockData = { name: "Test Album" };
  const cacheKey = "test_key";
  let cacheManager: CacheManager<typeof mockData>;

  beforeEach(() => {
    sessionStorage.clear();
    cacheManager = new CacheManager<typeof mockData>();
  });

  it("should store data in sessionStorage with a timestamp", () => {
    cacheManager.set(cacheKey, mockData);

    expect(sessionStorage.getItem(cacheKey)).toEqual(JSON.stringify(mockData));
    expect(sessionStorage.getItem(`${cacheKey}_timestamp`)).not.toBeNull();
  });

  it("should retrieve cached data if not expired", () => {
    const timestamp = new Date().toISOString();

    sessionStorage.setItem(cacheKey, JSON.stringify(mockData));
    sessionStorage.setItem(`${cacheKey}_timestamp`, timestamp);

    const cachedData = cacheManager.get(cacheKey);

    expect(cachedData).toEqual(mockData);
  });

  it("should return null if cache is expired", () => {
    //set up expired cache
    const expiredTimestamp = new Date(
      Date.now() - 10 * 60 * 1000
    ).toISOString();
    sessionStorage.setItem(cacheKey, JSON.stringify(mockData));
    sessionStorage.setItem(`${cacheKey}_timestamp`, expiredTimestamp);

    const cachedData = cacheManager.get(cacheKey);

    expect(cachedData).toBeNull();
    expect(sessionStorage.getItem(cacheKey)).toBeNull();
    expect(sessionStorage.getItem(`${cacheKey}_timestamp`)).toBeNull();
  });

  it("should return null if there is no data in the cache", () => {
    const cachedData = cacheManager.get(cacheKey);
    expect(cachedData).toBeNull();
  });
});
