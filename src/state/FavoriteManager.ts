const SAVED_ALBUMS_KEY = "savedAlbums";
class FavoriteManager {
  storage: Storage;
  constructor() {
    this.storage = window.localStorage;
  }

  get(): string[] {
    const currentSavedAlbums = localStorage.getItem(SAVED_ALBUMS_KEY);
    return currentSavedAlbums ? JSON.parse(currentSavedAlbums) : [];
  }

  save(value: string) {
    const savedAlbumIds = this.get();

    localStorage.setItem(
      SAVED_ALBUMS_KEY,
      JSON.stringify([value, ...savedAlbumIds])
    );
  }

  remove(value: string) {
    const savedAlbumIds = this.get();
    const updatedSavedAlbums = savedAlbumIds.filter((id) => id !== value);
    localStorage.setItem(SAVED_ALBUMS_KEY, JSON.stringify(updatedSavedAlbums));
  }
}

export default FavoriteManager;
