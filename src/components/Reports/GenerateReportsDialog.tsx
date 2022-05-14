import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CancelIcon from '@mui/icons-material/Cancel';
import useAxios from 'axios-hooks';
import APIEndpoints from '../../lib/Constants/Endpoints';
import AddchartIcon from '@mui/icons-material/Addchart';
import { config } from '../../lib/Toast/Config';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AstroCueObjectContext } from '../../Context/AstroCueObjectContext';
import { AstroCueUserContext } from '../../Context/AstroCueUserContext';

interface IGenerateReportsDialogProps {
  /** Is the dialog open? */
  open: boolean;
  /** The handle close callback */
  handleClose: () => void;
}

const GenerateReportsDialog = ({ ...props }: IGenerateReportsDialogProps) => {
  const { astroCueUser } = useContext(AstroCueUserContext);
  const { updateReports } = useContext(AstroCueObjectContext);

  const [{ loading }, generateReports] = useAxios<any>(
    {
      url: APIEndpoints.Report.Force,
      method: 'POST',
    },
    { manual: true },
  );

  const handleGenerate = async () => {
    try {
      await generateReports();
      updateReports?.();
      props.handleClose();
      toast.success('Reports generated and email sent', config);
    } catch (error: any) {
      toast.error(error.response.data.message, config);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Generate new reports</DialogTitle>
      <DialogContent>
        <DialogContentText paragraph>
          This will generate new reports for all of the observations you have
          set up.
        </DialogContentText>
        <DialogContentText>
          They will appear here, as well as in an AstroCue report email sent to{' '}
        </DialogContentText>
        <DialogContentText sx={{ fontWeight: 'bold' }}>
          {astroCueUser?.emailAddress}
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
          startIcon={<AddchartIcon />}
          onClick={() => handleGenerate()}
          loading={loading}
        >
          Generate
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default GenerateReportsDialog;
