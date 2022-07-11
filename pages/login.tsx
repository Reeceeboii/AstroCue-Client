import { Container, Grid, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import LoginForm from '../src/components/Forms/LoginForm';
import useRedirectLoggedInUsers from '../src/lib/Hooks/useRedirectLoggedInUsers';
import { config } from '../src/lib/Toast/Config';

/** Login page */
const Login: NextPage = () => {
  useRedirectLoggedInUsers();

  const router = useRouter();

  useEffect(() => {
    const { regRedirect, name } = router.query;

    if (regRedirect !== undefined) {
      toast.info(`Thanks for signing up, ${name}! You can now log in.`, config);
    }
  });

  return (
    <Grid
      container
      alignItems='center'
      justifyContent='center'
      sx={{ paddingTop: 15 }}
    >
      <Container maxWidth='xs'>
        <Stack spacing={2}>
          <Typography variant='h4' align='center'>
            Login
          </Typography>
          <LoginForm />
          <Typography variant='caption' align='center' color='error.main'>
            As it was a university project, AstroCue is no longer active or
            maintained. All previously existing accounts have since been
            deleted.
          </Typography>
          <Typography variant='caption' align='center' color='error.main'>
            Please see <MuiLink href='#'>this GitHub repo</MuiLink> page for
            more information. Thank you.
          </Typography>
          <Typography variant='body1' align='center'>
            No account?
            <Link href='/register' passHref>
              <Typography
                sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                variant='body1'
                color='primary'
              >
                Register
              </Typography>
            </Link>
          </Typography>
        </Stack>
      </Container>
    </Grid>
  );
};

export default Login;
