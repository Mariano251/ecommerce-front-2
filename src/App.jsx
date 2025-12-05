import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';

import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetailPage from './pages/ProductDetailPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import MyOrders from './pages/MyOrders';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';
import AdminProductDetail from './pages/admin/AdminProductDetail';
import AdminOrderDetail from './pages/admin/AdminOrderDetail';

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#2e7d32',
    },
    warning: {
      main: '#ed6c02',
    },
    error: {
      main: '#d32f2f',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <Routes>
                {/* Rutas públicas con Layout normal */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/products" element={<Layout><Products /></Layout>} />
                <Route path="/products/:id" element={<Layout><ProductDetailPage /></Layout>} />
                <Route path="/cart" element={<Layout><Cart /></Layout>} />
                <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
                <Route path="/orders/:id" element={<Layout><OrderTracking /></Layout>} />
                <Route path="/my-orders" element={<Layout><MyOrders /></Layout>} />

                {/* Ruta de Login Admin (NO protegida) */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Rutas de administración PROTEGIDAS con AdminLayout */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminLayout><Dashboard /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/products" 
                  element={
                    <ProtectedRoute>
                      <AdminLayout><ProductManagement /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/products/:id" 
                  element={
                    <ProtectedRoute>
                      <AdminLayout><AdminProductDetail /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/orders" 
                  element={
                    <ProtectedRoute>
                      <AdminLayout><OrderManagement /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/orders/:id" 
                  element={
                    <ProtectedRoute>
                      <AdminLayout><AdminOrderDetail /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />

                {/* Ruta 404 */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>

              {/* Notificaciones Toast */}
              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;