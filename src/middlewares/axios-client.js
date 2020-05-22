/* eslint no-restricted-globals: ["off", "location"] */
import axios from 'axios';
import { getApiUrl } from '../constants';
import { persistor } from '../configure-store';
export function createThunkMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      const jwt = localStorage.getItem('jwt');
      const axiosClient = axios.create({
        baseURL: getApiUrl(),
        responseType: 'json'
      });
      axiosClient.interceptors.request.use(
        function(config) {
          if (jwt) {
            config.headers = Object.assign({}, config.headers, { Authorization: `Bearer ${jwt}` });
          }
          return config;
        },
        function(error) {
          return Promise.reject(error);
        }
      );
      axiosClient.interceptors.response.use(
        function(response) {
          return response;
        },
        function(error) {
          let response = error.response;
          if (response && response.status === 401 && jwt) {
            persistor.purge();
            localStorage.removeItem('jwt');
            location.replace('/');
          }
          return Promise.reject(response && response.data ? response.data : error);
        }
      );
      return action(dispatch, getState, axiosClient);
    }
    return next(action);
  };
}

const thunkWithAxiosMiddleware = createThunkMiddleware();

export default thunkWithAxiosMiddleware;
