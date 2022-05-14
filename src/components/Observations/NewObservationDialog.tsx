import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AstroCueObjectContext } from '../../Context/AstroCueObjectContext';
import APIEndpoints from '../../lib/Constants/Endpoints';
import {
  InboundObservationModel,
  validationSchema,
} from '../../lib/Models/Inbound/InboundObservationModel';
import { OutboundAstronomicalObjectModel } from '../../lib/Models/Outbound/OutboundAstronomicalObjectModel';
import { config } from '../../lib/Toast/Config';
import AstronomicalObjectSearchResult from './AstronomicalObjectSearchResult';

interface INewDialogProps {
  /** Is the dialog open? */
  open: boolean;
  /** The handle close callback */
  handleClose: () => void;
}

const NewObservationDialog = ({ ...props }: INewDialogProps) => {
  const [submitLocked, setSubmitLocked] = useState(false);
  const { observationLocations, updateObservations } = useContext(
    AstroCueObjectContext,
  );

  // query filters
  const [popular, setPopular] = useState(false);
  const [objectType, setObjectType] = useState('Star');
  const [inputValue, setInputValue] = useState('');

  // query results
  const [results, setResults] = useState<OutboundAstronomicalObjectModel[]>([]);
  const [selectedResult, setSelectedResult] =
    useState<OutboundAstronomicalObjectModel | null>(null);

  const [{ loading }, newObservationPost] = useAxios<InboundObservationModel>(
    {
      url: APIEndpoints.Observation.New,
      method: 'POST',
    },
    { manual: true },
  );

  const [{ loading: objectSearchLoading }, objectSearch] = useAxios<
    OutboundAstronomicalObjectModel[]
  >(
    {
      url: APIEndpoints.Observation.ObjectSearch,
      method: 'GET',
    },
    { manual: true },
  );

  const formik = useFormik({
    initialValues: {
      locationId: observationLocations?.[0]?.id ?? 0,
      astronomicalObjectId: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (model: InboundObservationModel) => {
      setSubmitLocked(true);
      handleSubmitAsync(model);

      setTimeout(() => {
        setSubmitLocked(false);
      }, 1000);
    },
    validateOnMount: true,
  });

  const handleSubmitAsync = async (model: InboundObservationModel) => {
    try {
      await newObservationPost({
        data: model,
      });
      updateObservations?.();
      toast.success('Observation added!', config);
      props.handleClose();
    } catch (error: any) {
      toast.error(error.response.data.message, config);
    }
  };

  useEffect(() => {
    const debounced = setTimeout(async () => {
      if (inputValue !== '') {
        const { data } = await objectSearch({
          params: {
            query: inputValue,
            limit: 5,
            popular: popular,
            type: objectType,
            locationId: formik.values.locationId,
          },
        });
        setResults(data);
      }
    }, 250);
    return () => clearTimeout(debounced);
  }, [inputValue, popular, objectType, formik.values.locationId, objectSearch]);

  return (
    <Dialog open={props.open} keepMounted onClose={props.handleClose}>
      <DialogTitle>New observation</DialogTitle>
      <DialogContent>
        <DialogContentText paragraph>
          To create a new observation, select an observation location and an
          astronomical object
        </DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction='column' spacing={2}>
            <FormControl>
              <InputLabel id='locSelectLabel'>Observation location</InputLabel>
              <Select
                name='locationId'
                label='Observation location'
                labelId='locSelectLabel'
                value={formik.values.locationId}
                onChange={formik.handleChange}
              >
                {observationLocations?.map((location) => (
                  <MenuItem key={location.id} value={location.id}>
                    <Typography display='inline' variant='body1'>
                      {`${location.name} `}
                    </Typography>
                    <Typography
                      display='inline'
                      variant='body1'
                      color='text.disabled'
                    >
                      {` (${location.bortleDesc})`}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack direction='row' spacing={0}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Tooltip title='Only show objects with official/well known names (Polaris, Betelgeuse, Andromeda etc...)'>
                      <Checkbox value={popular} />
                    </Tooltip>
                  }
                  onChange={(
                    e: React.SyntheticEvent<Element, Event>,
                    checked: boolean,
                  ) => setPopular(checked)}
                  label='Popular'
                />
              </FormGroup>
              <FormControl>
                <RadioGroup
                  value={objectType}
                  row
                  onChange={(e) => setObjectType(e.target.value)}
                >
                  <FormControlLabel
                    value='Star'
                    control={
                      <Tooltip title='Search stars'>
                        <Radio />
                      </Tooltip>
                    }
                    label='Star'
                  />
                  <FormControlLabel
                    value='DeepSky'
                    control={
                      <Tooltip title='Search deep sky objects'>
                        <Radio />
                      </Tooltip>
                    }
                    label='Deep sky'
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
            <Autocomplete
              filterOptions={(x) => x}
              isOptionEqualToValue={(x, y) => x.id === y.id}
              value={selectedResult}
              onChange={(_event: React.ChangeEvent<{}>, value: any) => {
                setSelectedResult(value as OutboundAstronomicalObjectModel);
                formik.setFieldValue('astronomicalObjectId', value?.id ?? 0);
              }}
              inputValue={inputValue}
              onInputChange={(_event, value) => {
                setInputValue(value);
              }}
              options={results}
              getOptionLabel={(option: OutboundAstronomicalObjectModel) =>
                option.name ?? ''
              }
              loading={objectSearchLoading}
              renderOption={(
                props,
                option: OutboundAstronomicalObjectModel,
              ) => (
                <Box component='li' {...props}>
                  <AstronomicalObjectSearchResult option={option} />
                </Box>
              )}
              noOptionsText='No results'
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Astronomical object search'
                  disabled={objectSearchLoading}
                  variant='outlined'
                  error={formik.errors.astronomicalObjectId !== undefined}
                  helperText={
                    formik.errors.astronomicalObjectId !== undefined
                      ? formik.errors.astronomicalObjectId
                      : ' '
                  }
                />
              )}
            />
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
    </Dialog>
  );
};

export default NewObservationDialog;
