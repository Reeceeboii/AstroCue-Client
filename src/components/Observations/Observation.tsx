import {
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from '@mui/material';
import { OutboundObservationModel } from '../../lib/Models/Outbound/OutboundObservationModel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface IObservationProps {
  /** The observation */
  observation: OutboundObservationModel;
  /** On delete callback */
  onDelete: (observation: OutboundObservationModel) => void;
}

const Observation = ({ ...props }: IObservationProps) => {
  return (
    <Card elevation={5} sx={{ height: '100%' }}>
      <CardContent>
        <Link
          href={props.observation.astronomicalObject.moreInformation || ''}
          target='_blank'
          rel='noreferrer'
        >
          <Typography
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            display='inline'
            variant='h5'
          >
            {`${props.observation.astronomicalObject.name}`}
          </Typography>
        </Link>
        <Typography display='inline' variant='body1' color='text.disabled'>
          {` (${props.observation.astronomicalObject.type})`}
        </Typography>
        <Typography variant='subtitle2' color='text.secondary'>
          {`Apparent magnitude: ${props.observation.astronomicalObject.apparentMagnitude}`}
        </Typography>
        <Divider>
          <Typography variant='overline'>Is being observed from</Typography>
        </Divider>
        <Typography variant='h5'>
          {props.observation.observationLocation.name}
        </Typography>
        <Typography variant='subtitle2' color='text.secondary'>
          {`${props.observation.observationLocation.latitude}, ${props.observation.observationLocation.longitude}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-start' }}>
        <Tooltip title='Delete observation'>
          <IconButton onClick={() => props.onDelete(props.observation)}>
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default Observation;
