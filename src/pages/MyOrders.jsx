import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  Divider,
  Avatar
} from '@mui/material';
import {
  ArrowBack,
  ShoppingBag,
  LocalShipping,
  CalendarToday,
  Visibility
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { formatPrice, formatDate } from '../utils/formatters';

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

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
    // Cargar pedidos desde localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    // Ordenar por fecha más reciente
    const sortedOrders = savedOrders.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setOrders(sortedOrders);
  }, []);

  const getStatusInfo = (status) => {
    const statusKey = Object.keys(ORDER_STATUS).find(
      key => ORDER_STATUS[key].value === status
    );
    return statusKey ? ORDER_STATUS[statusKey] : ORDER_STATUS.PENDING;
  };

  const getDeliveryMethod = (method) => {
    const deliveryMethod = DELIVERY_METHODS.find(m => m.value === method);
    return deliveryMethod ? deliveryMethod.label : 'No especificado';
  };

  if (orders.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} sx={{ mb: 4 }}>
          Volver
        </Button>
        <ShoppingBag sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          No tienes pedidos
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Cuando realices una compra, aparecerá aquí
        </Typography>
        <Button variant="contained" onClick={() => navigate('/products')}>
          Explorar Productos
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} sx={{ mb: 3 }}>
        Volver
      </Button>

      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Mis Pedidos
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Historial de tus compras
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {orders.map((order) => {
          const statusInfo = getStatusInfo(order.status);
          return (
            <Paper key={order.id_key} elevation={2} sx={{ overflow: 'hidden' }}>
              {/* Header del pedido */}
              <Box sx={{ 
                p: 2, 
                backgroundColor: '#f5f5f5', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Typography variant="h6" fontWeight="bold">
                    Pedido #{order.id_key}
                  </Typography>
                  <Chip 
                    label={statusInfo.label} 
                    color={statusInfo.color} 
                    size="small"
                  />
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() => navigate(`/orders/${order.id_key}`)}
                >
                  Ver Detalles
                </Button>
              </Box>

              <Box sx={{ p: 3 }}>
                {/* Info del pedido */}
                <Box sx={{ display: 'flex', gap: 4, mb: 3, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday sx={{ fontSize: 20, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Fecha de pedido
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {formatDate(order.date)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocalShipping sx={{ fontSize: 20, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Método de entrega
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {getDeliveryMethod(order.delivery_method)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ShoppingBag sx={{ fontSize: 20, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Total
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {formatPrice(order.total)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Productos */}
                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2 }}>
                  Productos ({order.products.length})
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {order.products.slice(0, 3).map((product, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Avatar 
                        src={product.image} 
                        variant="rounded" 
                        sx={{ width: 60, height: 60 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight="bold">
                          {product.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Cantidad: {product.quantity}
                        </Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {formatPrice(product.price)}
                      </Typography>
                    </Box>
                  ))}
                  {order.products.length > 3 && (
                    <Typography variant="caption" color="text.secondary">
                      + {order.products.length - 3} productos más
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Container>
  );
};

export default MyOrders;