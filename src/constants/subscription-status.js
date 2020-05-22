export const SUBSCRIPTION_FREE = 'subscription_free';
export const SUBSCRIPTION_ACTIVE = 'subscription_active';
export const SUBSCRIPTION_CANCELLED = 'subscription_cancelled';
export const SUBSCRIPTION_WAITING_PAYMENT = 'subscription_waiting_payment';
export const SUBSCRIPTION_WAITING_PAYMENT_APPROVAL = 'subscription_waiting_payment_approval';
export const SUBSCRIPTION_PAYMENT_FAILURED = 'subscription_payment_failure';
export const SUBSCRIPTION_PAYMENT_REJECTED = 'subscription_payment_rejected';
export const SUBSCRIPTION_EXPIRED = 'subscription_expired';

export function getSubscriptionStatus(status) {
  switch (status) {
    case SUBSCRIPTION_FREE:
      return 'Gratis';
    case SUBSCRIPTION_ACTIVE:
      return 'Activo';
    case SUBSCRIPTION_CANCELLED:
      return 'Cancelada';
    case SUBSCRIPTION_WAITING_PAYMENT:
      return 'Pendiente de pago';
    case SUBSCRIPTION_WAITING_PAYMENT_APPROVAL:
      return 'Pago pendiente de Aprobación';
    case SUBSCRIPTION_PAYMENT_FAILURED:
      return 'Pago Fallido';
    case SUBSCRIPTION_PAYMENT_REJECTED:
      return 'Pago Rechazado';
    case SUBSCRIPTION_EXPIRED:
      return 'Vencida';
    default:
      return 'Gratis';
  }
}

export function requirePayment(status) {
  const requirePayment = [
    SUBSCRIPTION_WAITING_PAYMENT,
    SUBSCRIPTION_WAITING_PAYMENT_APPROVAL,
    SUBSCRIPTION_PAYMENT_FAILURED,
    SUBSCRIPTION_EXPIRED,
    SUBSCRIPTION_PAYMENT_REJECTED
  ];

  if (requirePayment.includes(status)) return true;
  return false;
}
