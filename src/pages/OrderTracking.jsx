import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  Avatar,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  ArrowBack,
  Person,
  Home,
  Email,
  Phone
} from '@mui/icons-material';
import { formatPrice, formatDate } from '../utils/formatters';

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  // Estados de pedido
  const ORDER_STATUS = {
    PENDING: { value: 1, label: 'Pendiente', color: 'warning' },
    IN_PROGRESS: { value: 2, label: 'En progreso', color: 'info' },
    DELIVERED: { value: 3, label: 'Entregado', color: 'success' },
    CANCELLED: { value: 4, label: 'Cancelado', color: 'error' }
  };

  // Métodos de entrega
  const DELIVERY_METHODS = [
    { value: 1, label: 'Drive-thru' },
    { value: 2, label: 'En mano' },
    { value: 3, label: 'A domicilio' }
  ];

  useEffect(() => {
    // Cargar pedido desde localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = savedOrders.find(o => o.id_key === parseInt(id));
    setOrder(foundOrder);
  }, [id]);

  if (!order) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Pedido no encontrado
        </Typography>
        <Button variant="contained" onClick={() => navigate('/my-orders')} sx={{ mt: 2 }}>
          Ver Mis Pedidos
        </Button>
      </Container>
    );
  }

  const getDeliveryMethod = (method) => {
    const deliveryMethod = DELIVERY_METHODS.find(m => m.value === method);
    return deliveryMethod ? deliveryMethod.label : 'No especificado';
  };

  const steps = ['Pendiente', 'En progreso', 'Entregado'];
  const activeStep = order.status === 4 ? -1 : order.status - 1;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/my-orders')} sx={{ mb: 3 }}>
        Volver a Mis Pedidos
      </Button>

      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Seguimiento de Pedido
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Pedido #{order.id_key}
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        {/* Columna izquierda */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Estado del pedido */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Estado del pedido
            </Typography>
            {order.status === 4 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h5" color="error" fontWeight="bold">
                  CANCELADO
                </Typography>
              </Box>
            ) : (
              <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
          </Paper>

          {/* Detalles del pedido */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Detalles del Pedido
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Fecha de pedido
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {formatDate(order.date)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Método de entrega
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {getDeliveryMethod(order.delivery_method)}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Productos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              {order.products.map((product, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Avatar 
                    src={product.image} 
                    variant="rounded" 
                    sx={{ width: 70, height: 70 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight="bold">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cantidad: {product.quantity}
                    </Typography>
                    <Typography variant="body2" color="primary" fontWeight="bold">
                      {formatPrice(product.price)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Columna derecha */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Información de envío */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Información de Envío
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <Person sx={{ fontSize: 20, color: 'text.secondary', mt: 0.5 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Destinatario
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {order.client.name} {order.client.lastname}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <Home sx={{ fontSize: 20, color: 'text.secondary', mt: 0.5 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Dirección
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {order.address.street} {order.address.number}
                  </Typography>
                  <Typography variant="body2">
                    {order.address.city}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <Email sx={{ fontSize: 20, color: 'text.secondary', mt: 0.5 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {order.client.email}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <Phone sx={{ fontSize: 20, color: 'text.secondary', mt: 0.5 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Teléfono
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {order.client.telephone}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Resumen del pago */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Resumen del Pago
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Subtotal</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {formatPrice(order.total)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Envío</Typography>
                <Typography variant="body2" color="success.main" fontWeight="bold">
                  Gratis
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold">Total</Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {formatPrice(order.total)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default OrderTracking;