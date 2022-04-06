import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';
import { OutboundObsLocationModel } from '../../lib/Models/ObservationLocations/OutboundObsLocationModel';
import { LoadingButton } from '@mui/lab';
import APIEndpoints from '../../lib/Constants/Endpoints';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';
import { config } from '../../lib/Toast/Config';
import { useAstroCueObjectContext } from '../../Context/AstroCueObjectContext';
import React from 'react';

interface IDeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  location: OutboundObsLocationModel | null;
}

const DeleteDialog = ({ ...props }: IDeleteDialogProps) => {
  const { updateObservationLocations } = useAstroCueObjectContext();
  const [submitLocked, setSubmitLocked] = React.useState(false);

  const [{ loading }, deleteLocation] = useAxios<OutboundObsLocationModel>(
    {
      url: APIEndpoints.ObservationLocation.Delete,
      method: 'DELETE',
      params: {
        id: props.location?.id,
      },
    },
    { manual: true },
  );

  const handleDelete = async () => {
    try {
      await deleteLocation();
      await updateObservationLocations?.();
      props.handleClose();
      toast.success(`${props.location?.name} deleted!`, config);
    } catch (error: any) {
      setSubmitLocked(true);
      toast.error(error.response.data.message, config);
      setTimeout(() => {
        setSubmitLocked(false);
      }, 1000);
    }
  };

  return (
    <Dialog open={props.open} keepMounted onClose={props.handleClose}>
      <DialogTitle>{`Delete '${props.location?.name}'?`}</DialogTitle>
      <DialogContent>
        <DialogContentText paragraph>
          You cannot delete locations that have reports associated with them.
        </DialogContentText>
        <DialogContentText>
          Any observations linked to this location will be deleted.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          color='error'
          startIcon={<CancelIcon />}
          onClick={props.handleClose}
        >
          Cancel
        </Button>
        <LoadingButton
          variant='contained'
          color='success'
          type='submit'
          startIcon={<DeleteForeverIcon />}
          onClick={() => handleDelete()}
          loading={loading || submitLocked}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
