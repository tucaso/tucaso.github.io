const actions = {
  GET_PLANS: 'GET_PLANS'
};

// export function getPlans(city) {
//   return (dispatch, getState, axios) => {
//     return axios({
//       method: 'GET',
//       url: '/stripe/plans'
//     })
//       .then(response => {
//         return Promise.resolve(
//           dispatch({
//             type: actions.GET_PLANS,
//             payload: response.data
//           })
//         );
//       })
//       .catch(err => {
//         return Promise.reject(err);
//       });
//   };
// }

export default actions;
