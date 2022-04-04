import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as React from 'react';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../lib/Axios';
import APIEndpoints from '../../lib/Constants/Endpoints';
import {
  initialValues,
  OutboundRegModel,
  validationSchema,
} from '../../lib/Models/OutboundRegModel';
import { config } from '../../lib/Toast/Config';

/** New user registration form */
const RegisterForm = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (model: OutboundRegModel) => {
      handleSubmitAsync(model);
    },
  });

  /**
   * Handles submission of the registration form
   * @param model Instance of {@link OutboundRegModel} posted to server
   * @param model
   */
  const handleSubmitAsync = async (model: OutboundRegModel) => {
    setLoading(true);

    try {
      await axiosInstance.post(APIEndpoints.Auth.Register, model);
      router.push({
        pathname: '/login',
        query: {
          regRedirect: true,
          /*
           * If they entered name with the first letter as lowercase,
           * we can uppercase it here for display purposes. The server
           * will do this itself before storing in DB
           */
          name:
            model.firstName.charAt(0).toUpperCase() + model.firstName.slice(1),
        },
      });
    } catch (err: any) {
      toast.error(err.response.data.message, config);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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
          name='firstName'
          label='First name'
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant='outlined'
          error={formik.errors.firstName !== undefined}
          helperText={
            formik.errors.firstName !== undefined
              ? formik.errors.firstName
              : ' '
          }
        />
        <TextField
          name='lastName'
          label='Last name'
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant='outlined'
          error={formik.errors.lastName !== undefined}
          helperText={
            formik.errors.lastName !== undefined ? formik.errors.lastName : ' '
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
          loading={loading}
          disabled={!formik.isValid}
        >
          Register
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default RegisterForm;
