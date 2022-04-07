import { OutboundAstronomicalObjectModel } from './OutboundAstronomicalObjectModel';
import { OutboundObsLocationModel } from './OutboundObsLocationModel';

/** Model type representing an observation retrieved from the server */
export type OutboundObservationModel = {
  /** The ID of the observation */
  id: number;
  /** The ID of the observation location the observation takes place at */
  observationLocationId: number;
  /** The observation location the observation takes place at */
  observationLocation: OutboundObsLocationModel;
  /** The ID of the astronomical object that the observation is targeting */
  astronomicalObjectId: number;
  /** The {@link OutboundAstronomicalObjectModel} that the observation is targeting */
  astronomicalObject: OutboundAstronomicalObjectModel;
};
