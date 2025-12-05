import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  Chip,
  Button,
  Divider
} from '@mui/material';
import {
  Inventory,
  ShoppingCart,
  AttachMoney,
  TrendingUp,
  ArrowForward,
  CheckCircle,
  AccessTime,
  LocalShipping,
  Category,
  Warning
} from '@mui/icons-material';
import { useProducts } from '../../context/ProductContext';
import { formatPrice, formatDate } from '../../utils/formatters';
import AddProductModal from './AddProductModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const { products, categories } = useProducts();
  const [orders, setOrders] = useState([]);
  const [openAddProduct, setOpenAddProduct] = useState(false);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const sortedOrders = savedOrders.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setOrders(sortedOrders);
  }, []);

  const lowStockProducts = products.filter(p => p.stock < 15);
  
  const totalOrders = orders.length;
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const pendingOrders = orders.filter(o => o.status === 1).length;

  const recentOrders = orders.slice(0, 3);

  const ORDER_STATUS = {
    1: { label: 'Pendiente', color: 'warning', icon: <AccessTime /> },
    2: { label: 'En progreso', color: 'info', icon: <LocalShipping /> },
    3: { label: 'Entregado', color: 'success', icon: <CheckCircle /> },
    4: { label: 'Cancelado', color: 'error', icon: <CheckCircle /> }
  };

  const stats = [
    {
      title: 'Total Productos',
      value: products.length,
      icon: <Inventory sx={{ fontSize: 32 }} />,
      color: '#667eea',
      bgColor: 'rgba(102, 126, 234, 0.1)',
      label: 'Activos'
    },
    {
      title: 'Pedidos Totales',
      value: totalOrders,
      icon: <ShoppingCart sx={{ fontSize: 32 }} />,
      color: '#f093fb',
      bgColor: 'rgba(240, 147, 251, 0.1)',
      label: 'Gestionados'
    },
    {
      title: 'Ventas Totales',
      value: formatPrice(totalSales),
      icon: <AttachMoney sx={{ fontSize: 32 }} />,
      color: '#4facfe',
      bgColor: 'rgba(79, 172, 254, 0.1)',
      label: 'Ingresos'
    },
    {
      title: 'Stock Total',
      value: totalStock,
      icon: <TrendingUp sx={{ fontSize: 32 }} />,
      color: '#43e97b',
      bgColor: 'rgba(67, 233, 123, 0.1)',
      label: 'Unidades'
    },
    {
      title: 'Pedidos Pendientes',
      value: pendingOrders,
      icon: <AccessTime sx={{ fontSize: 32 }} />,
      color: '#ff9800',
      bgColor: 'rgba(255, 152, 0, 0.1)',
      label: 'Por procesar'
    },
    {
      title: 'Categorías',
      value: categories.length,
      icon: <Category sx={{ fontSize: 32 }} />,
      color: '#9c27b0',
      bgColor: 'rgba(156, 39, 176, 0.1)',
      label: 'Activas'
    }
  ];

  // Calcular estadísticas por categoría
  const categoryStats = categories.map(cat => {
    const categoryProducts = products.filter(p => p.category_id === cat.id_key);
    return {
      name: cat.name,
      count: categoryProducts.length,
      totalValue: categoryProducts.reduce((sum, p) => sum + (p.price * p.stock), 0)
    };
  }).filter(stat => stat.count > 0);

  return (
    <Box sx={{ 
      backgroundColor: '#f8f9fa',
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 64px)'
    }}>
      <Container maxWidth="xl" sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        py: 4
      }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="900" gutterBottom sx={{ color: '#1a1a2e' }}>
            Panel de Administración
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Resumen de tu tienda en tiempo real
          </Typography>
        </Box>

        {/* Stats Cards - 6 COLUMNAS */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  border: '1px solid #e0e0e0',
                  height: 140,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      fontWeight="600" 
                      sx={{ 
                        textTransform: 'uppercase', 
                        letterSpacing: 0.5,
                        display: 'block',
                        mb: 1,
                        fontSize: '0.7rem'
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="900" sx={{ mb: 0.5, color: '#1a1a2e', fontSize: '1.75rem' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: stat.bgColor, width: 48, height: 48 }}>
                    <Box sx={{ color: stat.color }}>
                      {stat.icon}
                    </Box>
                  </Avatar>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Segunda Fila: 3 COLUMNAS */}
        <Grid container spacing={3} sx={{ flex: 1, alignItems: 'stretch' }}>
          {/* Pedidos Recientes */}
          <Grid item xs={12} lg={5} sx={{ display: 'flex' }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: 3, 
                border: '1px solid #e0e0e0',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Pedidos Recientes
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Últimos {recentOrders.length} pedidos realizados
                  </Typography>
                </Box>
                <Button 
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/admin/orders')}
                  sx={{ 
                    textTransform: 'none', 
                    fontWeight: 600,
                    color: '#1976d2'
                  }}
                >
                  Ver todo
                </Button>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                {recentOrders.length === 0 ? (
                  <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    minHeight: '300px'
                  }}>
                    <ShoppingCart sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No hay pedidos todavía
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {recentOrders.map((order) => {
                      const status = ORDER_STATUS[order.status];
                      return (
                        <Paper
                          key={order.id_key}
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            border: '1px solid #e0e0e0',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': {
                              borderColor: '#1976d2',
                              boxShadow: 2
                            }
                          }}
                          onClick={() => navigate(`/admin/orders/${order.id_key}`)}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                Pedido #{order.id_key}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {formatDate(order.date)}
                              </Typography>
                            </Box>
                            <Chip 
                              icon={status.icon}
                              label={status.label}
                              color={status.color}
                              size="small"
                              sx={{ fontWeight: 'bold' }}
                            />
                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Cliente: <strong>{order.client.name} {order.client.lastname}</strong>
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Productos: <strong>{order.products.length}</strong>
                              </Typography>
                            </Box>
                            <Typography variant="h6" fontWeight="bold" color="primary">
                              {formatPrice(order.total)}
                            </Typography>
                          </Box>
                        </Paper>
                      );
                    })}
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Columna de Acciones - DIVIDIDA EN DOS CARDS */}
          <Grid item xs={12} lg={4} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Acciones Rápidas */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                flex: lowStockProducts.length > 0 ? 1 : 'auto',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Acciones Rápidas
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                Gestiona tu tienda de forma eficiente con estas opciones
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={() => setOpenAddProduct(true)}
                  sx={{
                    py: 2,
                    backgroundColor: 'white',
                    color: '#667eea',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '15px',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    }
                  }}
                >
                  Agregar Producto
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/admin/orders')}
                  sx={{
                    py: 2,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '15px',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)',
                    }
                  }}
                >
                  Ver Pedidos
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/admin/products')}
                  sx={{
                    py: 2,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '15px',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)',
                    }
                  }}
                >
                  Gestionar Productos
                </Button>
              </Box>
            </Paper>

            {/* Stock Bajo - CARD SEPARADA EN NARANJA */}
            {lowStockProducts.length > 0 && (
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                  color: 'white',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 48, height: 48 }}>
                      <Warning sx={{ color: 'white', fontSize: 28 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        Stock Bajo
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {lowStockProducts.length} productos requieren atención
                      </Typography>
                    </Box>
                  </Box>

                  {/* Lista de productos con stock bajo */}
                  <Box sx={{ 
                    mt: 2, 
                    maxHeight: '200px', 
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'rgba(255,255,255,0.3)',
                      borderRadius: '10px',
                    },
                  }}>
                    {lowStockProducts.slice(0, 5).map((product) => (
                      <Box 
                        key={product.id_key}
                        sx={{ 
                          py: 1.5,
                          borderBottom: '1px solid rgba(255,255,255,0.1)',
                          '&:last-child': {
                            borderBottom: 'none'
                          }
                        }}
                      >
                        <Typography variant="body2" fontWeight="600" sx={{ mb: 0.5 }}>
                          {product.name}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" sx={{ opacity: 0.9 }}>
                            Stock: {product.stock} unidades
                          </Typography>
                          <Chip 
                            label={product.stock === 0 ? 'Agotado' : 'Bajo'}
                            size="small"
                            sx={{ 
                              bgcolor: 'rgba(255,255,255,0.2)',
                              color: 'white',
                              fontSize: '0.7rem',
                              height: '20px'
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/admin/products')}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    backgroundColor: 'white',
                    color: '#ff9800',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  Ver Productos
                </Button>
              </Paper>
            )}
          </Grid>

          {/* Productos por Categoría */}
          <Grid item xs={12} lg={3} sx={{ display: 'flex' }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: 3, 
                border: '1px solid #e0e0e0',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Productos por Categoría
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Distribución de tu inventario
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                {categoryStats.length === 0 ? (
                  <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    minHeight: '200px'
                  }}>
                    <Category sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      No hay productos en categorías
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {categoryStats.map((stat, index) => (
                      <Box key={index}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {stat.name}
                          </Typography>
                          <Chip 
                            label={stat.count} 
                            size="small" 
                            sx={{ 
                              bgcolor: '#667eea', 
                              color: 'white',
                              fontWeight: 'bold'
                            }} 
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          Valor en stock: <strong>{formatPrice(stat.totalValue)}</strong>
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>

              {/* Botón al final */}
              <Box sx={{ mt: 'auto', pt: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/admin/products')}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    borderRadius: 2
                  }}
                >
                  Ver Todos los Productos
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Modal Agregar Producto */}
      <AddProductModal 
        open={openAddProduct} 
        onClose={() => setOpenAddProduct(false)} 
      />
    </Box>
  );
};

export default Dashboard;