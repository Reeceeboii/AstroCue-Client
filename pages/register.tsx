import { Container, Grid, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import Layout from "../src/components/Layout";
import RegisterForm from "../src/Forms/register/RegisterForm";

/** User registration page */
const Register: NextPage = () => {
  return (
    <Layout>
      <Grid container>        
        <Container maxWidth='xs'>
          <Stack spacing={2}>
            <Typography variant='h5' align='center'>
              Register
            </Typography>
            <RegisterForm />
          </Stack>
        </Container>
      </Grid>
    </Layout>
  )
}

export default Register;