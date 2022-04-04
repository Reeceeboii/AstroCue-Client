import 'react-toastify/dist/ReactToastify.css';
import { Paper } from '@mui/material';
import StandardHead from './StandardHeader';
import Nav from './Nav';
import { ToastContainer } from 'react-toastify';

const Layout = ({ children }: any) => {
  return (
    <div>
      <StandardHead />
      <Nav />
      <Paper style={{ minHeight: '100vh' }} elevation={1} square>
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
    </div>
  );
};

export default Layout;
