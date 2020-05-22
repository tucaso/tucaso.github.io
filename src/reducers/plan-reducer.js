import actions from '../actions/plan-actions';

const getInitialState = () => {
  return [];
};

const PlansReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case actions.GET_PLANS:
      let plans = action.payload.plans;
      for (let i in plans) {
        plans[i].key = plans[i].id;
      }
      return plans;
    default:
      return state;
  }
};

export default PlansReducer;
