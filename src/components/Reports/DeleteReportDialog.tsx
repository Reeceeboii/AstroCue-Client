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
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAstroCueObjectContext } from '../../Context/AstroCueObjectContext';
import APIEndpoints from '../../lib/Constants/Endpoints';
import { OutboundObservationModel } from '../../lib/Models/Outbound/OutboundObservationModel';
import { OutboundReportModel } from '../../lib/Models/Outbound/OutboundReportModel';
import { config } from '../../lib/Toast/Config';

interface IDeleteDialogProps {
  /** Is the dialog open? */
  open: boolean;
  /** The handle close callback */
  handleClose: () => void;
  /** The observation to delete */
  report: OutboundReportModel | null;
}

const DeleteReportDialog = ({ ...props }: IDeleteDialogProps) => {
  const { updateReports } = useAstroCueObjectContext();
  const [submitLocked, setSubmitLocked] = useState(false);

  const [{ loading }, deleteReport] = useAxios<OutboundReportModel>(
    {
      url: APIEndpoints.Report.Delete,
      method: 'DELETE',
      params: {
        id: props.report?.id,
      },
    },
    { manual: true },
  );

  const handleDeleteAsync = async () => {
    try {
      await deleteReport();
      updateReports?.();
      props.handleClose();
      toast.success('Report deleted!', config);
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
        {`Delete report on the observation of ${props.report?.astronomicalObjectName}?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Any logs taken against this report will remain on your account.
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

export default DeleteReportDialog;
