import { SingleForecast } from '../Misc/SingleForecast';

/** Type representing an observation location item received from the server */
export type OutboundObsLocationModel = {
  /** The ID of the observation location */
  id: number;
  /** The name of the observation location */
  name: string;
  /** The longitude of the observation location */
  longitude: number;
  /** The latitude of the observation location */
  latitude: number;
  /** The Bortle scale value - see server code for description */
  bortleScaleValue: number;
  /** The Bortle scale description - see server code for description */
  bortleDesc: string;
  /** A {@link SingleForecast} instance */
  singleForecast: SingleForecast;
};
