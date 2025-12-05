import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.id_key === product.id_key);

    if (existingItem) {
      // Verificar stock
      if (existingItem.quantity + quantity > product.stock) {
        toast.error(`Stock insuficiente. Disponible: ${product.stock}`);
        return;
      }

      setCartItems(cartItems.map(item =>
        item.id_key === product.id_key
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
      toast.success(`Cantidad actualizada: ${existingItem.quantity + quantity}`);
    } else {
      if (quantity > product.stock) {
        toast.error(`Stock insuficiente. Disponible: ${product.stock}`);
        return;
      }

      setCartItems([...cartItems, { ...product, quantity }]);
      toast.success('Producto agregado al carrito');
    }

    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id_key !== productId));
    toast.info('Producto eliminado del carrito');
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const product = cartItems.find(item => item.id_key === productId);
    if (quantity > product.stock) {
      toast.error(`Stock insuficiente. Disponible: ${product.stock}`);
      return;
    }

    setCartItems(cartItems.map(item =>
      item.id_key === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Carrito vaciado');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      isCartOpen,
      toggleCart,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};