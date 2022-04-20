import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as React from 'react';
import { toast } from 'react-toastify';
import { SignIn } from '../../lib/Auth/SignIn';
import { config } from '../../lib/Toast/Config';
import {
  initialValues,
  InboundAuthModel,
  validationSchema,
} from '../../lib/Models/Inbound/InboundAuthModel';
import APIEndpoints from '../../lib/Constants/Endpoints';
import useAxios from 'axios-hooks';
import OutboundAuthSuccessModel from '../../lib/Models/Outbound/OutboundAuthSuccessModel';

/** Login form */
const LoginForm = () => {
  const router = useRouter();
  const [submitLocked, setSubmitLocked] = React.useState(false);

  const [{ loading }, loginPost] = useAxios<OutboundAuthSuccessModel>(
    {
      url: APIEndpoints.Auth.Login,
      method: 'POST',
    },
    { manual: true },
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (model: InboundAuthModel) => {
      setSubmitLocked(true);
      handleSubmitAsync(model);

      /** This short timeout on the button lock prevents form spamming */
      setTimeout(() => {
        setSubmitLocked(false);
      }, 1000);
    },
  });

  /**
   * Handles submission of the login form
   * @param model Instance of {@link OutboundAuthModel} posted to server
   */
  const handleSubmitAsync = async (model: InboundAuthModel) => {
    try {
      const { data } = await loginPost({
        data: model,
      });

      SignIn(data);
      router.push('/');
      return;
    } catch (error: any) {
      toast.error(error.response.data.message, config);
      return;
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={0.5}>
        <TextField
          name='emailAddress'
          label='Email address'
          value={formik.values.emailAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant='outlined'
          error={formik.errors.emailAddress !== undefined}
          helperText={
            formik.errors.emailAddress !== undefined
              ? formik.errors.emailAddress
              : ' '
          }
        />
        <TextField
          name='password'
          label='Password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant='outlined'
          error={formik.errors.password !== undefined}
          helperText={
            formik.errors.password !== undefined ? formik.errors.password : ' '
          }
        />
        <LoadingButton
          variant='contained'
          type='submit'
          loading={loading || submitLocked}
          disabled={!formik.isValid || loading}
        >
          Login
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default LoginForm;
