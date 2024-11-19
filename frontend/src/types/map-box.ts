export type MapboxFeature = {
  text: string;
  place_name: string;
  properties: { short_code: string };
};

export type MapboxResponse = {
  type: string;
  query: string[];
  features: MapboxFeature[];
};
