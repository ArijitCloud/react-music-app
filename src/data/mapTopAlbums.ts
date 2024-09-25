import { AlbumEntry, RawAlbumEntry } from "./response.types";

export const mapTopAlbum = (entry: RawAlbumEntry): AlbumEntry | undefined => {
  // Validate required properties
  if (
    !entry["im:name"]?.label ||
    !entry["im:image"] ||
    !entry["im:releaseDate"]?.label ||
    !entry["im:artist"]?.label
  ) {
    return undefined;
  }

  return {
    // Required properties
    name: entry["im:name"].label,
    images: entry["im:image"],
    artist: {
      name: entry["im:artist"].label,
      url: entry["im:artist"].attributes?.href,
    },
    releaseDate: {
      date: entry["im:releaseDate"].label,
      label: entry["im:releaseDate"].attributes?.label,
    },

    // Optional properties
    ...(entry.id?.label &&
      entry.id.attributes?.["im:id"] && {
        id: {
          label: entry.id.label,
          id: entry.id.attributes["im:id"],
        },
      }),
    ...(entry.link?.attributes && {
      link: {
        rel: entry.link.attributes.rel,
        type: entry.link.attributes.type,
        href: entry.link.attributes.href,
      },
    }),
    ...(entry["im:itemCount"]?.label && {
      itemCount: parseInt(entry["im:itemCount"].label, 10),
    }),
    ...(entry["im:price"]?.label &&
      entry["im:price"].attributes?.amount &&
      entry["im:price"].attributes?.currency && {
        price: {
          label: entry["im:price"].label,
          amount: parseFloat(entry["im:price"].attributes.amount),
          currency: entry["im:price"].attributes.currency,
        },
      }),
    ...(entry["im:contentType"]?.["im:contentType"]?.attributes?.term &&
      entry["im:contentType"].attributes?.term && {
        contentType: {
          primary: {
            term: entry["im:contentType"]["im:contentType"].attributes.term,
            label: entry["im:contentType"]["im:contentType"].attributes.label,
          },
          secondary: {
            term: entry["im:contentType"].attributes.term,
            label: entry["im:contentType"].attributes.label,
          },
        },
      }),
    ...(entry.rights?.label && { rights: entry.rights.label }),
    ...(entry.title?.label && { title: entry.title.label }),
    ...(entry.category?.attributes?.["im:id"] && {
      category: {
        id: entry.category.attributes["im:id"],
        term: entry.category.attributes.term,
        scheme: entry.category.attributes.scheme,
        label: entry.category.attributes.label,
      },
    }),
  };
};
