import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Chip,
  Divider
} from '@mui/material';
import { 
  ArrowBack, 
  Edit
} from '@mui/icons-material';
import { useProducts } from '../../context/ProductContext';
import { formatPrice } from '../../utils/formatters';

const AdminProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, categories } = useProducts();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id_key === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  const getStockStatus = () => {
    if (!product) return { color: 'default', label: 'N/A' };
    if (product.stock === 0) return { color: 'error', label: 'Agotado' };
    if (product.stock < 15) return { color: 'warning', label: 'Stock Bajo' };
    return { color: 'success', label: 'Disponible' };
  };

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Producto no encontrado</Typography>
        <Button variant="contained" onClick={() => navigate('/admin/products')} sx={{ mt: 2 }}>
          Volver a Productos
        </Button>
      </Container>
    );
  }

  const stockStatus = getStockStatus();
  const categoryName = categories.find(c => c.id_key === product.category_id)?.name || 'N/A';

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button 
            startIcon={<ArrowBack />} 
            onClick={() => navigate('/admin/products')}
            sx={{ mb: 2, color: 'text.secondary' }}
          >
            Volver a Productos
          </Button>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3" fontWeight="900" sx={{ color: '#1a1a2e' }}>
              Detalle del Producto
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Edit />} 
              size="large"
              onClick={() => {}}
              sx={{ 
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Editar Producto
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Columna Izquierda - Imagen */}
          <Grid item xs={12} lg={4}>
            {/* Contenedor flex para alinear las dos cards */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Card de Imagen */}
              <Paper 
                elevation={0} 
                sx={{ 
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid #e0e0e0'
                }}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: 400,
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </Paper>

              {/* Card de ID y Vista Previa */}
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3, 
                  border: '1px solid #e0e0e0',
                  backgroundColor: 'white'
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary" fontWeight="600" display="block" gutterBottom>
                        ID del Producto
                      </Typography>
                      <Typography variant="h5" fontWeight="bold" color="primary">
                        #{product.id_key}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary" fontWeight="600" display="block" gutterBottom>
                        Vista Previa
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        Activa
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>

          {/* Columna Derecha - Información */}
          <Grid item xs={12} lg={8}>
            {/* Contenedor flex para alinear al mismo nivel */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
              {/* Información Principal */}
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid #e0e0e0' }}>
                <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 1, fontSize: '0.75rem' }}>
                  INFORMACIÓN PRINCIPAL
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h4" fontWeight="900" sx={{ mb: 2, color: '#1a1a2e' }}>
                    {product.name}
                  </Typography>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Box>
                    <Typography variant="overline" sx={{ color: 'text.secondary', fontSize: '0.7rem', fontWeight: 600 }}>
                      DESCRIPCIÓN
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, color: '#4a5568', lineHeight: 1.8 }}>
                      {product.description}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Detalles Adicionales */}
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  borderRadius: 3, 
                  border: '1px solid #e0e0e0',
                  flex: 1  // Esto hace que ocupe el espacio restante
                }}
              >
                <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 1, fontSize: '0.75rem', mb: 3, display: 'block' }}>
                  DETALLES ADICIONALES
                </Typography>
                
                <Grid container spacing={4}>
                  {/* Estado del Stock */}
                  <Grid item xs={6} sm={2.4}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight="600" display="block" gutterBottom>
                        Estado del Stock
                      </Typography>
                      <Chip 
                        label={stockStatus.label}
                        color={stockStatus.color}
                        sx={{ fontWeight: 'bold', mt: 1 }}
                      />
                    </Box>
                  </Grid>

                  {/* Unidades Disponibles */}
                  <Grid item xs={6} sm={2.4}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight="600" display="block" gutterBottom>
                        Unidades Disponibles
                      </Typography>
                      <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
                        {product.stock} unidades
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Precio Unitario */}
                  <Grid item xs={6} sm={2.4}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight="600" display="block" gutterBottom>
                        Precio Unitario
                      </Typography>
                      <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mt: 1 }}>
                        {formatPrice(product.price)}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Valor Total en Stock */}
                  <Grid item xs={6} sm={2.4}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight="600" display="block" gutterBottom>
                        Valor Total en Stock
                      </Typography>
                      <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
                        {formatPrice(product.price * product.stock)}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Categoría */}
                  <Grid item xs={12} sm={2.4}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight="600" display="block" gutterBottom>
                        Categoría
                      </Typography>
                      <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
                        {categoryName}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminProductDetail;