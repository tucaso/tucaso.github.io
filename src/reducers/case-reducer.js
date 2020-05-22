import actions from '../actions/case-actions';

const getInitialState = () => {
  return {
    case: {}
  };
};

const CaseReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case actions.GET_CASE:
      const reverseActuations = action.payload.Actuacions.slice(1).reverse();
      action.payload.Actuacions = [action.payload.Actuacions[0]].concat(reverseActuations);
      if (action.payload.Actuacions.length === 1 && action.payload.Actuacions[0] === undefined) {
        action.payload.Actuacions = [];
      }
      return action.payload;
    case actions.REMOVE_CASE:
      return getInitialState();
    default:
      return state;
  }
};

export default CaseReducer;
