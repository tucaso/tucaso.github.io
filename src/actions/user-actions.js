import * as isEmpty from 'lodash.isempty';

import { logoutUser } from '../actions';

const actions = {
  GET_CURRENT_USER: 'GET_CURRENT_USER',
  UPDATE_CURRENT_USER: 'UPDATE_CURRENT_USER'
};

export function getCurrentUser() {
  return (dispatch, getState, axios) => {
    const hasNoCurrentUser = isEmpty(getState().userState.currentUser) || isEmpty(getState().userState.currentUser.id);
    const isAuthenticated = !isEmpty(getState().authState.jwt);
    if (hasNoCurrentUser && isAuthenticated) {
      return axios({
        method: 'GET',
        url: '/users/me'
      })
        .then(response => {
          return Promise.resolve(
            dispatch({
              type: actions.GET_CURRENT_USER,
              payload: response.data
            })
          );
        })
        .catch(error => {
          dispatch(logoutUser());
          return Promise.reject(error);
        });
    }
    return dispatch(logoutUser());
  };
}

export function updateCurrentUser(data) {
  return (dispatch, getState, axios) => {
    const hasNoCurrentUser = isEmpty(getState().userState.currentUser) || isEmpty(getState().userState.currentUser.id);
    const isAuthenticated = !isEmpty(getState().authState.jwt);
    if (hasNoCurrentUser && isAuthenticated) {
      return axios({
        method: 'PUT',
        url: '/users/me',
        data: { data }
      })
        .then(response => {
          return Promise.resolve(
            dispatch({
              type: actions.UPDATE_CURRENT_USER,
              payload: response.data
            })
          );
        })
        .catch(error => {
          // dispatch(logoutUser());
          return Promise.reject(error);
        });
    }
    return dispatch(logoutUser());
  };
}

export default actions;
