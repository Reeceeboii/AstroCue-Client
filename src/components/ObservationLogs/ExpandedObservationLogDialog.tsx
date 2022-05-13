import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { OutboundObservationLogModel } from '../../lib/Models/Outbound/OutboundObservationLogModel';
import Forecast from '../Misc/Forecast';

interface IExpandedObservationLogDialogProps {
  /** Is the dialog open? */
  open: boolean;
  /** The expanded log */
  observationLog: OutboundObservationLogModel | null;
  /** The handle close callback */
  handleClose: () => void;
}

const ExpandedObservationLogDialog = ({
  ...props
}: IExpandedObservationLogDialogProps) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose} scroll='paper'>
      <DialogTitle>Details</DialogTitle>
      <DialogContent dividers>
        <Typography
          variant='body1'
          sx={{
            fontWeight: 'bold',
            textDecoration: 'underline',
          }}
        >
          Object
        </Typography>
        <DialogContentText>
          {props.observationLog?.observedAstronomicalObjectName}
        </DialogContentText>
        <Typography
          variant='body1'
          sx={{
            fontWeight: 'bold',
            textDecoration: 'underline',
            paddingTop: '10px',
          }}
        >
          Observation location
        </Typography>
        <DialogContentText>
          {props.observationLog?.observationLocationName}{' '}
          {`(${props.observationLog?.observationLocationLatitude}, ${props.observationLog?.observationLocationLongitude})`}
        </DialogContentText>
        <Typography
          variant='body1'
          sx={{
            fontWeight: 'bold',
            textDecoration: 'underline',
            paddingTop: '10px',
          }}
        >
          Observation time
        </Typography>
        <DialogContentText>
          {new Date(
            props.observationLog?.calculatedBestTimeToObserveUtc ?? 0,
          ).toLocaleString()}
        </DialogContentText>
        <Typography
          variant='body1'
          sx={{
            fontWeight: 'bold',
            textDecoration: 'underline',
            paddingTop: '10px',
          }}
        >
          Coordintates (altitude/azimuth)
        </Typography>
        <DialogContentText>
          {props.observationLog?.horizontalCoordinates.altitude}° /{' '}
          {props.observationLog?.horizontalCoordinates.azimuth}°
        </DialogContentText>
        <Typography
          variant='body1'
          sx={{
            fontWeight: 'bold',
            textDecoration: 'underline',
            paddingTop: '10px',
          }}
        >
          Description
        </Typography>
        <DialogContentText>
          {props.observationLog?.textualDescription}
        </DialogContentText>
        <Typography
          variant='body1'
          sx={{
            fontWeight: 'bold',
            textDecoration: 'underline',
            paddingTop: '10px',
          }}
        >
          Observer(s)
        </Typography>
        <DialogContentText>{props.observationLog?.observer}</DialogContentText>
        <Typography
          variant='body1'
          sx={{
            fontWeight: 'bold',
            textDecoration: 'underline',
            paddingTop: '10px',
          }}
        >
          Type of observation
        </Typography>
        <DialogContentText>
          {props.observationLog?.typeOfObservation}
        </DialogContentText>
        <Typography
          variant='body1'
          sx={{
            fontWeight: 'bold',
            textDecoration: 'underline',
            paddingTop: '10px',
          }}
        >
          Weather at time of observation
        </Typography>
        <Forecast forecast={props.observationLog?.weatherForecast ?? null} />
      </DialogContent>
    </Dialog>
  );
};

export default ExpandedObservationLogDialog;
