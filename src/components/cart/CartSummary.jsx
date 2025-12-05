import { Box, Typography, Divider, Button, Paper } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

const CartSummary = () => {
  const { getCartTotal, getCartCount } = useCart();
  const navigate = useNavigate();

  const total = getCartTotal();
  const itemCount = getCartCount();

  return (
    <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Resumen del pedido
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body1">Productos ({itemCount})</Typography>
        <Typography variant="body1">{formatPrice(total)}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body1">Envío</Typography>
        <Typography variant="body1" color="success.main">
          Gratis
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">Total</Typography>
        <Typography variant="h6" fontWeight="bold" color="primary">
          {formatPrice(total)}
        </Typography>
      </Box>

      <Button
        variant="contained"
        fullWidth
        size="large"
        startIcon={<ShoppingCart />}
        onClick={() => navigate('/checkout')}
        disabled={itemCount === 0}
      >
        Finalizar compra
      </Button>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
        Envío gratis en compras mayores a $50,000
      </Typography>
    </Paper>
  );
};

export default CartSummary;