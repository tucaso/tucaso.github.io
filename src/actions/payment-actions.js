import { getCurrentUser } from '../actions';

const actions = {
  CREATE_PAYMENT: 'CREATE_PAYMENT',
  GET_PAYMENT: 'GET_PAYMENT',
  UPLOAD_IMAGE: 'UPLOAD_IMAGE'
};

export function getPayment(paymentId) {
  return (dispatch, getState, axios) => {
    return axios({
      method: 'GET',
      url: `/payment/${paymentId}`
    })
      .then(response => {
        return Promise.resolve(
          dispatch({
            type: actions.GET_PAYMENT,
            payload: response.data
          })
        );
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}

export function createPaymentWithImage(paymentData, imageData) {
  return (dispatch, getState, axios) => {
    return axios({
      method: 'POST',
      url: '/payment/transfersupport',
      data: imageData
    })
      .then(response => {
        paymentData.imageUrl = response.data.url;
        dispatch(createPaymentTransaction(paymentData));
        return response;
      })
      .then(response => {
        return Promise.resolve(
          dispatch({
            type: actions.UPLOAD_IMAGE,
            payload: response.data
          })
        );
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}

export function createPaymentTransaction(paymentData) {
  return (dispatch, getState, axios) => {
    return axios({
      method: 'POST',
      url: '/payment/transaction',
      data: paymentData
    })
      .then(response => {
        return Promise.resolve(dispatch(paymentSuccess(response.data)));
      })
      .then(() => {
        return Promise.resolve(dispatch(getCurrentUser()));
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}

export function createPaymentStripe(paymentData) {
  return (dispatch, getState, axios) => {
    return axios({
      method: 'POST',
      url: '/payment/stripe',
      data: paymentData
    })
      .then(response => {
        return Promise.resolve(dispatch(paymentSuccess(response.data)));
      })
      .then(() => {
        return Promise.resolve(dispatch(getCurrentUser()));
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
}

function paymentSuccess(data) {
  return {
    type: actions.CREATE_PAYMENT,
    payload: data
  };
}

export default actions;
