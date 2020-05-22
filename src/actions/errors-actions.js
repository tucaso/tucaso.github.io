export function reportError(error) {
  return (dispatch, getState, axios) => {
    return axios({
      method: 'POST',
      url: '/errors',
      data: { error: error.stack }
    })
      .then(() => {
        return Promise.resolve();
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}
