import { LocationMagnitudeModel } from './../Misc/LocationMagnitudeModel';

/** Model type representing an astronomical object retrieved from the server */
export type OutboundAstronomicalObjectModel = {
  /** The ID of the astronomical object */
  id: number;
  /** The catalogue identifier of the astronomical object */
  catalogueIdentifier: number;
  /** The name of the astronomical object */
  name?: string;
  /** The type of the astronomical object */
  type?: string;
  /** The object's apparent magnitude */
  apparentMagnitude: number;
  /** The object's {@link LocationMagnitudeModel} */
  locationVMagReport: LocationMagnitudeModel;
  /** A link to discover more information about the object */
  moreInformation?: string;
};
