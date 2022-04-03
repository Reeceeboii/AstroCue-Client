import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as React from 'react';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../lib/axios';
import { config } from '../../lib/toast/Config';
import { initialValues, OutboundRegModel, validationSchema } from './OutboundRegModel';

const RegisterForm = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = (model: OutboundRegModel) => {
    setLoading(true);

    axiosInstance.post('/auth/register', model)
      .then((res) => {
        router.push('/login');
      })
      .catch((err) => {
        toast.error(err.response.data.message, config);
        setLoading(false);
      });
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(model) => {
        handleSubmit(model);
      }}
      validationSchema={validationSchema}
    >
      {({ values: model, handleChange, handleBlur, errors }) => (
        <Form>
          <Stack spacing={2}>
            <TextField
              name='emailAddress'
              label='Email address'
              value={model.emailAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              variant='outlined'
              error={errors.emailAddress !== undefined}
              helperText={errors.emailAddress !== undefined && errors.emailAddress}
            />
            <TextField
              name='firstName'
              label='First name'
              value={model.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              variant='outlined'
              error={errors.firstName !== undefined}
              helperText={errors.firstName !== undefined && errors.firstName}
            />
            <TextField
              name='lastName'
              label='Last name'
              value={model.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              variant='outlined'
              error={errors.lastName !== undefined}
              helperText={errors.lastName !== undefined && errors.lastName}
            />
            <TextField
              name='password'
              label='Password'
              type='password'
              value={model.password}
              onChange={handleChange}
              onBlur={handleBlur}
              variant='outlined'
              error={errors.password !== undefined}
              helperText={errors.password !== undefined && errors.password}
            />
            <LoadingButton
              variant='contained'
              type='submit'
              loading={loading}>
              Register with AstroCue!
            </LoadingButton>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm;