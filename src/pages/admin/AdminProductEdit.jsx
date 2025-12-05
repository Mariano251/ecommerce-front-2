import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  MenuItem
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useProducts } from '../../context/ProductContext';
import { toast } from 'react-toastify';

const AdminProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, categories } = useProducts();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category_id: 1,
    image: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const foundProduct = products.find(p => p.id_key === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setFormData({
        name: foundProduct.name,
        description: foundProduct.description,
        price: foundProduct.price,
        stock: foundProduct.stock,
        category_id: foundProduct.category_id,
        image: foundProduct.image
      });
    }
  }, [id, products]);

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

  const handleSave = () => {
    if (!validate()) {
      toast.error('Por favor corrige los errores del formulario');
      return;
    }

    console.log('Guardar cambios:', formData);
    toast.success('Producto actualizado correctamente');
    navigate('/admin/products');
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4">Producto no encontrado</Typography>
        <Button variant="contained" onClick={() => navigate('/admin/products')} sx={{ mt: 2 }}>
          Volver a Productos
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 6
    }}>
      <Container maxWidth="md">
        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate('/admin/products')} 
          sx={{ 
            mb: 3,
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Volver a Productos
        </Button>

        <Box sx={{
          backgroundColor: 'white',
          borderRadius: 4,
          p: 5,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <Typography variant="h3" fontWeight="900" gutterBottom sx={{ color: '#1a1a2e', mb: 4 }}>
            Editar Producto
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Nombre */}
            <Box>
              <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#4a5568' }}>
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
                    backgroundColor: '#f7fafc',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                }}
              />
            </Box>

            {/* Descripción */}
            <Box>
              <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#4a5568' }}>
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
                rows={4}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f7fafc',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                }}
              />
            </Box>

            {/* Precio y Stock */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#4a5568' }}>
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
                      backgroundColor: '#f7fafc',
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: 'transparent',
                      },
                      '&:hover fieldset': {
                        borderColor: '#667eea',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#667eea',
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#4a5568' }}>
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
                      backgroundColor: '#f7fafc',
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: 'transparent',
                      },
                      '&:hover fieldset': {
                        borderColor: '#667eea',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#667eea',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>

            {/* Categoría */}
            <Box>
              <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#4a5568' }}>
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
                    backgroundColor: '#f7fafc',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
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
              <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#4a5568' }}>
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
                    backgroundColor: '#f7fafc',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                }}
              />
            </Box>

            {/* Botones */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#4a5568',
                    borderColor: '#e2e8f0',
                    '&:hover': {
                      borderColor: '#cbd5e0',
                      backgroundColor: '#f7fafc'
                    }
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                    }
                  }}
                >
                  Actualizar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminProductEdit;