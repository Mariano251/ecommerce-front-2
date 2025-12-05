import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Paper,
  MenuItem,
  Button,
  CircularProgress
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/products/ProductCard';

const Products = () => {
  const { filteredProducts, loading, selectedCategory, setSelectedCategory, categories, products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none');

  const getCategoryName = () => {
    if (!selectedCategory) return 'Todos los Productos';
    const category = categories.find(c => c.id_key === selectedCategory);
    return category ? category.name : 'Productos';
  };

  const searchFilteredProducts = searchTerm
    ? filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  const sortedProducts = [...searchFilteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'stock':
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSortBy('none');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Catálogo de Productos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explora nuestra selección de productos electrónicos
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterList color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Filtros
            </Typography>
          </Box>
          
          <Button variant="outlined" onClick={handleClearFilters}>
            Limpiar Filtros
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 3fr 2fr' }, gap: 2 }}>
          <TextField
            fullWidth
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
            }}
          />

          <TextField
            fullWidth
            select
            label="Categoría"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <MenuItem value="">Todas las categorías</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id_key} value={category.id_key}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            label="Ordenar por"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="none">Sin ordenar</MenuItem>
            <MenuItem value="price-asc">Precio: Menor a Mayor</MenuItem>
            <MenuItem value="price-desc">Precio: Mayor a Menor</MenuItem>
            <MenuItem value="name-asc">Nombre: A-Z</MenuItem>
            <MenuItem value="name-desc">Nombre: Z-A</MenuItem>
            <MenuItem value="stock">Mayor Stock</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Mostrando <strong>{sortedProducts.length}</strong> de <strong>{products.length}</strong> productos
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          {getCategoryName()} ({sortedProducts.length})
        </Typography>
      </Box>

      {/* GRID NATIVO COMO TU REFERENCIA */}
      {loading ? (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 3
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <Box
              key={n}
              sx={{
                height: '420px',
                background: 'rgba(0, 0, 0, 0.05)',
                borderRadius: 2
              }}
            />
          ))}
        </Box>
      ) : sortedProducts.length > 0 ? (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 3
        }}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id_key} product={product} />
          ))}
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Search size={60} color="#9CA3AF" style={{ marginBottom: 16 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            No se encontraron productos
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Intenta ajustar tus filtros o búsqueda
          </Typography>
          <Button variant="contained" onClick={handleClearFilters}>
            Limpiar filtros
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Products;