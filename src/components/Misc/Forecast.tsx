import { Stack, Typography } from '@mui/material';
import {
  WeatherForecast as Forecast,
  WeatherForecast,
} from '../../lib/Models/Misc/WeatherForecast';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import UmbrellaIcon from '@mui/icons-material/Umbrella';

interface IForecastProps {
  /** The forecast */
  forecast: WeatherForecast | null;
}

/** Component to display a {@link WeatherForecast} */
const Forecast = ({ ...props }: IForecastProps) => {
  const iconSize: number = 20;

  const sunrise: string = new Date(props.forecast?.sunrise ?? 0)
    .toLocaleTimeString()
    .slice(0, -3);

  const sunset: string = new Date(props.forecast?.sunset ?? 0)
    .toLocaleTimeString()
    .slice(0, -3);

  return (
    <Stack direction='column' spacing={0.5}>
      <Stack direction='row' spacing={0.75}>
        <WbSunnyIcon sx={{ fontSize: iconSize }} />
        <Typography display='inline' variant='subtitle2' color='text.disabled'>
          {`${sunset}/${sunrise}`}
        </Typography>
        <CloudIcon sx={{ fontSize: iconSize }} />
        <Typography display='inline' variant='subtitle2' color='text.disabled'>
          {props.forecast?.cloudCoveragePercent}%
        </Typography>
        <ThermostatIcon sx={{ fontSize: iconSize }} />
        <Typography display='inline' variant='subtitle2' color='text.disabled'>
          {props.forecast?.temperatureCelcius}°C
        </Typography>
      </Stack>
      <Stack direction='row' spacing={0.75}>
        <AirIcon sx={{ fontSize: iconSize }} />
        <Typography display='inline' variant='subtitle2' color='text.disabled'>
          {props.forecast?.windSpeedMetersPerSec}m/s
        </Typography>
        <WaterIcon sx={{ fontSize: iconSize }} />
        <Typography display='inline' variant='subtitle2' color='text.disabled'>
          {props.forecast?.humidityPercent}%
        </Typography>
        <UmbrellaIcon sx={{ fontSize: iconSize }} />
        <Typography display='inline' variant='subtitle2' color='text.disabled'>
          {props.forecast?.probabilityOfPrecipitation}%
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Forecast;
