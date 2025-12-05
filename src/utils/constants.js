export const APP_NAME = "Tech Store - Electrónicos";

export const DELIVERY_METHODS = {
  DRIVE_THRU: { value: 1, label: "Drive-thru" },
  ON_HAND: { value: 2, label: "En mano" },
  HOME_DELIVERY: { value: 3, label: "A domicilio" }
};

export const ORDER_STATUS = {
  PENDING: { value: 1, label: "Pendiente", color: "warning" },
  IN_PROGRESS: { value: 2, label: "En progreso", color: "info" },
  DELIVERED: { value: 3, label: "Entregado", color: "success" },
  CANCELED: { value: 4, label: "Cancelado", color: "error" }
};

export const PAYMENT_TYPES = {
  CASH: { value: "cash", label: "Efectivo" },
  CARD: { value: "card", label: "Tarjeta" }
};