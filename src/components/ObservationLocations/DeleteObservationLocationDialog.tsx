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
import { OutboundObsLocationModel } from '../../lib/Models/Outbound/OutboundObsLocationModel';
import { LoadingButton } from '@mui/lab';
import APIEndpoints from '../../lib/Constants/Endpoints';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';
import { config } from '../../lib/Toast/Config';
import React, { useContext, useState } from 'react';
import { AstroCueObjectContext } from '../../Context/AstroCueObjectContext';

interface IDeleteDialogProps {
  /** Is the dialog open? */
  open: boolean;
  /** The handle close callback */
  handleClose: () => void;
  /** The location to delete */
  location: OutboundObsLocationModel | null;
}

const DeleteObservationLocationDialog = ({ ...props }: IDeleteDialogProps) => {
  const { updateObservationLocations, updateObservations } = useContext(
    AstroCueObjectContext,
  );
  const [submitLocked, setSubmitLocked] = useState(false);

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

  const handleDeleteAsync = async () => {
    try {
      await deleteLocation();
      updateObservationLocations?.();
      updateObservations?.();
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
          onClick={() => handleDeleteAsync()}
          loading={loading || submitLocked}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteObservationLocationDialog;
