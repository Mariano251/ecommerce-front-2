import { Card, CardMedia, CardContent, CardActions, Typography, Button, Chip, Box } from '@mui/material';
import { ShoppingCart, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleViewDetails = () => {
    navigate(`/products/${product.id_key}`);
  };

  const getStockColor = () => {
    if (product.stock === 0) return 'error';
    if (product.stock < 10) return 'warning';
    return 'success';
  };

  return (
    <Card
      sx={{
        height: '420px',
        minHeight: '420px',
        maxHeight: '420px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        borderRadius: 2,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
      onClick={handleViewDetails}
    >
      {/* IMAGEN CON ALTURA ABSOLUTA FIJA */}
      <Box 
        sx={{ 
          position: 'relative', 
          width: '100%',
          height: '200px',
          minHeight: '200px',
          maxHeight: '200px',
          flexShrink: 0,
          overflow: 'hidden', 
          backgroundColor: '#f5f5f5' 
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Chip
          label={`Stock: ${product.stock}`}
          color={getStockColor()}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            fontWeight: 'bold',
          }}
        />
      </Box>

      {/* CONTENIDO CON ALTURA CONTROLADA */}
      <CardContent 
        sx={{ 
          height: '140px',
          minHeight: '140px',
          maxHeight: '140px',
          p: 2, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <Typography
          variant="h6"
          component="div"
          fontWeight="bold"
          sx={{ 
            mb: 1, 
            fontSize: '1rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            height: '1.5em'
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 2,
            fontSize: '0.875rem',
            height: '2.6em',
            flexShrink: 0
          }}
        >
          {product.description}
        </Typography>

        <Typography 
          variant="h6" 
          color="primary" 
          fontWeight="bold" 
          sx={{ 
            mt: 'auto',
            height: '1.5em'
          }}
        >
          {formatPrice(product.price)}
        </Typography>
      </CardContent>

      {/* BOTONES CON ALTURA FIJA */}
      <CardActions 
        sx={{ 
          height: '80px',
          minHeight: '80px',
          maxHeight: '80px',
          p: 2, 
          pt: 0, 
          gap: 1, 
          flexShrink: 0 
        }}
      >
        <Button
          fullWidth
          variant="contained"
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          size="medium"
        >
          {product.stock === 0 ? 'Agotado' : 'Agregar'}
        </Button>
        <Button
          variant="outlined"
          startIcon={<Visibility />}
          onClick={handleViewDetails}
          size="medium"
        >
          Ver
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;