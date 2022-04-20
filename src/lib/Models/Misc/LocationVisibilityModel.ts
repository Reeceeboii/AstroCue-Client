/** Model type representing a small visibility report about an astronomical object */
export type LocationVisibilityModel = {
  /** Boolean representing whether or not there is a visibility alert */
  visibilityAlert: boolean;
  /** Boolean representing whether or not there is a horizon alert */
  horizonAlert: boolean;
  /** A visibility message */
  visibilityMessage?: string;
  /** A horizon message */
  horizonMessage?: string;
};
