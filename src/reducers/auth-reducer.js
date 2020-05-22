import actions from '../actions/auth-actions';

function getInitialState() {
  return {
    jwt: ''
  };
}

const AuthReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case actions.LOGIN_USER_FAILURE:
      return getInitialState();
    case actions.LOGOUT_USER:
      return getInitialState();
    case actions.LOGIN_USER_SUCCESS:
      return {
        ...state,
        jwt: action.payload.jwt
      };
    default:
      return state;
  }
};

export default AuthReducer;
