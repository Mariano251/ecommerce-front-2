import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { formatPrice, formatDate } from '../../utils/formatters';
import { ORDER_STATUS } from '../../utils/constants';

const OrderList = ({ orders }) => {
  const navigate = useNavigate();

  if (!orders || orders.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No hay pedidos registrados
        </Typography>
      </Box>
    );
  }

  const getStatusInfo = (status) => {
    return Object.values(ORDER_STATUS).find(s => s.value === status) || ORDER_STATUS.PENDING;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Fecha</strong></TableCell>
            <TableCell><strong>Total</strong></TableCell>
            <TableCell><strong>Estado</strong></TableCell>
            <TableCell align="center"><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            return (
              <TableRow key={order.id_key} hover>
                <TableCell>#{order.id_key}</TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
                <TableCell>{formatPrice(order.total)}</TableCell>
                <TableCell>
                  <Chip
                    label={statusInfo.label}
                    color={statusInfo.color}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/orders/${order.id_key}`)}
                  >
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderList;