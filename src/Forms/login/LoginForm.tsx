import * as React from 'react';
import { Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { OutboundAuthModel, initialValues, validationSchema } from './OutboundAuthModel';
import { LoadingButton } from '@mui/lab';
import { axiosInstance } from '../../lib/axios';
import { useRouter } from 'next/router';
import { config } from '../../lib/toast/Config';
import { toast } from 'react-toastify';

/** Login form */
const LoginForm = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (model) => {
      handleSubmitAsync(model);
    },
  });

  /**
   * Handles submission of the login form
   * @param model Instance of {@link OutboundAuthModel} posted to server
   */
  const handleSubmitAsync = async (model: OutboundAuthModel) => {
    setLoading(true);

    try {
      await axiosInstance.post('/auth/login', model);
      router.push('/');
    } catch (err: any) {
      toast.error(err.response.data.message, config);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={.5}>
        <TextField
          name='emailAddress'
          label='Email address'
          value={formik.values.emailAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant='outlined'
          error={formik.errors.emailAddress !== undefined}
          helperText={formik.errors.emailAddress !== undefined ? formik.errors.emailAddress : ' '} />
        <TextField
          name="password"
          label='Password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant='outlined'
          error={formik.errors.password !== undefined}
          helperText={
            formik.errors.password !== undefined ? formik.errors.password : ' '} />
        <LoadingButton
          variant='contained'
          type='submit'
          loading={loading}
          disabled={!formik.isValid}>
          Login
        </LoadingButton>
      </Stack> 
    </form>
  )
}

export default LoginForm;