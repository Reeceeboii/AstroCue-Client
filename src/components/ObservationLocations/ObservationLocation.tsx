import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import useAxios from 'axios-hooks';
import Image from 'next/image';
import React, { useEffect } from 'react';
import APIEndpoints from '../../lib/Constants/Endpoints';
import { OutboundObsLocationModel } from '../../lib/Models/ObservationLocations/OutboundObsLocationModel';

interface IObservationLocationProps {
  location: OutboundObsLocationModel;
  onDelete: (location: OutboundObsLocationModel) => void;
}

const ObservationLocation = ({
  location,
  onDelete: deleteCallback,
}: IObservationLocationProps) => {
  const [{ loading }, fetchStaticMapImage] = useAxios(
    {
      url: `${APIEndpoints.ObservationLocation.StaticMap}/${location.id}`,
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
    <Card elevation={5}>
      <CardMedia>
        {loading || base64MapData === 'data:image/png;base64,' ? (
          <Skeleton
            variant='rectangular'
            animation='wave'
            width='100%'
            height={275}
          />
        ) : (
          <Image
            src={base64MapData}
            alt={`Map of ${location.name}`}
            width={400}
            height={275}
            layout='responsive'
            objectFit='contain'
          />
        )}
      </CardMedia>
      <CardContent>
        <Typography variant='h5'>{location.name}</Typography>
        <Typography variant='subtitle1' color='GrayText'>
          {`${location.latitude}, ${location.longitude}`}
        </Typography>
        <Typography variant='body2'>
          {`${location.singleForecast.description}`}
        </Typography>
        <Typography variant='body2'>
          {`🌡️ ${location.singleForecast.temperatureCelcius}°C ☁️ ${location.singleForecast.cloudCoveragePercent}%`}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Tooltip title={`Delete ${location.name}`}>
          <IconButton onClick={() => deleteCallback(location)}>
            <DeleteForeverIcon sx={{ justifyContent: 'right' }} />
          </IconButton>
        </Tooltip>
        <Typography display='inline' variant='subtitle2' color='GrayText'>
          {`${location.bortleDesc}`}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default ObservationLocation;
