import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import useAxios from 'axios-hooks';
import Image from 'next/image';
import React, { useEffect } from 'react';
import APIEndpoints from '../../lib/Constants/Endpoints';
import { OutboundObsLocationModel } from '../../lib/Models/Outbound/OutboundObsLocationModel';

interface IObservationLocationProps {
  /** The location */
  location: OutboundObsLocationModel;
  /** On delete callback */
  onDelete: (location: OutboundObsLocationModel) => void;
  /** On edit callback */
  onEdit: (location: OutboundObsLocationModel) => void;
}

const ObservationLocation = ({ ...props }: IObservationLocationProps) => {
  const [{}, fetchStaticMapImage] = useAxios(
    {
      url: `${APIEndpoints.ObservationLocation.StaticMap}/${props.location.id}`,
      params: {
        asBase64: true,
      },
    },
    {
      manual: true,
    },
  );

  const [base64MapData, setBase64MapData] = React.useState(
    'data:image/png;base64,',
  );

  useEffect(() => {
    async function getMap() {
      if (base64MapData !== 'data:image/png;base64,') {
        return;
      }
      const { data } = await fetchStaticMapImage();
      setBase64MapData(data);
    }
    getMap();
  }, [fetchStaticMapImage, setBase64MapData, base64MapData]);

  return (
    <Card elevation={5} sx={{ height: '100%' }}>
      <CardMedia>
        <Image
          src={base64MapData}
          alt={`Map of ${props.location.name}`}
          placeholder='blur'
          blurDataURL='/map_blur.png'
          width={400}
          height={275}
          layout='responsive'
        />
      </CardMedia>
      <CardContent>
        <Typography variant='h5'>{props.location.name}</Typography>
        <Typography variant='h6'>
          {`${props.location.latitude}, ${props.location.longitude}`}
        </Typography>
        <Typography variant='body2'>
          {`${props.location.bortleDesc}`}
        </Typography>
        <Typography display='inline' variant='body2' color='text.disabled'>
          {`${props.location.singleForecast.description} | ${props.location.singleForecast.temperatureCelcius}°C | `}
        </Typography>
        <Typography display='inline' variant='body2' color='text.disabled'>
          {`${props.location.singleForecast.cloudCoveragePercent}% clouds`}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-start' }}>
        <Tooltip title={`Delete ${props.location.name}`}>
          <IconButton onClick={() => props.onDelete(props.location)}>
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={`Edit ${props.location.name}`}>
          <IconButton onClick={() => props.onEdit(props.location)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ObservationLocation;
