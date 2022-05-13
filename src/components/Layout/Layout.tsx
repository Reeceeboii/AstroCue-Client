import 'react-toastify/dist/ReactToastify.css';
import { Paper } from '@mui/material';
import StandardHead from './StandardHeader';
import Nav from '../Navigation/NavBar';
import { ToastContainer } from 'react-toastify';

const Layout = ({ children }: any) => {
  return (
    <Paper square elevation={0}>
      <StandardHead />
      <Nav />
      {children}
      <ToastContainer
        position='top-right'
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        toastStyle={{
          top: '60px',
          backgroundColor: '#272727',
          color: '#fff',
        }}
      />
    </Paper>
  );
};

export default Layout;
