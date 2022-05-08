import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { OutboundObservationLogModel } from '../../lib/Models/Outbound/OutboundObservationLogModel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

interface IObservationLogProps {
  /** The observation log */
  observationLog: OutboundObservationLogModel;
  /** On delete callback */
  onDelete: (observationLog: OutboundObservationLogModel) => void;
  /** On edit callback */
  onEdit: (observationLog: OutboundObservationLogModel) => void;
  /** On expand callback */
  onExpand: (observationLog: OutboundObservationLogModel) => void;
}

const ObservationLog = ({ ...props }: IObservationLogProps) => {
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
      <CardActionArea onClick={() => props.onExpand(props.observationLog)}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant='h6' align='left'>
            {props.observationLog.observedAstronomicalObjectName} observed from{' '}
            {props.observationLog.observationLocationName}
          </Typography>
          <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />
          <Typography
            variant='subtitle2'
            align='left'
            sx={{
              fontWeight: 'bold',
            }}
          >
            Description
          </Typography>
          <Typography variant='body2' align='left' color='text.secondary'>
            {props.observationLog.textualDescription.substring(0, 100)}
            {props.observationLog.textualDescription.length > 100 && '...'}
          </Typography>
          {props.observationLog.observer && (
            <div>
              <Typography
                variant='subtitle2'
                align='left'
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Observer(s)
              </Typography>
              <Typography variant='body2' align='left' color='text.secondary'>
                {props.observationLog.observer}
              </Typography>
            </div>
          )}
          <Typography
            variant='subtitle2'
            align='left'
            sx={{
              fontWeight: 'bold',
            }}
          >
            Type
          </Typography>
          <Typography variant='body2' align='left' color='text.secondary'>
            {props.observationLog.typeOfObservation}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Tooltip title='Delete log'>
          <IconButton onClick={() => props.onDelete(props.observationLog)}>
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Edit log'>
          <IconButton onClick={() => props.onEdit(props.observationLog)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ObservationLog;
