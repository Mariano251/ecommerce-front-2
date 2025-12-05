import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import {
  Dashboard,
  Inventory,
  LocalShipping,
  ExitToApp,
  Logout
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#2e7d32' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/admin"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 'bold'
          }}
        >
          <Dashboard /> Panel de Administración
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            color="inherit"
            component={Link}
            to="/admin"
            startIcon={<Dashboard />}
            sx={{
              fontWeight: 500,
              backgroundColor: isActive('/admin') ? 'rgba(255,255,255,0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)'
              }
            }}
          >
            Dashboard
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/admin/products"
            startIcon={<Inventory />}
            sx={{
              fontWeight: 500,
              backgroundColor: isActive('/admin/products') ? 'rgba(255,255,255,0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)'
              }
            }}
          >
            Productos
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/admin/orders"
            startIcon={<LocalShipping />}
            sx={{
              fontWeight: 500,
              backgroundColor: isActive('/admin/orders') ? 'rgba(255,255,255,0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)'
              }
            }}
          >
            Pedidos
          </Button>

          <Button
            color="inherit"
            onClick={logout}
            startIcon={<Logout />}
            sx={{
              fontWeight: 500,
              borderLeft: '1px solid rgba(255,255,255,0.3)',
              paddingLeft: 2,
              marginLeft: 1,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)'
              }
            }}
          >
            Cerrar Sesión
          </Button>

          <Button
            color="inherit"
            onClick={() => navigate('/')}
            startIcon={<ExitToApp />}
            sx={{
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)'
              }
            }}
          >
            Salir al Sitio
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
