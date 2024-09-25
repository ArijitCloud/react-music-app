import { AlbumEntry, RawAlbumEntry } from "./response.types";

export const mockApiResponse = {
    feed: {
      entry: [
        {
          "im:name": { label: "Test Album" },
          "im:image": [
            {
              label: "https://example.com/image1.png",
              attributes: { height: "55" },
            },
          ],
          "im:releaseDate": {
            label: "2023-09-06T00:00:00-07:00",
            attributes: { label: "September 6, 2023" },
          },
          "im:artist": {
            label: "Test Artist",
            attributes: { href: "https://example.com/artist" },
          },
          // Optional properties are omitted
        } as RawAlbumEntry,
      ],
    },
  };
  export const mockData: AlbumEntry[] = [
    {
      name: "Test Album",
      images: [
        {
          label: "https://example.com/image1.png",
          attributes: { height: "55" },
        },
      ],
      artist: {
        name: "Test Artist",
        url: "https://example.com/artist",
      },
      releaseDate: {
        date: "2023-09-06T00:00:00-07:00",
        label: "September 6, 2023",
      },
    },
  ];