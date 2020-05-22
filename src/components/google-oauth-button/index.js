import * as React from 'react';
import { Component } from 'react';
import { getApiUrl } from '../../constants';
import { Button } from 'antd';

import './index.scss';
const redirectUrl = `${getApiUrl()}/auth/gmail/authorize`;

export default class GoogleOauthButton extends Component {
  handleClick() {
    window.location.replace(redirectUrl);
  }

  render() {
    if (this.props.useAntd) {
      return (
        <Button
          type={this.props.type}
          size={this.props.size}
          className={`login-google ${this.props.className}`}
          onClick={this.handleClick}
        >
          <span>{this.props.buttonText}</span>
          {this.props.icon && <div className={`icon ${this.props.icon}`} />}
        </Button>
      );
    } else {
      return (
        <button className={`google-login ${this.props.className}`} onClick={this.handleClick}>
          <span>{this.props.buttonText}</span>
          {this.props.icon && <div className={`icon ${this.props.icon}`} />}
        </button>
      );
    }
  }
}
