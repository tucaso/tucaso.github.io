import actions from '../actions/payment-actions';

const getInitialState = () => {
  return [];
};

const PaymentReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case actions.PAYMENT_CREATE:
      return action.payload;
    default:
      return state;
  }
};

export default PaymentReducer;
