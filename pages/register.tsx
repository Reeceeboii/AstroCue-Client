import { Container, Grid, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import Layout from "../src/components/Layout";
import RegisterForm from "../src/Forms/register/RegisterForm";

/** User registration page */
const Register: NextPage = () => {
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
              Register
            </Typography>
            <RegisterForm />
            <Typography variant='body1' align='center'>
              Already registered?
              <Link href='/login' passHref>
                <Typography
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  variant='body1'
                  color='primary'>
                  Login
                </Typography>
              </Link>
            </Typography>
          </Stack>
        </Container>
      </Grid>
    </Layout>
  )
}

export default Register;