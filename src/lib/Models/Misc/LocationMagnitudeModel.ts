/** Model type representing magnitude information for an astronomical object */
export type LocationMagnitudeModel = {
  /** Boolean representing wheter or not there is a visibility alert */
  visibilityAlert: boolean;
  /** A visibility message */
  visibilityMessage?: string;
}