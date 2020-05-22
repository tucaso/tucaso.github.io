export const PAYMENT_SUCCESS = 'success';
export const PAYMENT_FAILURE = 'failure';
export const PAYMENT_REJECTED = 'rejected';
export const PAYMENT_CANCELLED = 'cancelled';
export const PAYMENT_WAITING_APPROVE = 'waiting_approve';
export const PAYMENT_PROCESSING = 'processing';
export const PAYMENT_EXPIRED = 'expired';

export function getPaymentStatus(status) {
  switch (status) {
    case PAYMENT_SUCCESS:
      return 'Aprobado';
    case PAYMENT_FAILURE:
      return 'Fallido';
    case PAYMENT_CANCELLED:
      return 'Cancelado';
    case PAYMENT_REJECTED:
      return 'Rechazado';
    case PAYMENT_WAITING_APPROVE:
      return 'Pendiente Aprobación';
    case PAYMENT_EXPIRED:
      return 'Vencido';
    case PAYMENT_PROCESSING:
      return 'Procesando';
    default:
      return 'Falido';
  }
}
