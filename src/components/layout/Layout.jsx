import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import CartSidebar from '../cart/CartSidebar';
import './navbar.scss'
import ResponsiveNavbar from './ResponsiveNavbar';
import "bootstrap/dist/css/bootstrap.min.css";


const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ResponsiveNavbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
      <CartSidebar />
    </Box>
  );
};

export default Layout;