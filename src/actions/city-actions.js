const actions = {
  GET_CITIES: 'GET_CITIES'
};

export function getCities() {
  return (dispatch, getState, axios) => {
    return axios({
      method: 'GET',
      url: '/cities'
    })
      .then(response => {
        return Promise.resolve(
          dispatch({
            type: actions.GET_CITIES,
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
