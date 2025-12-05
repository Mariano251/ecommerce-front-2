import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Box } from '@mui/material';
import { ShoppingCart, Home, Category, Receipt } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { getCartCount, toggleCart } = useCart();

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
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
          <Home /> Tech Store
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            color="inherit"
            component={Link}
            to="/products"
            startIcon={<Category />}
            sx={{ fontWeight: 500 }}
          >
            Productos
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/my-orders"
            startIcon={<Receipt />}
            sx={{ fontWeight: 500 }}
          >
            Mis Pedidos
          </Button>

          <IconButton color="inherit" onClick={toggleCart} size="large">
            <Badge badgeContent={getCartCount()} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;