const actions = {
  GET_CASES: 'GET_CASES',
  GET_CASE: 'GET_CASE',
  REMOVE_CASE: 'REMOVE_CASE',
  ADD_CASE: 'ADD_CASE',
  ADD_CASE_ERROR: 'ADD_CASE_ERROR',
  GET_INACTIVE_CASES: 'GET_INACTIVE_CASES',
  TOGGLE_CASE_ERROR: 'TOGGLE_CASE_ERROR'
};

export function getCases(params) {
  return (dispatch, getState, axios) => {
    return axios({
      method: 'GET',
      url: '/cases',
      params
    })
      .then(response => {
        if (params.active) {
          return Promise.resolve(
            dispatch({
              type: actions.GET_CASES,
              payload: response.data
            })
          );
        } else {
          return Promise.resolve(
            dispatch({
              type: actions.GET_INACTIVE_CASES,
              payload: response.data
            })
          );
        }
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}

export function getCase(caseNumber) {
  return (dispatch, getState, axios) => {
    return axios({
      method: 'GET',
      url: '/cases/' + caseNumber
    })
      .then(response => {
        return Promise.resolve(
          dispatch({
            type: actions.GET_CASE,
            payload: response.data
          })
        );
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}

export function addNewCase(params, pagination) {
  return (dispatch, getState, axios) => {
    return axios
      .post('/cases', params)
      .then(() => {
        pagination.active = true;
        return dispatch(getCases(pagination));
      })
      .then(() => {
        pagination.active = false;
        pagination.page = 1;
        return dispatch(getCases(pagination));
      })
      .then(() => {
        return Promise.resolve(dispatch({ type: actions.ADD_CASE }));
      })
      .catch(err => {
        dispatch({ type: actions.ADD_CASE_ERROR });
        return Promise.reject(err);
      });
  };
}

export function removeCase() {
  return (dispatch, getState, axios) => {
    dispatch({
      type: actions.REMOVE_CASE
    });
  };
}

export function toggleCase(caseId, pagination) {
  return (dispatch, getState, axios) => {
    return axios
      .get('/cases/toggleState/' + caseId)
      .then(() => {
        pagination.active = true;
        return dispatch(getCases(pagination));
      })
      .then(() => {
        pagination.active = false;
        pagination.page = 1;
        return dispatch(getCases(pagination));
      })
      .catch(err => {
        dispatch({ type: actions.TOGGLE_CASE_ERROR });
        return Promise.reject(err);
      });
  };
}

export function updateCase(caseNumber, params) {
  return (dispatch, getState, axios) => {
    return axios
      .put('/cases/' + caseNumber, params)
      .then(() => {
        return Promise.resolve(dispatch(getCase(caseNumber)));
      })
      .catch(err => {
        dispatch({ type: actions.ADD_CASE_ERROR });
        return Promise.reject(err);
      });
  };
}

export default actions;
