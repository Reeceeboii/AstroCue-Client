import { OutboundReportModel } from './OutboundReportModel';
/**
 * Type representing an outbound observation location from the server
 * along with a list of all the reports that exist for it in the database
 */
export type OutboundObsLocReportModel = {
  /** The ID of the location */
  name: string;
  /** The longitude of the observation location */
  longitude: number;
  /** The latitude of the observation location */
  latitude: number;
  /** The Bortle scale value - see server code for description */
  bortleScaleValue: number;
  /** The Bortle scale description - see server code for description */
  bortleDesc: string;
  /** A list of {@link OutboundReportModel} instances*/
  reports: OutboundReportModel[];
};
