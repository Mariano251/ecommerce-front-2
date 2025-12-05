import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  Dialog,
  DialogContent
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  FilterList
} from '@mui/icons-material';
import { useProducts } from '../../context/ProductContext';
import { formatPrice } from '../../utils/formatters';
import { toast } from 'react-toastify';
import AddProductModal from './AddProductModal';

const ProductManagement = () => {
  const navigate = useNavigate();
  const { products, categories } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category_id: 1,
    image: ''
  });
  const [errors, setErrors] = useState({});

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory ? product.category_id === parseInt(selectedCategory) : true;
    
    let matchStock = true;
    if (stockFilter === 'available') matchStock = product.stock > 0;
    if (stockFilter === 'low') matchStock = product.stock > 0 && product.stock < 15;
    if (stockFilter === 'out') matchStock = product.stock === 0;

    return matchSearch && matchCategory && matchStock;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setStockFilter('all');
  };

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category_id: product.category_id,
      image: product.image
    });
    setErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category_id: 1,
      image: ''
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock' || name === 'category_id' 
        ? parseFloat(value) || 0 
        : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.description.trim()) newErrors.description = 'La descripción es requerida';
    if (formData.price <= 0) newErrors.price = 'El precio debe ser mayor a 0';
    if (formData.stock < 0) newErrors.stock = 'El stock no puede ser negativo';
    if (!formData.image.trim()) newErrors.image = 'La URL de imagen es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitProduct = () => {
    if (!validate()) {
      toast.error('Por favor corrige los errores del formulario');
      return;
    }

    console.log('Actualizar producto:', formData);
    toast.success('Producto actualizado correctamente');
    handleCloseDialog();
  };

  const handleDelete = (productId) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      console.log('Eliminar producto:', productId);
      toast.success('Producto eliminado correctamente');
    }
  };

  const getStockColor = (stock) => {
    if (stock === 0) return 'error';
    if (stock < 15) return 'warning';
    return 'success';
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Gestión de Productos
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Administra el catálogo de tu tienda
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="large"
          startIcon={<Add />}
          onClick={() => setOpenAddProduct(true)}
        >
          Nuevo Producto
        </Button>
      </Box>

      {/* Panel de Filtros */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
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

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 3fr 2fr' }, 
          gap: 3 
        }}>
          <TextField
            fullWidth
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            select
            label="Categoría"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
            label="Stock"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="available">Disponibles</MenuItem>
            <MenuItem value="low">Stock bajo (&lt;15)</MenuItem>
            <MenuItem value="out">Sin stock</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> productos
          </Typography>
        </Box>
      </Paper>

      {/* Tabla de Productos */}
      {filteredProducts.length === 0 ? (
        <Paper elevation={2} sx={{ p: 8, textAlign: 'center' }}>
          <Typography variant="h5" color="text.secondary">
            No se encontraron productos
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><strong>Imagen</strong></TableCell>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell><strong>Categoría</strong></TableCell>
                <TableCell><strong>Precio</strong></TableCell>
                <TableCell><strong>Stock</strong></TableCell>
                <TableCell align="center"><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id_key} hover>
                  <TableCell>
                    <Avatar
                      src={product.image}
                      alt={product.name}
                      variant="rounded"
                      sx={{ width: 60, height: 60 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold">
                      {product.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block', maxWidth: 300 }}>
                      {product.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {categories.find(c => c.id_key === product.category_id)?.name || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Typography color="primary" fontWeight="bold">
                      {formatPrice(product.price)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.stock}
                      color={getStockColor(product.stock)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/admin/products/${product.id_key}`)}
                      title="Ver detalles"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={() => handleOpenDialog(product)}
                      title="Editar"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(product.id_key)}
                      title="Eliminar"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog Modal para Editar */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: '#1a1d2e',
          }
        }}
      >
        <DialogContent sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight="900" gutterBottom sx={{ color: 'white', mb: 3 }}>
            Editar Producto
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* Nombre */}
            <Box>
              <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#a0aec0' }}>
                Nombre *
              </Typography>
              <TextField
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                placeholder="Nombre del producto"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#2d3748',
                    color: 'white',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4299e1',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4299e1',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Box>

            {/* Descripción */}
            <Box>
              <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#a0aec0' }}>
                Descripción
              </Typography>
              <TextField
                fullWidth
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                placeholder="Descripción del producto"
                multiline
                rows={3}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#2d3748',
                    color: 'white',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4299e1',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4299e1',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Box>

            {/* Precio y Stock */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#a0aec0' }}>
                  Precio *
                </Typography>
                <TextField
                  fullWidth
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  error={!!errors.price}
                  helperText={errors.price}
                  placeholder="0.00"
                  variant="outlined"
                  InputProps={{
                    inputProps: { min: 0, step: 0.01 }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#2d3748',
                      color: 'white',
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: 'transparent',
                      },
                      '&:hover fieldset': {
                        borderColor: '#4299e1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#4299e1',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#a0aec0' }}>
                  Stock *
                </Typography>
                <TextField
                  fullWidth
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  error={!!errors.stock}
                  helperText={errors.stock}
                  placeholder="0"
                  variant="outlined"
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#2d3748',
                      color: 'white',
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: 'transparent',
                      },
                      '&:hover fieldset': {
                        borderColor: '#4299e1',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#4299e1',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Categoría */}
            <Box>
              <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#a0aec0' }}>
                Categoría *
              </Typography>
              <TextField
                fullWidth
                select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#2d3748',
                    color: 'white',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4299e1',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4299e1',
                    },
                  },
                  '& .MuiSelect-icon': {
                    color: 'white',
                  },
                }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id_key} value={cat.id_key}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* URL de Imagen */}
            <Box>
              <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#a0aec0' }}>
                URL de Imagen
              </Typography>
              <TextField
                fullWidth
                name="image"
                value={formData.image}
                onChange={handleChange}
                error={!!errors.image}
                helperText={errors.image}
                placeholder="https://ejemplo.com/imagen.jpg"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#2d3748',
                    color: 'white',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: '#4299e1',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4299e1',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />
            </Box>

            {/* Botones */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleCloseDialog}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#a0aec0',
                  borderColor: '#4a5568',
                  '&:hover': {
                    borderColor: '#718096',
                    backgroundColor: 'rgba(255,255,255,0.05)'
                  }
                }}
              >
                Cancelar
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmitProduct}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: '#1976d2',
                  '&:hover': {
                    background: '#1565c0',
                  }
                }}
              >
                Actualizar
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Modal Agregar Producto */}
      <AddProductModal 
        open={openAddProduct} 
        onClose={() => setOpenAddProduct(false)} 
      />
    </Container>
  );
};

export default ProductManagement;