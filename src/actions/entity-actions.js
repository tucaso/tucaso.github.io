const actions = {
  GET_ENTITIES: 'GET_ENTITIES',
  REMOVE_ENTITIES: 'REMOVE_ENTITIES'
};

export function getEntities(city) {
  return (dispatch, getState, axios) => {
    return axios({
      method: 'GET',
      url: '/cities/entities/' + city
    })
      .then(response => {
        return Promise.resolve(
          dispatch({
            type: actions.GET_ENTITIES,
            payload: response.data
          })
        );
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}

export function removeEntities() {
  return (dispatch, getState, axios) => {
    dispatch({
      type: actions.REMOVE_ENTITIES
    });
  };
}

export default actions;
