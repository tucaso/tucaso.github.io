import React, { Component } from 'react';
import './App.scss';

import Routes from './routes';
import { store, persistor } from './configure-store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './components/loader';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
