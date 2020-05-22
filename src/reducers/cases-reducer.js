import actions from '../actions/case-actions';

const getInitialState = () => {
  return {
    cases: []
  };
};

const CasesReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case actions.GET_CASES:
      let cases = action.payload.docs.slice();
      for (let i in cases) {
        cases[i].key = cases[i].id;
      }
      return {
        cases,
        total: action.payload.total,
        page: action.payload.page,
        limit: action.payload.limit
      };
    default:
      return state;
  }
};

export default CasesReducer;
