const itunesApiUrl = (limit: number = 100) =>
  `https://itunes.apple.com/us/rss/topalbums/limit=${limit}/json`;

export { itunesApiUrl };
