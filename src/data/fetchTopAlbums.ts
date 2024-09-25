import CacheManager from "./CacheManager";
import generateCacheKey from "./generateCacheKey";
import { AlbumEntry, RawAlbumEntry } from "./response.types";
import { itunesApiUrl } from "./apiUrls";
import fetchWithFallback from "./fallbackFetcher";
import { mapTopAlbum } from "./mapTopAlbums";

/**
 * Fetches the top albums from the iTunes API.
 * @param topLimit total number of top albums to fetch. Default is 100.
 * @returns
 */
const fetchTopAlbums = async (topLimit?: number): Promise<AlbumEntry[]> => {
  const apiUrl = itunesApiUrl(topLimit);

  // Generate cache key from the API URL. Can be extended to include additional properties like headers, body if required.
  const cacheKey = generateCacheKey(apiUrl);

  // Return cached data if available
  const cacheManager = new CacheManager<AlbumEntry[]>(2 * 60 * 1000);
  const cachedData = cacheManager.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetchWithFallback(apiUrl);
    if (!response.ok) {
      throw new Error("Fetch response was not ok");
    }

    const data: { feed: { entry: Array<RawAlbumEntry> } } = await response.json();
    if (!data.feed.entry) {
      throw new Error("No data found in response");
    }
    const albums = data.feed.entry
      .map(mapTopAlbum)
      .filter((value) => value !== undefined);

    // Set the cache with the fetched data
    cacheManager.set(cacheKey, albums);

    return albums;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchTopAlbums;
