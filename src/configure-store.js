import { compose, createStore, applyMiddleware } from 'redux';
import rootReducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { NODE_ENV, PRODUCTION } from './constants';
import middlewares from './middlewares';

const persistConfig = {
  key: 'tucaso',
  storage
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

let composeEnhancers = compose;
if (NODE_ENV !== PRODUCTION) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middlewares)));
let persistor = persistStore(store);

export { store, persistor };
