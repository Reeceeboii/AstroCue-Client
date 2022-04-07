import { Container, Grid, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import Link from 'next/link';
import RegisterForm from '../src/components/Forms/RegisterForm';
import useRedirectLoggedInUsers from '../src/lib/Hooks/useRedirectLoggedInUsers';

/** User registration page */
const Register: NextPage = () => {
  useRedirectLoggedInUsers();

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
            Register
          </Typography>
          <RegisterForm />
          <Typography variant='caption' align='center' color='warning.main'>
            Please note that in its current state, AstroCue does NOT validate
            your email address. Please ensure it is entered correctly before
            registering, else you will not be able to receive report emails.
          </Typography>
          <Typography variant='body1' align='center'>
            Already registered?
            <Link href='/login' passHref>
              <Typography
                sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                variant='body1'
                color='primary'
              >
                Login
              </Typography>
            </Link>
          </Typography>
        </Stack>
      </Container>
    </Grid>
  );
};

export default Register;
