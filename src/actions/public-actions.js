const actions = {
  GET_PUBLIC_STATS: 'GET_PUBLIC_STATS',
  POST_CONTACT_US: 'POST_CONTACT_US',
  POST_CONTACT_US_ERROR: 'POST_CONTACT_US_ERROR'
};

export function getPublicStats() {
  return (dispatch, getState, axios) => {
    return axios({
      method: 'GET',
      url: '/stats/public'
    })
      .then(response => {
        return Promise.resolve(
          dispatch({
            type: actions.GET_PUBLIC_STATS,
            payload: response.data
          })
        );
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}

export function postContactUs(params) {
  return (dispatch, getState, axios) => {
    return axios
      .post('/public/contactus', params)
      .then(() => {
        return Promise.resolve(dispatch({ type: actions.POST_CONTACT_US }));
      })
      .catch(err => {
        dispatch({ type: actions.POST_CONTACT_US_ERROR });
        return Promise.reject(err);
      });
  };
}

export default actions;
