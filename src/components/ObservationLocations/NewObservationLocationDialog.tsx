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
import React, { useEffect } from 'react';
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

interface INewDialogProps {
  open: boolean;
  handleClose: () => void;
}

const NewObservationLocationDialog = ({ ...props }: INewDialogProps) => {
  const [submitLocked, setSubmitLocked] = React.useState(false);
  const { updateObservationLocations } = useAstroCueObjectContext();

  const [{ loading }, newLocationPost] = useAxios<InboundObsLocationModel>(
    {
      url: APIEndpoints.ObservationLocation.New,
      method: 'POST',
    },
    { manual: true },
  );

  const [forwardGeocodeDialogOpen, setForwardGeocodeDialogOpen] =
    React.useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (model: InboundObsLocationModel) => {
      setSubmitLocked(true);
      handleSubmitAsync(model);

      setTimeout(() => {
        setSubmitLocked(false);
      }, 1000);
    },
  });

  const handleSubmitAsync = async (model: InboundObsLocationModel) => {
    try {
      const { data } = await newLocationPost({
        data: model,
      });
      updateObservationLocations?.();
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
      <DialogTitle>New observation location</DialogTitle>
      <DialogContent>
        <DialogContentText paragraph>
          To create a new observation location, please fill out the following
          details.
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
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
              Confirm
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

export default NewObservationLocationDialog;
