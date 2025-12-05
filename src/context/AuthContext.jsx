import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Credenciales de administrador (en producción esto debería estar en backend)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
  };

  useEffect(() => {
    // Verificar si hay una sesión activa al cargar
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (username, password) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem('isAdminAuthenticated', 'true');
      return { success: true };
    }
    return { success: false, error: 'Usuario o contraseña incorrectos' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};