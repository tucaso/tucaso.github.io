import actions from '../actions/subscribe-actions';

const getInitialState = () => {
  return [];
};

const SubscribeReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case actions.SUBSCRIBE:
      return action.payload;
    case actions.DOWNGRADE:
      return action.payload;
    case actions.UPGRADE:
      return action.payload;
    default:
      return state;
  }
};

export default SubscribeReducer;
