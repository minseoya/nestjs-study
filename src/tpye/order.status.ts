export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'COMPLETED_PAYMENT'
  | 'DELIVERING'
  | 'DELIVERY_COMPLETED';

export const OrderStatusValues: Record<OrderStatus, number> = {
  PENDING_PAYMENT: 1,
  COMPLETED_PAYMENT: 2,
  DELIVERING: 3,
  DELIVERY_COMPLETED: 4,
};
