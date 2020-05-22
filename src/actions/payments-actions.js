const actions = {
  GET_PAYMENTS: 'GET_PAYMENTS'
};

export function getPayments(params) {
  return (dispatch, getState, axios) => {
    return axios({
      method: 'GET',
      url: `/payment`,
      params
    })
      .then(response => {
        return Promise.resolve(
          dispatch({
            type: actions.GET_PAYMENTS,
            payload: response.data
          })
        );
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}

export default actions;
