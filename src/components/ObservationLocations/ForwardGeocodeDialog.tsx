import {
  Autocomplete,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import useAxios from 'axios-hooks';
import { useFormik } from 'formik';
import React, { useCallback, useEffect } from 'react';
import * as yup from 'yup';
import APIEndpoints from '../../lib/Constants/Endpoints';
import { FwdGeocodeResult } from '../../lib/Models/Misc/FwdGeocodeResult';

interface IForwardGeocodeDialogProps {
  open: boolean;
  formik: any;
  handleClose: () => void;
}

const ForwardGeocodeDialog = ({ ...props }: IForwardGeocodeDialogProps) => {
  const [results, setResults] = React.useState<FwdGeocodeResult[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [selected, setSelected] = React.useState<FwdGeocodeResult | null>(null);

  const validationSchema = yup.object().shape({
    query: yup
      .string()
      .matches(/^[^;]+$/, 'Illegal character: ;')
      .required('A query is required'),
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      query: '',
    },
    onSubmit: (model: any) => {},
  });

  const [{ loading }, forwardGeocode] = useAxios<FwdGeocodeResult[]>(
    {
      url: APIEndpoints.Geo.Search,
      method: 'GET',
      params: {
        query: formik.values.query,
      },
    },
    { manual: true },
  );

  const handleSetLocation = (
    name: string,
    latitude: number,
    longitude: number,
  ) => {
    props.formik.setFieldValue('latitude', latitude);
    props.formik.setFieldValue('longitude', longitude);
    props.formik.setFieldValue('name', name);
    props.handleClose();
  };

  useEffect(() => {
    const debounced = setTimeout(async () => {
      if (inputValue.length !== 0 && !inputValue.includes(';')) {
        const { data } = await forwardGeocode();
        setResults(data);
      }
    }, 300);
    return () => clearTimeout(debounced);
  }, [inputValue, forwardGeocode]);

  return (
    <Dialog open={props.open} keepMounted onClose={props.handleClose}>
      <DialogTitle>Location search</DialogTitle>
      <DialogContent>
        <DialogContentText paragraph>
          Search for a location below. Once you select one from the dropdown,
          the latitude and longitude will be filled out automatically.
        </DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <Autocomplete
            value={selected}
            onChange={(_event: React.ChangeEvent<{}>, value: any) => {
              handleSetLocation(value.text, value.latitude, value.longitude);
            }}
            inputValue={inputValue}
            onInputChange={(_event, value) => {
              setInputValue(value);
            }}
            options={results}
            getOptionLabel={(res: FwdGeocodeResult) => res.placeName}
            noOptionsText='No results found'
            renderInput={(params) => (
              <TextField
                {...params}
                name='query'
                label='Query'
                value={formik.values.query}
                error={formik.errors.query !== undefined}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loading}
                helperText={
                  formik.errors.query !== undefined ? formik.errors.query : ' '
                }
              />
            )}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForwardGeocodeDialog;
