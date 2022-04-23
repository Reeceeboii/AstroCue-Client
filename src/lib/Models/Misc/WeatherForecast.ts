/** Type representing a full weather forecast */
export type WeatherForecast = {
  /** The percentage cloud coverage */
  cloudCoveragePercent: number;
  /** The temperature in degrees Celsius */
  temperatureCelcius: number;
  /** The humidity percentage */
  humidityPercent: number;
  /** The wind speed in meters per second */
  windSpeedMetersPerSec: number;
  /** The probability of precipitation */
  probabilityOfPrecipitation: number;
  /** A short description of the weather */
  description: string;
  /** Sunset time */
  sunset: Date;
  /** Sunrise time */
  sunrise: Date;
};
