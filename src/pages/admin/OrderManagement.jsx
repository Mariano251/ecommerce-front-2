import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
  Grid
} from '@mui/material';
import {
  Visibility,
  Edit,
  LocalShipping
} from '@mui/icons-material';
import { formatPrice, formatDate } from '../../utils/formatters';

const OrderManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newStatus, setNewStatus] = useState(1);

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
    loadOrders();
  }, []);

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    // Ordenar por fecha más reciente
    const sortedOrders = savedOrders.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setOrders(sortedOrders);
  };

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

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = () => {
    if (selectedOrder) {
      const updatedOrders = orders.map(order => 
        order.id_key === selectedOrder.id_key 
          ? { ...order, status: newStatus }
          : order
      );
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
      handleCloseDialog();
    }
  };

  // Calcular estadísticas rápidas
  const stats = {
    pending: orders.filter(o => o.status === 1).length,
    inProgress: orders.filter(o => o.status === 2).length,
    delivered: orders.filter(o => o.status === 3).length,
    cancelled: orders.filter(o => o.status === 4).length
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Gestión de Pedidos
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Administra los pedidos de tu tienda
      </Typography>

      {/* Estadísticas rápidas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: '#fff3e0', borderRadius: 2 }}>
            <Typography variant="h3" fontWeight="bold" color="warning.main">
              {stats.pending}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight="bold">
              Pendientes
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: '#e3f2fd', borderRadius: 2 }}>
            <Typography variant="h3" fontWeight="bold" color="info.main">
              {stats.inProgress}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight="bold">
              En Progreso
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: '#e8f5e9', borderRadius: 2 }}>
            <Typography variant="h3" fontWeight="bold" color="success.main">
              {stats.delivered}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight="bold">
              Entregados
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: '#ffebee', borderRadius: 2 }}>
            <Typography variant="h3" fontWeight="bold" color="error.main">
              {stats.cancelled}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight="bold">
              Cancelados
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabla de pedidos */}
      {orders.length === 0 ? (
        <Paper elevation={2} sx={{ p: 8, textAlign: 'center', borderRadius: 3 }}>
          <LocalShipping sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary">
            No hay pedidos todavía
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><strong>ID Pedido</strong></TableCell>
                <TableCell><strong>Fecha</strong></TableCell>
                <TableCell><strong>Cliente</strong></TableCell>
                <TableCell><strong>Total</strong></TableCell>
                <TableCell><strong>Método de Entrega</strong></TableCell>
                <TableCell><strong>Estado</strong></TableCell>
                <TableCell align="center"><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <TableRow key={order.id_key} hover>
                    <TableCell>
                      <Typography fontWeight="bold">#{order.id_key}</Typography>
                    </TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {order.client.name} {order.client.lastname}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {order.client.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="primary" fontWeight="bold">
                        {formatPrice(order.total)}
                      </Typography>
                    </TableCell>
                    <TableCell>{getDeliveryMethod(order.delivery_method)}</TableCell>
                    <TableCell>
                      <Chip
                        label={statusInfo.label}
                        color={statusInfo.color}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/admin/orders/${order.id_key}`)}
                        title="Ver detalles"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => handleOpenDialog(order)}
                        title="Actualizar estado"
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog para actualizar estado */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold">
            Actualizar Estado del Pedido
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Pedido:</strong> #{selectedOrder.id_key}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Cliente:</strong> {selectedOrder.client.name} {selectedOrder.client.lastname}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                <strong>Total:</strong> {formatPrice(selectedOrder.total)}
              </Typography>

              <TextField
                fullWidth
                select
                label="Estado del Pedido"
                value={newStatus}
                onChange={(e) => setNewStatus(parseInt(e.target.value))}
                sx={{ mt: 2 }}
              >
                {Object.keys(ORDER_STATUS).map((key) => (
                  <MenuItem key={ORDER_STATUS[key].value} value={ORDER_STATUS[key].value}>
                    {ORDER_STATUS[key].label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleUpdateStatus} variant="contained" size="large">
            Actualizar Estado
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderManagement;