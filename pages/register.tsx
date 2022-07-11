import { Container, Grid, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';
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
          <Typography variant='caption' align='center' color='error.main'>
            As it was a university project, AstroCue is no longer active or
            maintained. No new registrations will be accepted.
          </Typography>
          <Typography variant='caption' align='center' color='error.main'>
            Please see{' '}
            <MuiLink
              href='https://github.com/Reeceeboii/AstroCue-Server'
              target='blank'
              rel='noreferrer'
            >
              this GitHub repo
            </MuiLink>{' '}
            for more information. Thank you.
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
