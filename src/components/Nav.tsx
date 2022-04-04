import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useAstroCueContext } from '../context/AstroCueUser/AstroCueUserContext';
import { SignOut } from '../lib/auth/SignOut';

/** Nav bar */
const Nav = () => {
  const { astroCueUser } = useAstroCueContext();

  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <div style={{ flexGrow: 1, cursor: 'pointer' }}>
            <Image
              src='/logo_light.png'
              alt='logo'
              width={240}
              height={42.5}
              onClick={() => router.push('/')}
            />
          </div>
          {astroCueUser ? (
            <IconButton
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
            >
              <Avatar>
                {`${astroCueUser.firstName.charAt(
                  0,
                )}${astroCueUser.lastName.charAt(0)}`}
              </Avatar>
            </IconButton>
          ) : (
            <Button
              variant='outlined'
              color='inherit'
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
          )}
          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => SignOut()}>
              <ListItemIcon>
                <LogoutIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
