import actions from '../actions/stripe-actions';

const getInitialState = () => {
  return {
    stripe: {}
  };
};

const StripeReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case actions.GET_PLANS:
      return {
        stripe: action.payload.products
      };
    default:
      return state;
  }
};

export default StripeReducer;
