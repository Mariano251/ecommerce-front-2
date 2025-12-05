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
  StepLabel,
  Grid,
  TextField,
  MenuItem,
  Chip
} from '@mui/material';
import {
  ArrowBack,
  Person,
  Home,
  Email,
  Phone,
  Edit,
  Save
} from '@mui/icons-material';
import { formatPrice, formatDate } from '../../utils/formatters';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newStatus, setNewStatus] = useState(1);

  const ORDER_STATUS = {
    PENDING: { value: 1, label: 'Pendiente', color: 'warning' },
    IN_PROGRESS: { value: 2, label: 'En progreso', color: 'info' },
    DELIVERED: { value: 3, label: 'Entregado', color: 'success' },
    CANCELLED: { value: 4, label: 'Cancelado', color: 'error' }
  };

  const DELIVERY_METHODS = [
    { value: 1, label: 'Drive-thru' },
    { value: 2, label: 'En mano' },
    { value: 3, label: 'A domicilio' }
  ];

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = savedOrders.find(o => o.id_key === parseInt(id));
    if (foundOrder) {
      setOrder(foundOrder);
      setNewStatus(foundOrder.status);
    }
  }, [id]);

  const getDeliveryMethod = (method) => {
    const deliveryMethod = DELIVERY_METHODS.find(m => m.value === method);
    return deliveryMethod ? deliveryMethod.label : 'No especificado';
  };

  const getStatusInfo = (status) => {
    const statusKey = Object.keys(ORDER_STATUS).find(
      key => ORDER_STATUS[key].value === status
    );
    return statusKey ? ORDER_STATUS[statusKey] : ORDER_STATUS.PENDING;
  };

  const handleSaveStatus = () => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = savedOrders.map(o => 
      o.id_key === order.id_key ? { ...o, status: newStatus } : o
    );
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setOrder({ ...order, status: newStatus });
    setEditMode(false);
  };

  if (!order) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Pedido no encontrado
        </Typography>
        <Button variant="contained" onClick={() => navigate('/admin/orders')} sx={{ mt: 2 }}>
          Volver a Pedidos
        </Button>
      </Container>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const steps = ['Pendiente', 'En progreso', 'Entregado'];
  const activeStep = order.status === 4 ? -1 : order.status - 1;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/admin/orders')} sx={{ mb: 3 }}>
        Volver a Pedidos
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Pedido #{order.id_key}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gestión del pedido desde el panel de administración
          </Typography>
        </Box>
        <Chip 
          label={statusInfo.label} 
          color={statusInfo.color} 
          sx={{ fontSize: '1rem', fontWeight: 'bold', px: 2, py: 3 }}
        />
      </Box>

      <Grid container spacing={4}>
        {/* Columna Izquierda */}
        <Grid item xs={12} md={8}>
          {/* Estado del pedido */}
          <Paper elevation={3} sx={{ p: 4, mb: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight="bold">
                Estado del Pedido
              </Typography>
              {!editMode ? (
                <Button variant="outlined" startIcon={<Edit />} onClick={() => setEditMode(true)}>
                  Cambiar Estado
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" size="small" onClick={() => setEditMode(false)}>
                    Cancelar
                  </Button>
                  <Button variant="contained" size="small" startIcon={<Save />} onClick={handleSaveStatus}>
                    Guardar
                  </Button>
                </Box>
              )}
            </Box>

            {editMode ? (
              <TextField
                fullWidth
                select
                label="Estado del Pedido"
                value={newStatus}
                onChange={(e) => setNewStatus(parseInt(e.target.value))}
              >
                {Object.keys(ORDER_STATUS).map((key) => (
                  <MenuItem key={ORDER_STATUS[key].value} value={ORDER_STATUS[key].value}>
                    {ORDER_STATUS[key].label}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <>
                {order.status === 4 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h4" color="error" fontWeight="bold">
                      PEDIDO CANCELADO
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
              </>
            )}
          </Paper>

          {/* Información del Pedido */}
          <Paper elevation={3} sx={{ p: 4, mb: 3, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Información del Pedido
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">
                  Fecha del Pedido
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {formatDate(order.date)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">
                  Método de Entrega
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {getDeliveryMethod(order.delivery_method)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Productos */}
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Productos del Pedido
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {order.products.map((product, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 3, alignItems: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                  <Avatar 
                    src={product.image} 
                    variant="rounded" 
                    sx={{ width: 100, height: 100 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cantidad: {product.quantity}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mt: 1 }}>
                      {formatPrice(product.price)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Columna Derecha */}
        <Grid item xs={12} md={4}>
          {/* Información del Cliente */}
          <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Información del Cliente
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Person sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Nombre Completo
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {order.client.name} {order.client.lastname}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Email sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {order.client.email}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Phone sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Teléfono
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {order.client.telephone}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Home sx={{ fontSize: 24, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Dirección de Entrega
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {order.address.street} {order.address.number}
                  </Typography>
                  <Typography variant="body2">
                    {order.address.city}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Resumen de Pago */}
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Resumen de Pago
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {formatPrice(order.total)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Envío</Typography>
                <Typography variant="body1" color="success.main" fontWeight="bold">
                  Gratis
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold">Total</Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {formatPrice(order.total)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminOrderDetail;