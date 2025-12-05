import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography,
  Chip
} from '@mui/material';
import { ORDER_STATUS } from '../../utils/constants';

const OrderStatus = ({ status }) => {
  const steps = [
    { label: 'Pendiente', value: 1 },
    { label: 'En progreso', value: 2 },
    { label: 'Entregado', value: 3 }
  ];

  const activeStep = steps.findIndex(step => step.value === status);
  const isCanceled = status === 4;

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Estado del pedido
      </Typography>

      {isCanceled ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Chip label="PEDIDO CANCELADO" color="error" size="large" />
        </Box>
      ) : (
        <Stepper activeStep={activeStep} sx={{ mt: 3 }}>
          {steps.map((step) => (
            <Step key={step.value}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
    </Paper>
  );
};

export default OrderStatus;