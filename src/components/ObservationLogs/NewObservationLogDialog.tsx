import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import APIEndpoints from '../../lib/Constants/Endpoints';
import {
  InboundObservationLogModel,
  initialValues,
  validationSchema,
} from '../../lib/Models/Inbound/InboundObservationLogModel';
import { OutboundReportModel } from '../../lib/Models/Outbound/OutboundReportModel';
import CreateIcon from '@mui/icons-material/Create';
import { LoadingButton } from '@mui/lab';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import { config } from '../../lib/Toast/Config';
import { AstroCueObjectContext } from '../../Context/AstroCueObjectContext';

interface INewDialogProps {
  /** Is the dialog open? */
  open: boolean;
  /** The report that the log is being taken against */
  targetReport: OutboundReportModel | null;
  /** The handle close callback */
  handleClose: () => void;
}

const NewObservationLogDialog = ({ ...props }: INewDialogProps) => {
  const [submitLocked, setSubmitLocked] = useState(false);
  const { updateObservationLogs } = useContext(AstroCueObjectContext);

  const [{ loading }, newObservationLogPost] =
    useAxios<InboundObservationLogModel>(
      {
        url: APIEndpoints.ObservationLog.New,
        method: 'POST',
      },
      { manual: true },
    );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (model: InboundObservationLogModel) => {
      setSubmitLocked(true);
      handleSubmitAsync(model);

      setTimeout(() => {
        setSubmitLocked(false);
      }, 1000);
    },
  });

  const handleSubmitAsync = async (model: InboundObservationLogModel) => {
    model.reportId = props.targetReport?.id ?? 0;
    try {
      await newObservationLogPost({
        data: model,
      });
      updateObservationLogs?.();
      props.handleClose();
      toast.success(
        `Your observation of ${props.targetReport?.astronomicalObjectName} has been logged!`,
        config,
      );
    } catch (error: any) {
      toast.error(error.response.data.message, config);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>
        Log this observation of {props.targetReport?.astronomicalObjectName}
      </DialogTitle>
      <DialogContent>
        <DialogContentText paragraph>
          To create a new log, fill out the details below. All of the other
          information will be copied from the report automatically.
        </DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction='column' spacing={1}>
            <TextField
              name='textualDescription'
              label={`Description ${
                formik.values.textualDescription.length > 0
                  ? `(${formik.values.textualDescription.length}/2000)`
                  : ''
              }`}
              fullWidth
              multiline
              variant='outlined'
              maxRows={5}
              value={formik.values.textualDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.textualDescription !== undefined}
              helperText={
                formik.errors.textualDescription !== undefined
                  ? formik.errors.textualDescription
                  : ' '
              }
            />
            <TextField
              name='observer'
              label={`Observer(s) ${
                formik.values.observer.length > 0
                  ? `(${formik.values.observer.length}/250)`
                  : ''
              }`}
              fullWidth
              multiline
              variant='outlined'
              maxRows={5}
              value={formik.values.observer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.observer !== undefined}
              helperText={
                formik.errors.observer !== undefined
                  ? formik.errors.observer
                  : ' '
              }
            />
            <FormControl>
              <InputLabel id='observation-type-label'>
                Observation Type
              </InputLabel>
              <Select
                labelId='observation-type-label'
                name='observationType'
                label='Observation Type'
                fullWidth
                variant='outlined'
                value={formik.values.observationType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value='NakedEye'>Naked eye</MenuItem>
                <MenuItem value='LongExposure'>
                  Long exposure photography
                </MenuItem>{' '}
                <MenuItem value='Telescope'>Telescope</MenuItem>{' '}
                <MenuItem value='Binoculars'>Binoculars</MenuItem>{' '}
                <MenuItem value='Other'>Other</MenuItem>
              </Select>
            </FormControl>
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
                startIcon={<CreateIcon />}
                type='submit'
                loading={loading || submitLocked}
                disabled={!formik.isValid}
              >
                Log observations
              </LoadingButton>
            </DialogActions>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewObservationLogDialog;
