import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useProducts } from '../../context/ProductContext';
import { toast } from 'react-toastify';

const AddProductModal = ({ open, onClose }) => {
  const { categories } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    image: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.description.trim()) newErrors.description = 'La descripción es requerida';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'El precio debe ser mayor a 0';
    if (!formData.stock || parseInt(formData.stock) < 0) newErrors.stock = 'El stock no puede ser negativo';
    if (!formData.category_id) newErrors.category_id = 'La categoría es requerida';
    if (!formData.image.trim()) newErrors.image = 'La URL de imagen es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      toast.error('Por favor corrige los errores del formulario');
      return;
    }

    // Aquí iría la lógica para guardar el producto
    console.log('Nuevo producto:', {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      category_id: parseInt(formData.category_id)
    });

    toast.success('Producto agregado correctamente');
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category_id: '',
      image: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header */}
        <Box 
          sx={{ 
            p: 4, 
            pb: 3,
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start'
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="900" sx={{ color: 'white', mb: 1 }}>
              Nuevo Producto
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Completa la información del producto
            </Typography>
          </Box>
          <IconButton 
            onClick={handleClose}
            sx={{ 
              color: 'white',
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.1)' 
              }
            }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Form */}
        <Box sx={{ p: 4, pt: 3, backgroundColor: 'white', borderRadius: '0 0 16px 16px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Nombre */}
            <Box>
              <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#374151' }}>
                Nombre del Producto *
              </Typography>
              <TextField
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                placeholder="Ej: iPhone 15 Pro Max"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
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
              <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#374151' }}>
                Descripción *
              </Typography>
              <TextField
                fullWidth
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                placeholder="Describe las características del producto..."
                multiline
                rows={3}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
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
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
              <Box>
                <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#374151' }}>
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
                      borderRadius: 2,
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

              <Box>
                <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#374151' }}>
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
                      borderRadius: 2,
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
            </Box>

            {/* Categoría */}
            <Box>
              <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#374151' }}>
                Categoría *
              </Typography>
              <TextField
                fullWidth
                select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                error={!!errors.category_id}
                helperText={errors.category_id}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                }}
              >
                <MenuItem value="">Selecciona una categoría</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id_key} value={cat.id_key}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* URL de Imagen */}
            <Box>
              <Typography variant="body2" fontWeight="600" sx={{ mb: 1, color: '#374151' }}>
                URL de Imagen *
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
                    borderRadius: 2,
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
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClose}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderColor: '#d1d5db',
                  color: '#6b7280',
                  '&:hover': {
                    borderColor: '#9ca3af',
                    backgroundColor: 'rgba(0,0,0,0.02)'
                  }
                }}
              >
                Cancelar
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                  }
                }}
              >
                Agregar Producto
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;