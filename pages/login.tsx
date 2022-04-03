import { Container, Grid, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../src/components/Layout";
import LoginForm from "../src/Forms/login/LoginForm";

/** Login page */
const Login: NextPage = () => {

  return (
    <Layout>
      <Grid container>        
        <Container maxWidth='xs'>
          <Stack spacing={2}>
            <Typography variant='h5' align='center'>
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