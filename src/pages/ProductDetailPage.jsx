import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  Paper,
  IconButton,
  Divider,
  TextField
} from '@mui/material';
import {
  ShoppingCart,
  ArrowBack,
  LocalShipping,
  Verified,
  AssignmentReturn,
  Add,
  Remove
} from '@mui/icons-material';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import Loading from '../components/common/Loading';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id_key === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Producto no encontrado
        </Typography>
        <Button variant="contained" onClick={() => navigate('/products')} sx={{ mt: 2 }}>
          Volver a Productos
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const getStockColor = () => {
    if (product.stock === 0) return 'error';
    if (product.stock < 10) return 'warning';
    return 'success';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Botón Volver */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/products')}
        sx={{ mb: 3 }}
      >
        Volver a Productos
      </Button>

      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 0 }}>
          {/* COLUMNA IZQUIERDA - IMAGEN */}
          <Box
            sx={{
              position: 'relative',
              height: { xs: '400px', md: '600px' },
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4
            }}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
            <Chip
              label={`Stock: ${product.stock}`}
              color={getStockColor()}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}
            />
          </Box>

          {/* COLUMNA DERECHA - INFORMACIÓN */}
          <Box sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
            {/* Nombre */}
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {product.name}
            </Typography>

            {/* Precio */}
            <Typography variant="h3" color="primary" fontWeight="bold" sx={{ mb: 3 }}>
              {formatPrice(product.price)}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Descripción */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Descripción
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {product.description}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Selector de Cantidad */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Cantidad
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '2px solid #e0e0e0',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  <IconButton
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    sx={{ borderRadius: 0 }}
                  >
                    <Remove />
                  </IconButton>
                  <TextField
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      if (val >= 1 && val <= product.stock) {
                        setQuantity(val);
                      }
                    }}
                    inputProps={{
                      style: { textAlign: 'center', width: '60px' },
                      min: 1,
                      max: product.stock
                    }}
                    sx={{
                      '& fieldset': { border: 'none' },
                      '& input': { fontWeight: 'bold', fontSize: '1.1rem' }
                    }}
                  />
                  <IconButton
                    onClick={handleIncrement}
                    disabled={quantity >= product.stock}
                    sx={{ borderRadius: 0 }}
                  >
                    <Add />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {product.stock} disponibles
                </Typography>
              </Box>
            </Box>

            {/* Botón Agregar al Carrito */}
            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                mb: 3
              }}
            >
              {product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
            </Button>

            <Divider sx={{ mb: 3 }} />

            {/* Información Adicional */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocalShipping color="primary" />
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    Envío gratis en compras mayores a $30.000
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Recíbelo en 3-5 días hábiles
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Verified color="success" />
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    Garantía oficial del fabricante
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    12 meses de garantía
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AssignmentReturn color="info" />
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    Devolución gratis dentro de los 30 días
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Sin preguntas, sin complicaciones
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetailPage;