import {
  Box,
  Chip,
  Typography,
  Paper
} from '@mui/material';
import { useProducts } from '../../context/ProductContext';

const CategoryFilter = () => {
  const { categories, selectedCategory, setSelectedCategory } = useProducts();

  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null); // Deseleccionar
    } else {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Categorías
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Chip
          label="Todos"
          onClick={() => setSelectedCategory(null)}
          color={selectedCategory === null ? 'primary' : 'default'}
          clickable
        />
        {categories.map((category) => (
          <Chip
            key={category.id_key}
            label={category.name}
            onClick={() => handleCategoryClick(category.id_key)}
            color={selectedCategory === category.id_key ? 'primary' : 'default'}
            clickable
          />
        ))}
      </Box>
    </Paper>
  );
};

export default CategoryFilter;