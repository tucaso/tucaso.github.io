import * as React from 'react';
import { Component } from 'react';
import { Spin } from 'antd';

export default class Loader extends Component {
  render() {
    return (
      <div className="spining-load">
        <Spin />
      </div>
    );
  }
}
