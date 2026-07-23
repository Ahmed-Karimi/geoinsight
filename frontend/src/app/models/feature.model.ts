export interface FeatureProperties {
  id: number;
  name: string;
  type: string;
  status: string;
  lastReading: number;
  unit: string;
}

export interface GeoFeature {
  type: 'Feature';
  // GeoJSON geometry — coordinates are [longitude, latitude].
  geometry: { type: 'Point'; coordinates: [number, number] };
  properties: FeatureProperties;
}

export interface FeatureCollection {
  type: 'FeatureCollection';
  features: GeoFeature[];
}
