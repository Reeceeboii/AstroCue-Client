import {
  Badge,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BookIcon from '@mui/icons-material/Book';
import { OutboundReportModel } from '../../lib/Models/Outbound/OutboundReportModel';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ErrorIcon from '@mui/icons-material/Error';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import UmbrellaIcon from '@mui/icons-material/Umbrella';

interface IReportProps {
  /** The report */
  report: OutboundReportModel;
  /** On delete callback */
  onDelete: (report: OutboundReportModel) => void;
}

const Report = ({ ...props }: IReportProps) => {
  const observationTime: Date = new Date(props.report.bestTimeToObserveUtc);

  const ObservationTimeString: string = observationTime.toLocaleString();

  const sunrise: string = new Date(props.report.weatherForecast.sunrise)
    .toLocaleTimeString()
    .slice(0, -3);

  const sunset: string = new Date(props.report.weatherForecast.sunset)
    .toLocaleTimeString()
    .slice(0, -3);

  return (
    <Card
      elevation={5}
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Link
          href={props.report.moreInformationUrl || ''}
          target='_blank'
          rel='noreferrer'
        >
          <Typography
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            variant='h5'
          >
            {props.report.astronomicalObjectName}
          </Typography>
        </Link>
        <Typography display='inline' variant='subtitle2' color='text.disabled'>
          Observe:{' '}
        </Typography>
        <Typography
          display='inline'
          variant='subtitle2'
          color={observationTime > new Date() ? 'success.main' : 'error.main'}
        >
          {ObservationTimeString}
        </Typography>
        <div />
        <Typography display='inline' variant='subtitle2' color='text.disabled'>
          Position (alt/az):{' '}
        </Typography>
        <Typography
          display='inline'
          variant='subtitle2'
          color={
            props.report.horizontalCoordinates.altitude < 0 ? 'error.main' : ''
          }
        >
          {props.report.horizontalCoordinates.altitude.toFixed(2)}° /{' '}
          {props.report.horizontalCoordinates.azimuth.toFixed(2)}°{' '}
        </Typography>
        <Typography display='inline'>
          {props.report.horizontalCoordinates.altitude < 0 && (
            <Tooltip
              title={`Despite the conditions, ${
                props.report.astronomicalObjectName
              } is ${Math.abs(
                props.report.horizontalCoordinates.altitude,
              ).toFixed(2)}° below the horizon at the time of the observation`}
            >
              <ErrorIcon color='error' fontSize='inherit' />
            </Tooltip>
          )}
        </Typography>
        <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
        <Stack direction='column' spacing={0.5}>
          <Stack direction='row' spacing={0.75}>
            <WbSunnyIcon sx={{ fontSize: 20 }} />
            <Typography
              display='inline'
              variant='subtitle2'
              color='text.disabled'
            >
              {`${sunset}/${sunrise}`}
            </Typography>
            <CloudIcon sx={{ fontSize: 20 }} />
            <Typography
              display='inline'
              variant='subtitle2'
              color='text.disabled'
            >
              {props.report.weatherForecast.cloudCoveragePercent}%
            </Typography>
            <ThermostatIcon sx={{ fontSize: 20 }} />
            <Typography
              display='inline'
              variant='subtitle2'
              color='text.disabled'
            >
              {props.report.weatherForecast.temperatureCelcius}°C
            </Typography>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <AirIcon sx={{ fontSize: 20 }} />
            <Typography
              display='inline'
              variant='subtitle2'
              color='text.disabled'
            >
              {props.report.weatherForecast.windSpeedMetersPerSec}m/s
            </Typography>
            <WaterIcon sx={{ fontSize: 20 }} />
            <Typography
              display='inline'
              variant='subtitle2'
              color='text.disabled'
            >
              {props.report.weatherForecast.probabilityOfPrecipitation}%
            </Typography>
            <UmbrellaIcon sx={{ fontSize: 20 }} />
            <Typography
              display='inline'
              variant='subtitle2'
              color='text.disabled'
            >
              {props.report.weatherForecast.probabilityOfPrecipitation}%
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Tooltip
          title={`Log your observation of ${props.report.astronomicalObjectName}`}
        >
          <IconButton onClick={() => props.onDelete(props.report)}>
            <BookIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete report'>
          <IconButton onClick={() => props.onDelete(props.report)}>
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default Report;
