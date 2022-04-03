import * as React from 'react';
import { Stack, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { OutboundAuthModel, initialValues, validationSchema } from './OutboundAuthModel';
import { LoadingButton } from '@mui/lab';
import { axiosInstance } from '../../lib/axios';
import { useRouter } from 'next/router';
import { config } from '../../lib/toast/Config';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = (model: OutboundAuthModel) => {
    setLoading(true);

    axiosInstance.post('/auth/login', model)
      .then((res) => {
        // TODO - save token to local storage and set context
        router.push('/');
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
      {({ values: model,  handleChange, handleBlur, errors }) => (
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
              helperText={errors.emailAddress !== undefined && errors.emailAddress} />
            <TextField
              name="password"
              label='Password'
              type='password'
              value={model.password}
              onChange={handleChange}
              onBlur={handleBlur}
              variant='outlined'
              error={errors.password !== undefined}
              helperText={errors.password !== undefined && errors.password}/>
            <LoadingButton
              variant='contained'
              type='submit'
              loading={loading}>
              Login
            </LoadingButton>
          </Stack> 
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm;