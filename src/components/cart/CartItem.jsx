import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id_key, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id_key, item.quantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      updateQuantity(item.id_key, value);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        borderBottom: '1px solid #e0e0e0',
        '&:hover': { backgroundColor: '#f5f5f5' }
      }}
    >
      {/* Imagen */}
      <Box
        component="img"
        src={item.image}
        alt={item.name}
        sx={{
          width: 80,
          height: 80,
          objectFit: 'cover',
          borderRadius: 1
        }}
      />

      {/* Info */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
          {item.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {formatPrice(item.price)}
        </Typography>

        {/* Controles de cantidad */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <IconButton size="small" onClick={handleDecrement}>
            <Remove fontSize="small" />
          </IconButton>

          <TextField
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            size="small"
            sx={{ width: '60px' }}
            inputProps={{ min: 1, max: item.stock, style: { textAlign: 'center' } }}
          />

          <IconButton size="small" onClick={handleIncrement}>
            <Add fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            color="error"
            onClick={() => removeFromCart(item.id_key)}
            sx={{ ml: 'auto' }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Subtotal */}
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          {formatPrice(item.price * item.quantity)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CartItem;