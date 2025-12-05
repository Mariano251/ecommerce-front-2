import { Box } from '@mui/material';
import AdminNavbar from './AdminNavbar';

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminNavbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      {/* Footer eliminado */}
    </Box>
  );
};

export default AdminLayout;