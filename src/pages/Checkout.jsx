import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  MenuItem,
  Divider,
  Avatar,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  CheckCircle,
  ShoppingBag,
  ArrowBack,
  ArrowForward,
  Person,
  Home,
  Payment
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    telephone: '',
    street: '',
    number: '',
    city: '',
    delivery_method: 3,
    payment_type: 1
  });

  const [errors, setErrors] = useState({});

  const steps = ['Datos Personales', 'Dirección de Envío', 'Método de Pago'];

  // Métodos de entrega
  const DELIVERY_METHODS = [
    { value: 1, label: 'Drive-thru' },
    { value: 2, label: 'En mano' },
    { value: 3, label: 'A domicilio' }
  ];

  // Métodos de pago
  const PAYMENT_TYPES = [
    { value: 1, label: 'Efectivo' },
    { value: 2, label: 'Tarjeta de crédito' },
    { value: 3, label: 'Tarjeta de débito' },
    { value: 4, label: 'Transferencia' }
  ];

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

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = 'Nombre requerido';
      if (!formData.lastname.trim()) newErrors.lastname = 'Apellido requerido';
      if (!formData.email.trim()) newErrors.email = 'Email requerido';
      if (!formData.telephone.trim()) newErrors.telephone = 'Teléfono requerido';
    } else if (step === 1) {
      if (!formData.street.trim()) newErrors.street = 'Calle requerida';
      if (!formData.number.trim()) newErrors.number = 'Número requerido';
      if (!formData.city.trim()) newErrors.city = 'Ciudad requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    try {
      const newOrder = {
        id_key: Date.now(),
        date: new Date().toISOString(),
        status: 1,
        total: getCartTotal(),
        delivery_method: parseInt(formData.delivery_method),
        payment_type: parseInt(formData.payment_type),
        client: {
          name: formData.name,
          lastname: formData.lastname,
          email: formData.email,
          telephone: formData.telephone
        },
        address: {
          street: formData.street,
          number: formData.number,
          city: formData.city
        },
        products: cartItems.map(item => ({
          id: item.id_key,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image
        }))
      };

      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      setOrderId(newOrder.id_key);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error('Error al crear pedido:', error);
      alert('Hubo un error al procesar tu pedido. Intenta nuevamente.');
    }
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingBag sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Tu carrito está vacío
        </Typography>
        <Button variant="contained" onClick={() => navigate('/products')} sx={{ mt: 2 }}>
          Ver Productos
        </Button>
      </Container>
    );
  }

  if (orderPlaced) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CheckCircle sx={{ fontSize: 100, color: 'success.main', mb: 3 }} />
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          ¡Pedido Realizado!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          Tu pedido #{orderId} ha sido confirmado
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Recibirás un email de confirmación en {formData.email}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="outlined" onClick={() => navigate('/products')}>
            Seguir Comprando
          </Button>
          <Button variant="contained" onClick={() => navigate(`/orders/${orderId}`)}>
            Ver Pedido
          </Button>
        </Box>
      </Container>
    );
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Person sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="h5" fontWeight="bold">
                Datos Personales
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
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
                  error={!!errors.lastname}
                  helperText={errors.lastname}
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
                  error={!!errors.email}
                  helperText={errors.email}
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
                  error={!!errors.telephone}
                  helperText={errors.telephone}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Home sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="h5" fontWeight="bold">
                Dirección de Envío
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="Calle"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  error={!!errors.street}
                  helperText={errors.street}
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
                  error={!!errors.number}
                  helperText={errors.number}
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
                  error={!!errors.city}
                  helperText={errors.city}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Método de Entrega"
                  name="delivery_method"
                  value={formData.delivery_method}
                  onChange={handleChange}
                >
                  {DELIVERY_METHODS.map((method) => (
                    <MenuItem key={method.value} value={method.value}>
                      {method.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Payment sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="h5" fontWeight="bold">
                Método de Pago
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Método de Pago"
                  name="payment_type"
                  value={formData.payment_type}
                  onChange={handleChange}
                >
                  {PAYMENT_TYPES.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    backgroundColor: '#f5f5f5',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Resumen de tu pedido
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Nombre:</strong> {formData.name} {formData.lastname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Email:</strong> {formData.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Dirección:</strong> {formData.street} {formData.number}, {formData.city}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Productos:</strong> {cartItems.length}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/cart')} sx={{ mb: 3 }}>
        Volver al Carrito
      </Button>

      <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
        Finalizar Compra
      </Typography>

      <Grid container spacing={4}>
        {/* Columna Izquierda - Stepper + Formulario */}
        <Grid item xs={12} md={7}>
          {/* Stepper */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>

          {/* Formulario */}
          <Paper elevation={2} sx={{ p: 4, minHeight: 400 }}>
            {renderStepContent(activeStep)}

            {/* Botones de navegación */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                size="large"
              >
                Atrás
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  sx={{ minWidth: 200 }}
                >
                  Confirmar Pedido
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={handleNext}
                  sx={{ minWidth: 150 }}
                >
                  Siguiente
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Columna Derecha - Resumen MÁS GRANDE */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 4, position: 'sticky', top: 100 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Resumen del Pedido
            </Typography>
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ mb: 3, maxHeight: 350, overflowY: 'auto' }}>
              {cartItems.map((item) => (
                <Box key={item.id_key} sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Avatar 
                    src={item.image} 
                    variant="rounded" 
                    sx={{ width: 80, height: 80 }} 
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mt: 1 }}>
                      {formatPrice(item.price)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">
                Subtotal ({cartItems.length} productos)
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {formatPrice(getCartTotal())}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="body1">Envío</Typography>
              <Typography variant="body1" color="success.main" fontWeight="bold">
                Gratis
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
              <Typography variant="h5" fontWeight="bold">Total</Typography>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {formatPrice(getCartTotal())}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;