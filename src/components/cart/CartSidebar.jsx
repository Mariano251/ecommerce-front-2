import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Badge
} from '@mui/material';
import { Close, ShoppingCart } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { formatPrice } from '../../utils/formatters';

const CartSidebar = () => {
  const { isCartOpen, toggleCart, cartItems, getCartTotal, getCartCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    toggleCart();
    navigate('/cart');
  };

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={toggleCart}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
          maxWidth: '100%'
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            <Badge badgeContent={getCartCount()} color="primary">
              <ShoppingCart sx={{ mr: 1 }} />
            </Badge>
            Mi Carrito
          </Typography>
          <IconButton onClick={toggleCart}>
            <Close />
          </IconButton>
        </Box>

        <Divider />

        {/* Items */}
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <ShoppingCart sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Tu carrito está vacío
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => {
                  toggleCart();
                  navigate('/products');
                }}
              >
                Ver Productos
              </Button>
            </Box>
          ) : (
            cartItems.map((item) => (
              <CartItem key={item.id_key} item={item} />
            ))
          )}
        </Box>

        {/* Footer con total y botones */}
        {cartItems.length > 0 && (
          <>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {formatPrice(getCartTotal())}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleCheckout}
                sx={{ mb: 1 }}
              >
                Finalizar Compra
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={handleViewCart}
              >
                Ver Carrito Completo
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartSidebar;