import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import CartSidebar from '../cart/CartSidebar';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
      <CartSidebar />
    </Box>
  );
};

export default Layout;