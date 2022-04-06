/** Type representing a simple, single weather forecast */
export type SingleForecast = {
  /** The percentage cloud coverage */
  cloudCoveragePercent: number;
  /** The temperature in degrees Celsius */
  temperatureCelcius: number;
  /** A short description of the weather */
  description: string;
  /** The time that the forecast was retrieved at */
  retrievedAt: Date;
};
