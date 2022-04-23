import { AltAz } from '../Misc/AltAz';
import { WeatherForecast } from '../Misc/WeatherForecast';

/** Type representing a report received from the server */
export type OutboundReportModel = {
  /** The ID of the report */
  id: number;
  /** The name of the astronomical object being observed */
  astronomicalObjectName: string;
  /** The calculated best time to observe (in UTC) */
  bestTimeToObserveUtc: Date;
  /** A URL that can be visited to find more information about the object */
  moreInformationUrl: string;
  /** The weather forecast */
  weatherForecast: WeatherForecast;
  /** The position of the object */
  horizontalCoordinates: AltAz;
};
