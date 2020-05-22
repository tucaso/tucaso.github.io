import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './index.scss';

class Footer extends Component {
  render() {
    return (
      <footer className="dark">
        <Row className="bottom-bar">
          <Col sm={24} lg={24}>
            Tucaso.co © 2018{' '}
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
