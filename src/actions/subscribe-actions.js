import { getCurrentUser } from '../actions';

const actions = {
  SUBSCRIBE: 'SUBSCRIBE',
  UPGRADE: 'UPGRADE',
  DOWNGRADE: 'DOWNGRADE'
};

export function subscribe(planId) {
  return (dispatch, getState, axios) => {
    return axios({
      method: 'POST',
      url: '/subscription',
      data: { planId }
    })
      .then(response => {
        return Promise.resolve(
          dispatch({
            type: actions.SUBSCRIBE,
            payload: response.data
          })
        );
      })
      .then(() => {
        return Promise.resolve(dispatch(getCurrentUser()));
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}

export function upgrade(planId) {
  return (dispatch, getState, axios) => {
    return axios({
      method: 'POST',
      url: '/subscription/upgrade',
      data: { planId }
    })
      .then(response => {
        return Promise.resolve(
          dispatch({
            type: actions.UPGRADE,
            payload: response.data
          })
        );
      })
      .then(() => {
        return Promise.resolve(dispatch(getCurrentUser()));
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}

export function downgrade(planId) {
  return (dispatch, getState, axios) => {
    return axios({
      method: 'POST',
      url: '/subscription/downgrade',
      data: { planId }
    })
      .then(response => {
        return Promise.resolve(
          dispatch({
            type: actions.DOWNGRADE,
            payload: response.data
          })
        );
      })
      .then(() => {
        return Promise.resolve(dispatch(getCurrentUser()));
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}

export default actions;
