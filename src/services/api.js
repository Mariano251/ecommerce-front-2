import axios from 'axios';
import { mockProducts, mockCategories, mockOrders } from './mockData';

// Configuración de Axios para cuando conectes el backend real
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag para usar datos mock (cambiar a false cuando conectes el backend)
const USE_MOCK_DATA = true;

// Servicios de productos
export const productService = {
  getAll: async (skip = 0, limit = 20) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { data: mockProducts.slice(skip, skip + limit) };
    }
    return api.get(`/products?skip=${skip}&limit=${limit}`);
  },

  getById: async (id) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const product = mockProducts.find(p => p.id_key === parseInt(id));
      return { data: product };
    }
    return api.get(`/products/${id}`);
  },

  create: async (productData) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newProduct = {
        id_key: mockProducts.length + 1,
        ...productData
      };
      mockProducts.push(newProduct);
      return { data: newProduct };
    }
    return api.post('/products', productData);
  },

  update: async (id, productData) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockProducts.findIndex(p => p.id_key === parseInt(id));
      if (index !== -1) {
        mockProducts[index] = { ...mockProducts[index], ...productData };
        return { data: mockProducts[index] };
      }
    }
    return api.put(`/products/${id}`, productData);
  },

  delete: async (id) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockProducts.findIndex(p => p.id_key === parseInt(id));
      if (index !== -1) {
        mockProducts.splice(index, 1);
      }
      return { data: { message: 'Product deleted' } };
    }
    return api.delete(`/products/${id}`);
  }
};

// Servicios de categorías
export const categoryService = {
  getAll: async () => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { data: mockCategories };
    }
    return api.get('/categories');
  }
};

// Servicios de pedidos
export const orderService = {
  create: async (orderData) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newOrder = {
        id_key: mockOrders.length + 1,
        date: new Date().toISOString(),
        ...orderData
      };
      mockOrders.push(newOrder);
      return { data: newOrder };
    }
    return api.post('/orders', orderData);
  },

  getById: async (id) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const order = mockOrders.find(o => o.id_key === parseInt(id));
      return { data: order };
    }
    return api.get(`/orders/${id}`);
  }
};

export default api;