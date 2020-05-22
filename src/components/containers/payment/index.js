import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Tabs, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import { WalletOutlined } from '@ant-design/icons';

import { requirePayment } from '../../../constants';
import { formatAmount } from '../../../utils';
import Button300 from './epayco-buttons/button-300';
import Button450 from './epayco-buttons/button-450';

import './index.scss';
const TabPane = Tabs.TabPane;

class Payment extends Component {
  componentDidMount() {
    if (this.props.userState.subscriptionId === null) {
      this.render = () => {
        return false;
      };
      notification.error({
        message: 'Plan',
        description: 'Debes seleccionar un plan.'
      });
      return this.props.history.push('/plan');
    }
    if (!requirePayment(this.props.userState.Subscription.status)) {
      return this.props.history.push('/profile');
    }
  }

  render() {
    const subscription = this.props.userState.Subscription;

    let epayco = <span />;
    if (subscription.Plan.value === 300000) {
      epayco = <Button300 description={`Subscripción ${subscription.Plan.name}`} />;
    } else if (subscription.Plan.value === 450000) {
      epayco = <Button450 description={`Subscripción ${subscription.Plan.name}`} />;
    }

    return (
      <Row className="payment">
        <Col>
          <h1>
            Hola {this.props.userState.fullName}, Solo falta que pagues tu subscripción {subscription.Plan.name}
          </h1>
          <h1>
            Total a pagar <span className="price">{formatAmount(subscription.Plan.value, 0, '')}</span>
          </h1>
          <h2>Opciones de Pago</h2>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <WalletOutlined />
                  Epayco
                </span>
              }
              key="1"
            >
              {epayco}
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps({ userState }) {
  return { userState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Payment)
);
