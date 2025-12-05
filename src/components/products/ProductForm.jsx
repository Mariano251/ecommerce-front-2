import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Divider,
  Paper
} from '@mui/material';
import { Close, Image as ImageIcon } from '@mui/icons-material';
import { useProducts } from '../../context/ProductContext';

const ProductForm = ({ open, onClose, product, onSave }) => {
  const { categories } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category_id: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        stock: product.stock || '',
        category_id: product.category_id || '',
        description: product.description || '',
        image: product.image || ''
      });
    } else {
      setFormData({
        name: '',
        price: '',
        stock: '',
        category_id: '',
        description: '',
        image: ''
      });
    }
  }, [product, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ pb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {product ? 'Editar Producto' : 'Nuevo Producto'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product ? 'Modifica la información del producto' : 'Completa los datos del nuevo producto'}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={4}>
          {/* Columna izquierda - Vista previa */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: '2px dashed #e0e0e0',
                borderRadius: 2,
                backgroundColor: '#fafafa',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                minHeight: '500px'
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">
                VISTA PREVIA
              </Typography>
              
              <Box
                sx={{
                  width: '100%',
                  height: '350px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: formData.image ? 'transparent' : '#e0e0e0',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                {formData.image ? (
                  <Box
                    component="img"
                    src={formData.image}
                    alt="Preview"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <ImageIcon sx={{ fontSize: 100, color: '#9e9e9e' }} />
                )}
              </Box>

              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold" noWrap>
                  {formData.name || 'Nombre del producto'}
                </Typography>
                <Typography variant="h4" color="primary" fontWeight="bold" sx={{ mt: 1 }}>
                  ${formData.price || '0.00'}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                  Stock: {formData.stock || '0'} unidades
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Columna derecha - Formulario */}
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
              
              {/* Información Básica */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  📝 Información Básica
                </Typography>
                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nombre del Producto"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Ej: iPhone 15 Pro Max"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Categoría"
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleChange}
                      required
                      InputLabelProps={{
                        shrink: true
                      }}
                      SelectProps={{
                        displayEmpty: true
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Selecciona una categoría</em>
                      </MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category.id_key} value={category.id_key}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Box>

              {/* Precio y Stock */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  💰 Precio y Stock
                </Typography>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Precio (ARS)"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      inputProps={{ min: 0, step: 0.01 }}
                      placeholder="0.00"
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1, color: 'text.secondary' }}>$</Typography>
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Stock Disponible"
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                      inputProps={{ min: 0 }}
                      placeholder="0"
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Imagen */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  🖼️ Imagen del Producto
                </Typography>
                <TextField
                  fullWidth
                  label="URL de la Imagen"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </Box>

              {/* Descripción */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  📄 Descripción
                </Typography>
                <TextField
                  fullWidth
                  label="Descripción del Producto"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={5}
                  placeholder="Describe las características principales del producto..."
                  helperText={`${formData.description.length}/500 caracteres`}
                  inputProps={{ maxLength: 500 }}
                />
              </Box>

            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 3, gap: 1.5 }}>
        <Button 
          onClick={onClose} 
          size="large"
          variant="outlined"
          sx={{ minWidth: 130, py: 1.2 }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          size="large"
          disabled={
            !formData.name || 
            !formData.price || 
            !formData.stock || 
            !formData.category_id
          }
          sx={{ minWidth: 150, py: 1.2 }}
        >
          {product ? 'Guardar Cambios' : 'Crear Producto'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;