import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import React from 'react';
import APIEndpoints from '../../lib/Constants/Endpoints';
import {
  InboundObsLocationModel,
  initialValues,
  validationSchema,
} from '../../lib/Models/Inbound/InboundObsLocationModel';
import ForwardGeocodeDialog from './ForwardGeocodeDialog';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAstroCueObjectContext } from '../../Context/AstroCueObjectContext';
import { toast } from 'react-toastify';
import { config } from '../../lib/Toast/Config';

interface IEditDialogProps {
  open: boolean;
  location: InboundObsLocationModel | null;
  targetedId: number;
  handleClose: () => void;
}

const EditObservationLocationDialog = ({ ...props }: IEditDialogProps) => {
  const [submitLocked, setSubmitLocked] = React.useState(false);
  const { updateObservationLocations, updateObservations } =
    useAstroCueObjectContext();

  const [{ loading }, editLocationPost] = useAxios<InboundObsLocationModel>(
    {
      url: APIEndpoints.ObservationLocation.Edit,
      method: 'PATCH',
    },
    { manual: true },
  );

  const [forwardGeocodeDialogOpen, setForwardGeocodeDialogOpen] =
    React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: props.location?.name ?? '',
      latitude: props.location?.latitude ?? initialValues.latitude,
      longitude: props.location?.longitude ?? initialValues.longitude,
    },
    validationSchema: validationSchema,
    onSubmit: (model: InboundObsLocationModel) => {
      setSubmitLocked(true);
      handleSubmitAsync(model);

      setTimeout(() => {
        setSubmitLocked(false);
      }, 1000);
    },
    enableReinitialize: true,
  });

  const handleSubmitAsync = async (model: InboundObsLocationModel) => {
    try {
      await editLocationPost({
        data: model,
        params: {
          id: props.targetedId,
        },
      });
      updateObservationLocations?.();
      updateObservations?.();
      props.handleClose();
    } catch (error: any) {
      toast.error(error.response.data.message, config);
    }
  };

  const handleForwardGeocodeDialogClose = () => {
    setForwardGeocodeDialogOpen(false);
  };

  return (
    <Dialog open={props.open} keepMounted onClose={props.handleClose}>
      <DialogTitle>Editing &apos;{props.location?.name}&apos;</DialogTitle>
      <DialogContent>
        <DialogContentText paragraph>
          Accompanying data will be updated automatically
        </DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction='column' spacing={2}>
            <TextField
              name='name'
              label={`Location name (${formik.values.name.length}/50)`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Tooltip title='Search for a location'>
                      <IconButton
                        onClick={() => {
                          setForwardGeocodeDialogOpen(true);
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant='outlined'
              error={formik.errors.name !== undefined}
              helperText={
                formik.errors.name !== undefined ? formik.errors.name : ' '
              }
              fullWidth
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <TextField
                name='latitude'
                label='Latitude'
                type='number'
                value={formik.values.latitude}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant='outlined'
                error={formik.errors.latitude !== undefined}
                helperText={
                  formik.errors.latitude !== undefined
                    ? formik.errors.latitude
                    : ' '
                }
                fullWidth
              />
              <TextField
                name='longitude'
                label='Longitude'
                type='number'
                value={formik.values.longitude}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant='outlined'
                error={formik.errors.longitude !== undefined}
                helperText={
                  formik.errors.longitude !== undefined
                    ? formik.errors.longitude
                    : ' '
                }
                fullWidth
              />
            </Stack>
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
      <ForwardGeocodeDialog
        open={forwardGeocodeDialogOpen}
        formik={formik}
        handleClose={handleForwardGeocodeDialogClose}
      />
    </Dialog>
  );
};

export default EditObservationLocationDialog;
