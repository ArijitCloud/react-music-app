/**
 * CacheManager class to manage caching of data in the session storage.
 */
class CacheManager<T> {
  private cacheDuration: number;

  constructor(cacheDuration: number = 5 * 60 * 1000) {
    this.cacheDuration = cacheDuration;
  }

  /**
   * Get the cached data from the session storage
   * @param cacheKey The key to retrieve the cached data
   * @returns cached data if available, otherwise null
   */
  get(cacheKey: string): T | null {
    if (typeof sessionStorage !== "undefined") {
      const cachedData = sessionStorage.getItem(cacheKey);
      const cachedTimestamp = sessionStorage.getItem(`${cacheKey}_timestamp`);

      if (cachedData && cachedTimestamp) {
        const now = Date.now();
        const cacheTime = new Date(cachedTimestamp).getTime();

        // Validate cache by comparing the current time with the stored cache timestamp
        if (now - cacheTime < this.cacheDuration) {
          return JSON.parse(cachedData) as T;
        } else {
          sessionStorage.removeItem(cacheKey);
          sessionStorage.removeItem(`${cacheKey}_timestamp`);
        }
      }
    }
    return null;
  }
  
  /**
   * Set the data in the session storage
   * @param cacheKey The key to store the data
   * @param data The data to store
   */
  set(cacheKey: string, data: T): void {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
      sessionStorage.setItem(`${cacheKey}_timestamp`, new Date().toISOString());
    }
  }
}

export default CacheManager;
