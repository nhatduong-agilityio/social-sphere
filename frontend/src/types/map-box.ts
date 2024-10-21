export type MapboxFeature = {
  text: string;
  place_name: string;
};

export type MapboxResponse = {
  type: string;
  query: string[];
  features: MapboxFeature[];
};
