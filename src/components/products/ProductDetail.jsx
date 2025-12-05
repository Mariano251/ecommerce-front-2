import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Paper,
  TextField,
  Divider
} from '@mui/material';
import { ShoppingCart, ArrowBack } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

const ProductDetail = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Producto no encontrado</Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Volver
      </Button>

      <Paper elevation={2} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Imagen */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover',
                borderRadius: 2
              }}
            />
          </Grid>

          {/* Información */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              {product.name}
            </Typography>

            <Chip
              label={`Stock: ${product.stock}`}
              color={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'}
              sx={{ mb: 2 }}
            />

            <Divider sx={{ my: 2 }} />

            <Typography variant="h3" color="primary" gutterBottom fontWeight="bold">
              {formatPrice(product.price)}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Descripción
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {product.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Selector de cantidad y botón */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
              <TextField
                type="number"
                label="Cantidad"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1, max: product.stock }}
                sx={{ width: '120px' }}
                disabled={product.stock === 0}
              />

              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                sx={{ flexGrow: 1 }}
              >
                {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
              </Button>
            </Box>

            {/* Información adicional */}
            <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
              <Typography variant="body2" color="text.secondary">
                ✓ Envío gratis en compras mayores a $50,000
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ✓ Garantía oficial del fabricante
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ✓ Devolución gratis dentro de los 30 días
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetail;