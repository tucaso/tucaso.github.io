import * as ReduxPromise from 'redux-promise';
// import { createLogger } from 'redux-logger';

import axiosClientMiddleware from './axios-client';
// import { NODE_ENV, PRODUCTION } from '../constants';

const middlewares = [ReduxPromise, axiosClientMiddleware];
// if (NODE_ENV !== PRODUCTION) {
// const logger = createLogger({});
// middlewares.push(logger);
// }

export default middlewares;
