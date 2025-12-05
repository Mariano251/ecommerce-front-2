import {
  Container,
  Typography,
  Box,
  Button,
  Paper
} from '@mui/material';
import {
  LocalShipping,
  Security,
  HeadsetMic,
  Smartphone,
  Computer,
  Tv,
  ShoppingBag
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/products/ProductCard';

const Home = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

  const features = [
    {
      icon: <LocalShipping sx={{ fontSize: 48, color: '#1976d2' }} />,
      title: 'Envío Gratis',
      description: 'En compras superiores a $30.000'
    },
    {
      icon: <Security sx={{ fontSize: 48, color: '#2e7d32' }} />,
      title: 'Compra Segura',
      description: 'Garantía de devolución de dinero'
    },
    {
      icon: <HeadsetMic sx={{ fontSize: 48, color: '#ed6c02' }} />,
      title: 'Soporte 24/7',
      description: 'Estamos para ayudarte'
    }
  ];

  const popularCategories = [
    { id: 1, name: 'Celulares', icon: <Smartphone sx={{ fontSize: 40 }} /> },
    { id: 2, name: 'Computadoras', icon: <Computer sx={{ fontSize: 40 }} /> },
    { id: 3, name: 'Televisores', icon: <Tv sx={{ fontSize: 40 }} /> }
  ];

  const featuredProducts = products.slice(0, 3);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: 'white',
          py: 12,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Bienvenido a Tech Store
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
              Los mejores productos electrónicos al mejor precio
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingBag />}
              onClick={() => navigate('/products')}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                backgroundColor: 'white',
                color: '#1976d2',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              Ver Productos
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Features - CENTRADAS */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
            {features.map((feature, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  width: 280,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                {feature.icon}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Categorías Populares - CENTRADAS */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Categorías Populares
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Explora nuestras categorías más vendidas
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            {popularCategories.map((category) => (
              <Paper
                key={category.id}
                elevation={2}
                sx={{
                  p: 4,
                  width: 200,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 4,
                    backgroundColor: '#f5f5f5'
                  }
                }}
                onClick={() => navigate('/products')}
              >
                <Box sx={{ color: '#1976d2', mb: 2 }}>
                  {category.icon}
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  {category.name}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Productos Destacados - 3 EN FILA CENTRADOS */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Productos Destacados
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Las mejores ofertas en electrónica
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            flexWrap: 'wrap',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {featuredProducts.map((product) => (
              <Box key={product.id_key} sx={{ width: 320 }}>
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/products')}
              sx={{ px: 4 }}
            >
              Ver Todos los Productos
            </Button>
          </Box>
        </Box>

        {/* Call to Action */}
        <Box sx={{ mb: 8 }}>
          <Paper
            elevation={3}
            sx={{
              p: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              ¿Listo para comprar?
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
              Explora nuestro catálogo completo de productos
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/products')}
              sx={{
                backgroundColor: 'white',
                color: '#667eea',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              Explorar Catálogo
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;