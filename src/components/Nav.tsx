import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Router from 'next/router';

export default function Nav() {
  
  const ReturnHome = () => {
    Router.push('/');
  }

  const RedirectToLoginPage = () => {
    Router.push('/login');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div style={{ "flexGrow": 1, "cursor": "pointer" }}>
            <Image
              src="/logo_light.png"
              alt="logo"
              width={240}
              height={42.5}
              onClick={() => ReturnHome()} />
          </div>
          <Button
            variant='outlined'
            color='inherit'
            onClick={() => RedirectToLoginPage()}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}