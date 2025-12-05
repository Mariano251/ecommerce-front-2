import { Grid, Box, CircularProgress, Typography } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = ({ products, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No se encontraron productos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Intenta ajustar los filtros de búsqueda
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id_key}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;