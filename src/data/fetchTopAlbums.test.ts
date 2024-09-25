import fetchTopAlbums from "./fetchTopAlbums";
import fetchWithFallback from "./fallbackFetcher";
import CacheManager from "./CacheManager";
import generateCacheKey from "./generateCacheKey";
import { AlbumEntry } from "./response.types";
import { mockApiResponse, mockData } from "./mocks";

// Mock the fetchWithFallback module
jest.mock("./fallbackFetcher");

describe("fetchTopAlbums", () => {
  const cacheKey = generateCacheKey(
    "https://itunes.apple.com/us/rss/topalbums/limit=100/json"
  );

  let cacheManager: CacheManager<AlbumEntry[]>;

  beforeEach(() => {
    // Clear sessionStorage and mocks before each test
    sessionStorage.clear();
    jest.clearAllMocks();

    // Mock fetchWithFallback to return mock data
    (fetchWithFallback as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });

    // Initialize CacheManager
    cacheManager = new CacheManager<AlbumEntry[]>(2 * 60 * 1000);
  });

  it("should return data from cache if available", async () => {
    // Set data in cache
    cacheManager.set(cacheKey, mockData);

    const result = await fetchTopAlbums(100);

    expect(result).toEqual(mockData);
    expect(fetchWithFallback).not.toHaveBeenCalled();
  });

  it("should fetch new data if cache is expired or not available", async () => {
    const result = await fetchTopAlbums(100);

    expect(fetchWithFallback).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockData);
  });

  it("should cache the fetched data after a successful fetch", async () => {
    await fetchTopAlbums(100);

    const cachedData = cacheManager.get(cacheKey);
    expect(cachedData).toEqual(mockData);
  });

  it("should throw an error if the fetch fails", async () => {
    // set up mock fetch to fail
    (fetchWithFallback as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(fetchTopAlbums(100)).rejects.toThrow(
      "Fetch response was not ok"
    );
  });

  it("should throw an error if no data is found in the response", async () => {
    // set up mock fetch  to return a response without data
    (fetchWithFallback as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ feed: { entry: null } }),
    });

    await expect(fetchTopAlbums(100)).rejects.toThrow(
      "No data found in response"
    );
  });
});
