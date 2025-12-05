import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert
} from '@mui/material';
import {
  Lock,
  Person,
  Visibility,
  VisibilityOff,
  AdminPanelSettings
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    const result = login(formData.username, formData.password);
    
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: 'center'
          }}
        >
          {/* Logo/Icono */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AdminPanelSettings sx={{ fontSize: 48, color: 'white' }} />
            </Box>
          </Box>

          {/* Título */}
          <Typography variant="h4" fontWeight="900" gutterBottom>
            Panel de Administración
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Ingresa tus credenciales para continuar
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Usuario */}
              <TextField
                fullWidth
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Usuario"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />

              {/* Contraseña */}
              <TextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />

              {/* Botón de Login */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                  }
                }}
              >
                Iniciar Sesión
              </Button>
            </Box>
          </form>

          {/* Credenciales de prueba */}
          <Box sx={{ mt: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              <strong>Credenciales de prueba:</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              Usuario: <strong>admin</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              Contraseña: <strong>admin123</strong>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;