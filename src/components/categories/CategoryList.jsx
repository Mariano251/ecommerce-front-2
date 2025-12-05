import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  Badge
} from '@mui/material';
import { Category } from '@mui/icons-material';
import { useProducts } from '../../context/ProductContext';

const CategoryList = () => {
  const { categories, products, selectedCategory, setSelectedCategory } = useProducts();

  // Contar productos por categoría
  const getProductCount = (categoryId) => {
    return products.filter(p => p.category_id === categoryId).length;
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Category /> Categorías
      </Typography>

      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedCategory === null}
            onClick={() => setSelectedCategory(null)}
          >
            <ListItemText primary="Todos los productos" />
            <Badge badgeContent={products.length} color="primary" />
          </ListItemButton>
        </ListItem>

        {categories.map((category) => (
          <ListItem key={category.id_key} disablePadding>
            <ListItemButton
              selected={selectedCategory === category.id_key}
              onClick={() => setSelectedCategory(category.id_key)}
            >
              <ListItemText primary={category.name} />
              <Badge badgeContent={getProductCount(category.id_key)} color="primary" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CategoryList;