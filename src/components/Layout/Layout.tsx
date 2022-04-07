import 'react-toastify/dist/ReactToastify.css';
import { Paper } from '@mui/material';
import StandardHead from './StandardHeader';
import Nav from '../Navigation/NavBar';
import { ToastContainer } from 'react-toastify';

const Layout = ({ children }: any) => {
  return (
    <Paper square elevation={1} sx={{ minHeight: '100vh' }}>
      <StandardHead />
      <Nav />
      {children}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme='dark'
      />
    </Paper>
  );
};

export default Layout;
