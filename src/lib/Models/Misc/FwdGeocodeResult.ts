/** Model type representing a forward geocode response */
export type FwdGeocodeResult = {
  /** Short name */
  text: string;
  /** Long name */
  placeName: string;
  /** Longitude */
  longitude: number;
  /** Latitude */
  latitude: number;
};
