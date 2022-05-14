import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import useAxios from 'axios-hooks';
import APIEndpoints from '../../lib/Constants/Endpoints';
import { OutboundObservationLogModel } from '../../lib/Models/Outbound/OutboundObservationLogModel';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { toast } from 'react-toastify';
import { config } from '../../lib/Toast/Config';
import { useContext, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { AstroCueObjectContext } from '../../Context/AstroCueObjectContext';

interface IDeleteObservationLogDialogProps {
  /** Is the dialog open */
  open: boolean;
  /** The observation log */
  observationLog: OutboundObservationLogModel | null;
  /** The handle close callback */
  handleClose: () => void;
}

const DeleteObservationLogDialog = ({
  ...props
}: IDeleteObservationLogDialogProps) => {
  const { updateObservationLogs } = useContext(AstroCueObjectContext);
  const [submitLocked, setSubmitLocked] = useState(false);

  const [{ loading }, deleteObservationLog] =
    useAxios<OutboundObservationLogModel>(
      {
        url: APIEndpoints.ObservationLog.Delete,
        method: 'DELETE',
        params: {
          id: props.observationLog?.id ?? 0,
        },
      },
      {
        manual: true,
      },
    );

  const handleDeleteAsync = async () => {
    try {
      await deleteObservationLog();
      updateObservationLogs?.();
      props.handleClose();
      toast.success('Log deleted!', config);
    } catch (error: any) {
      toast.error(error.response.data.message, config);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Delete log</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this observation log?
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

export default DeleteObservationLogDialog;
