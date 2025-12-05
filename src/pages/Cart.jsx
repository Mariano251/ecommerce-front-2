import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Paper
} from '@mui/material';
import { ShoppingCart, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingCart sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Tu carrito está vacío
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Agrega productos para comenzar a comprar
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          Ver Productos
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Continuar comprando
      </Button>

      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Carrito de Compras
      </Typography>

      <Grid container spacing={3}>
        {/* Items del carrito */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight="bold">
                Productos ({cartItems.length})
              </Typography>
              <Button color="error" onClick={clearCart}>
                Vaciar carrito
              </Button>
            </Box>

            {cartItems.map((item) => (
              <CartItem key={item.id_key} item={item} />
            ))}
          </Paper>
        </Grid>

        {/* Resumen */}
        <Grid item xs={12} md={4}>
          <CartSummary />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;