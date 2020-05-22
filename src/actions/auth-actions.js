import { getCurrentUser } from '../actions';

const actions = {
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE',
  LOGOUT_USER: 'LOGOUT_USER'
};

export function logoutUser() {
  localStorage.removeItem('jwt');
  return {
    type: actions.LOGOUT_USER
  };
}

export function loginUserWithGoogle(code) {
  return getOauthToken(code);
}

export function signUpUserWithEmail(email, password, fullName) {
  return (dispatch, getState, axios) => {
    return axios
      .post('/auth/signup', {
        email: email.toLowerCase(),
        password: password,
        fullName
      })
      .then(response => {
        return dispatch(loginUserSuccess(response.data.accessToken));
      })
      .then(() => {
        return dispatch(getCurrentUser());
      })
      .catch(data => {
        return Promise.reject(data.error);
      });
  };
}

export function loginUserWithEmail(email, password) {
  return (dispatch, getState, axios) => {
    return axios
      .post('/auth/login', {
        email,
        password
      })
      .then(response => {
        return dispatch(loginUserSuccess(response.data.accessToken));
      })
      .then(() => {
        return dispatch(getCurrentUser());
      })
      .catch(data => {
        return Promise.reject(data.error);
      });
  };
}

function getOauthToken(code) {
  return (dispatch, getState, axios) => {
    return axios
      .post('/auth/token', {
        code: code
      })
      .then(response => {
        return dispatch(loginUserSuccess(response.data.token));
      })
      .then(() => {
        return Promise.resolve(dispatch(getCurrentUser()));
      })
      .catch(data => {
        dispatch(loginUserFailure(data.error));
        return Promise.reject(data.error);
      });
  };
}

export function loginUserFailure(error) {
  return {
    type: actions.LOGIN_USER_FAILURE,
    payload: error
  };
}

function loginUserSuccess(jwt) {
  localStorage.setItem('jwt', jwt);
  return {
    type: actions.LOGIN_USER_SUCCESS,
    payload: {
      jwt: jwt
    }
  };
}

export default actions;
