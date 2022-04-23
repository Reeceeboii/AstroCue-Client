import { AltAz } from '../Misc/AltAz';
import { WeatherForecast } from './../Misc/WeatherForecast';

/** Type representing an observation log received from the server */
export type OutboundObservationLogModel = {
  /** The ID of the log */
  id: number;
  /** A textual description of what was observed */
  textualDescription: string;
  /** The observer(s) that carried out the observation being logged */
  observer: string;
  /** The type of observation that was carried out */
  observationType: string;
  /** The weather forecast attached to the log */
  weatherForecast: WeatherForecast;
  /** The name of the observation location where the observation took place */
  observationLocationName: string;
  /** The latitude of the observation location where the observation took place */
  observationLocationLatitude: number;
  /** The longitude of the observation location where the observation took place */
  observationLocationLongitude: number;
  /** The name of the astronomical object that was observed */
  observedAstronomicalObjectName: string;
  /** The date that was calculated as the optimal observation time */
  calculatedBestTimeToObserveUtc: Date;
  /** The calculated position of the object */
  horizontalCoordinates: AltAz;
};
