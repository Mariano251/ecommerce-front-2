import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  MenuItem,
  Divider
} from '@mui/material';
import { useState } from 'react';
import { DELIVERY_METHODS, PAYMENT_TYPES } from '../../utils/constants';

const OrderForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Datos del cliente
    name: '',
    lastname: '',
    email: '',
    telephone: '',
    // Dirección
    street: '',
    number: '',
    city: '',
    // Método de entrega y pago
    delivery_method: 3,
    payment_type: 'card'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Información de envío
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Datos personales */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Datos personales
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Apellido"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Teléfono"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="+525512345678"
              required
            />
          </Grid>

          {/* Dirección */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Dirección de envío
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Calle"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Número"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ciudad"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Método de entrega y pago */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Método de entrega y pago
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Método de entrega"
              name="delivery_method"
              value={formData.delivery_method}
              onChange={handleChange}
              required
            >
              {Object.values(DELIVERY_METHODS).map((method) => (
                <MenuItem key={method.value} value={method.value}>
                  {method.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Método de pago"
              name="payment_type"
              value={formData.payment_type}
              onChange={handleChange}
              required
            >
              {Object.values(PAYMENT_TYPES).map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Botón */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
            >
              Continuar con el pago
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default OrderForm;