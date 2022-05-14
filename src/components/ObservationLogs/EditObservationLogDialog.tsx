import { LoadingButton } from '@mui/lab';
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
import APIEndpoints from '../../lib/Constants/Endpoints';
import {
  InboundObservationLogEditModel,
  initialValues,
  validationSchema,
} from '../../lib/Models/Inbound/InboundObservationLogEditModel';
import { OutboundObservationLogModel } from '../../lib/Models/Outbound/OutboundObservationLogModel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { config } from '../../lib/Toast/Config';
import { AstroCueObjectContext } from '../../Context/AstroCueObjectContext';

interface IEditObservationLogDialogProps {
  /** Is the dialog open */
  open: boolean;
  /** The observation log */
  observationLog: OutboundObservationLogModel | null;
  /** The handle close callback */
  handleClose: () => void;
}

const EditObservationLogDialog = ({
  ...props
}: IEditObservationLogDialogProps) => {
  const { updateObservationLogs } = useContext(AstroCueObjectContext);
  const [submitLocked, setSubmitLocked] = useState(false);

  const [{ loading }, editObservationLogPost] =
    useAxios<InboundObservationLogEditModel>(
      {
        url: APIEndpoints.ObservationLog.Edit,
        method: 'PATCH',
      },
      { manual: true },
    );

  const formik = useFormik({
    initialValues: {
      id: props.observationLog?.id ?? initialValues.id,
      textualDescription:
        props.observationLog?.textualDescription ??
        initialValues.textualDescription,
      observer: props.observationLog?.observer ?? initialValues.observer,
      observationType: initialValues.observationType,
    },
    validationSchema: validationSchema,
    onSubmit: (model: InboundObservationLogEditModel) => {
      setSubmitLocked(true);
      handleSubmitAsync(model);

      setTimeout(() => {
        setSubmitLocked(false);
      }, 500);
    },
    enableReinitialize: true,
  });

  const handleSubmitAsync = async (model: InboundObservationLogEditModel) => {
    try {
      await editObservationLogPost({
        data: model,
      });
      props.handleClose();
      updateObservationLogs?.();
      toast.success('Observation log updated!', config);
    } catch (error: any) {
      toast.error(error.response.data.message, config);
    }
  };

  return (
    <Dialog open={props.open} keepMounted onClose={props.handleClose}>
      <DialogTitle>
        Edit observation log of{' '}
        {props.observationLog?.observedAstronomicalObjectName}
      </DialogTitle>
      <DialogContent>
        <DialogContentText paragraph>
          Edit any of the following details and then click save to update your
          observation log
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
          </Stack>
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
              startIcon={<CheckCircleIcon />}
              type='submit'
              loading={loading || submitLocked}
              disabled={!formik.isValid}
            >
              Confirm edits
            </LoadingButton>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditObservationLogDialog;
