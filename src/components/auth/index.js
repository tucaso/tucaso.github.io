import React from 'react';
import { Component } from 'react';

import Login from './login';
import Signup from './signup';
import GoogleOauthButton from '../google-oauth-button';

import './index.scss';

class FormAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    };
  }

  toggleLogin() {
    this.setState({ login: !this.state.login });
  }

  render() {
    return (
      <div>
        <div className="mx-auto bg-trial-form rounded p-4">
          <h5 className="text-center text-white font-weight-bold">Planes desde $0 pesos</h5>
          <p className="text-muted text-center mb-4">Planes y servicios que se adaptan a sus necesidades.</p>
          {!this.state.login && <Signup />}
          {this.state.login && <Login />}
        </div>
        <div className="mx-auto bg-trial-form rounded p-4 mt-0">
          <button className="btn btn-no-fill-custom w-100 btn-rounded" onClick={() => this.toggleLogin()}>
            {this.state.login ? 'Crear Cuenta' : 'Ingrese aquí'}
          </button>
          <GoogleOauthButton
            className="btn btn-custom w-100 mt-3 btn-rounded"
            buttonText={'Ingresar con Google'}
            icon="icon-google"
            useAntd={false}
          />
        </div>
      </div>
    );
  }
}

export default FormAuth;
