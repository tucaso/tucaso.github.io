import actions from '../actions/payments-actions';

const getInitialState = () => {
  return [];
};

const PaymentsReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case actions.GET_PAYMENTS:
      let payments = action.payload.docs.slice();
      for (let i in payments) {
        payments[i].key = payments[i].id;
      }
      return {
        ...action.payload,
        docs: payments
      };
    default:
      return state;
  }
};

export default PaymentsReducer;
