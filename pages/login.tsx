import { Container, Grid, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Layout from '../src/components/Layout';
import LoginForm from '../src/Forms/login/LoginForm';
import { config } from '../src/lib/toast/Config';

/** Login page */
const Login: NextPage = () => {
  const router = useRouter();
  
  useEffect(() => { 
    const { regRedirect, name } = router.query;
    
    if (regRedirect !== undefined) { 
      toast.info(`Thanks for signing up, ${name}! You can now log in.`, config);
    }
  })

  return (
    <Layout>
      <Grid
        container
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '50vh' }}>      
        <Container maxWidth='xs'>
          <Stack spacing={2}>
            <Typography variant='h4' align='center'>
              Login
            </Typography>
            <LoginForm />
            <Typography variant='body1' align='center'>
              No account?
              <Link href='/register' passHref>
                <Typography
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  variant='body1'
                  color='primary'>
                  Register
                </Typography>
              </Link>
            </Typography>
          </Stack>
        </Container>
      </Grid>
    </Layout>
  );
}

export default Login;