import { createContext, useContext, useState, useEffect } from 'react';
import { productService, categoryService } from '../services/api';
import { toast } from 'react-toastify';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Cargar productos
  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll(0, 100);
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  // Cargar categorías
  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error('Error al cargar categorías');
    }
  };

  // Cargar al montar el componente
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  // Filtrar productos por categoría
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category_id === selectedCategory)
    : products;

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      loading,
      selectedCategory,
      setSelectedCategory,
      filteredProducts,
      loadProducts,
      loadCategories
    }}>
      {children}
    </ProductContext.Provider>
  );
};