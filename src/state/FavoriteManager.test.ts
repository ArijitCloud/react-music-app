// FavoriteManager.test.ts
import FavoriteManager from "./FavoriteManager";

describe("FavoriteManager", () => {
  const SAVED_ALBUMS_KEY = "savedAlbums";

  beforeEach(() => {
    const store: Record<string, string> = {};

    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockImplementation((key) => {
        return store[key as string];
      });

    jest
      .spyOn(window.localStorage.__proto__, "setItem")
      .mockImplementation((key, value) => {
        store[key as string] = value as string;
      });

    jest
      .spyOn(window.localStorage.__proto__, "removeItem")
      .mockImplementation((key) => {
        delete store[key as string];
      });

    jest
      .spyOn(window.localStorage.__proto__, "clear")
      .mockImplementation(() => {
        Object.keys(store).forEach((key) => delete store[key]);
      });

    window.localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return an empty array when no saved albums", () => {
    const manager = new FavoriteManager();
    const result = manager.get();

    expect(result).toEqual([]);
  });

  it("should return saved album ids from localStorage", () => {
    const savedAlbums = ["album1", "album2"];
    window.localStorage.setItem(SAVED_ALBUMS_KEY, JSON.stringify(savedAlbums));

    const manager = new FavoriteManager();
    const result = manager.get();

    expect(result).toEqual(savedAlbums);
  });

  it("should save a new album id", () => {
    const manager = new FavoriteManager();
    manager.save("album1");
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      SAVED_ALBUMS_KEY,
      JSON.stringify(["album1"])
    );

    const result = manager.get();
    expect(result).toEqual(["album1"]);
  });

  it("should prepend new album ids when saving multiple albums", () => {
    const manager = new FavoriteManager();
    manager.save("album1");
    manager.save("album2");
    const result = manager.get();
    expect(result).toEqual(["album2", "album1"]);
  });

  it("should remove an existing album id", () => {
    const savedAlbums = ["album1", "album2", "album3"];
    window.localStorage.setItem(SAVED_ALBUMS_KEY, JSON.stringify(savedAlbums));

    const manager = new FavoriteManager();
    manager.remove("album2");
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      SAVED_ALBUMS_KEY,
      JSON.stringify(["album1", "album3"])
    );

    const result = manager.get();
    expect(result).toEqual(["album1", "album3"]);
  });
});
