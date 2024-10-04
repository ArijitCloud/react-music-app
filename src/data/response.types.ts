export interface FeedResponse {
  feed: {
    author: {
      name: {
        label: string;
      };
      uri: {
        label: string;
      };
    };
    entry: AlbumEntry[];
  };
}

export interface RawAlbumEntry {
  [key: string]: unknown; 
}

export interface AlbumEntry {
  id?: {
    label: string;
    id: string;
  };
  name: string;
  images: Image[];
  itemCount?: number;
  price?: {
    label: string;
    amount: number;
    currency: string;
  };
  contentType?: {
    primary: {
      term: string;
      label: string;
    };
    secondary: {
      term: string;
      label: string;
    };
  };
  rights?: string;
  title?: string;
  link?: {
    rel: string;
    type: string;
    href: string;
  };
  artist: {
    name: string;
    url?: string;
  };
  category?: {
    id: string;
    term: string;
    scheme: string;
    label: string;
  };
  releaseDate: {
    date: string;
    label: string;
  };
}

export interface Image {
  label: string;
  attributes: {
    height: string;
  };
}
