export type GifItem = {
  id: string;
  title: string;
  media_formats: {
    [key: string]: {
      url: string;
      duration: number;
      preview: string;
      dims: [number, number];
      size: number;
    };
  };
  created: number;
  content_description: string;
  itemurl: string;
  url: string;
  tags: string[];
  flags: string[];
  hasaudio: boolean;
  content_description_source: string;
};

export type GifResponse = {
  results: GifItem[];
  next: string;
};
