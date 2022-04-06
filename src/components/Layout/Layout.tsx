import 'react-toastify/dist/ReactToastify.css';
import { Box, Paper } from '@mui/material';
import StandardHead from './StandardHeader';
import Nav from '../Navigation/NavBar';
import { ToastContainer } from 'react-toastify';

const Layout = ({ children }: any) => {
  return (
    <Box sx={{ minWidth: '100vw', minHeight: '100vh', background: '#1e1e1e' }}>
      <StandardHead />
      <Nav />
      <Paper elevation={1} square>
        {children}
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
      </Paper>
    </Box>
  );
};

export default Layout;
