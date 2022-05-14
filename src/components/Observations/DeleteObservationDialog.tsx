import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import useAxios from 'axios-hooks';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AstroCueObjectContext } from '../../Context/AstroCueObjectContext';
import APIEndpoints from '../../lib/Constants/Endpoints';
import { OutboundObservationModel } from '../../lib/Models/Outbound/OutboundObservationModel';
import { config } from '../../lib/Toast/Config';

interface IDeleteDialogProps {
  /** Is the dialog open? */
  open: boolean;
  /** The handle close callback */
  handleClose: () => void;
  /** The observation to delete */
  observation: OutboundObservationModel | null;
}

const DeleteObservationDialog = ({ ...props }: IDeleteDialogProps) => {
  const { updateObservations } = useContext(AstroCueObjectContext);
  const [submitLocked, setSubmitLocked] = useState(false);

  const [{ loading }, deleteObservation] = useAxios<OutboundObservationModel>(
    {
      url: APIEndpoints.Observation.Delete,
      method: 'DELETE',
      params: {
        id: props.observation?.id,
      },
    },
    { manual: true },
  );

  const handleDeleteAsync = async () => {
    try {
      await deleteObservation();
      updateObservations?.();
      props.handleClose();
      toast.success('Observation deleted!', config);
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
      <DialogTitle>
        {`Delete observation between 
        ${props.observation?.astronomicalObject.name} and 
        ${props.observation?.observationLocation.name}?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Any reports created based on this observation will remain on your
          account.
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

export default DeleteObservationDialog;
