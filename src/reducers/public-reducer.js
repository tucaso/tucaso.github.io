import actions from '../actions/public-actions';

const getInitialState = () => {
  return {
    stats: {
      totalCases: 0
    }
  };
};

const PublicReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case actions.GET_PUBLIC_STATS:
      return {
        ...state,
        stats: action.payload
      };
    default:
      return state;
  }
};

export default PublicReducer;
