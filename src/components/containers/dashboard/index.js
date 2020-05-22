import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notification } from 'antd';

import AddCase from '../case/addCase';
import Cases from '../case/cases';
import { reportError } from '../../../actions';
import {
  SUBSCRIPTION_WAITING_PAYMENT,
  SUBSCRIPTION_WAITING_PAYMENT_APPROVAL,
  SUBSCRIPTION_EXPIRED,
  SUBSCRIPTION_CANCELLED,
  SUBSCRIPTION_PAYMENT_FAILURED,
  SUBSCRIPTION_PAYMENT_REJECTED
} from '../../../constants';

class Dashboard extends Component {
  componentDidMount() {
    if (this.props.userState.subscriptionId === null) {
      notification.error({
        message: 'Subscripción',
        description: 'Debes tener una subscripción para agregar casos.'
      });
      return this.props.history.push('/plan');
    }
    switch (this.props.userState.Subscription.status) {
      case SUBSCRIPTION_WAITING_PAYMENT_APPROVAL:
        notification.success({
          message: 'Pago',
          description: 'Tu pago esta pendiente de aprobación en poco tiempo te informaremos del estado de tu pago.'
        });
        return this.props.history.push('/profile/subscripcion');
      case SUBSCRIPTION_PAYMENT_REJECTED:
        notification.error({
          message: 'Pago',
          description: 'Tu ha sido rechazado, por favor intenta de nuevo'
        });
        return this.props.history.push('/profile/subscripcion');
      case SUBSCRIPTION_WAITING_PAYMENT:
        notification.error({
          message: 'Pago',
          description: 'Debes completar tu pago para poder agregar casos.'
        });
        return this.props.history.push('/payment');
      case SUBSCRIPTION_EXPIRED:
        notification.error({
          message: 'Subscripción',
          description: 'tu subscripción esta vencida realiza tu pago para activarla de nuevo.'
        });
        return this.props.history.push('/payment');
      case SUBSCRIPTION_CANCELLED:
        notification.error({
          message: 'Subscripción',
          description: 'tu subscripción esta cancelada realiza tu pago para activarla de nuevo.'
        });
        return this.props.history.push('/payment');
      case SUBSCRIPTION_PAYMENT_FAILURED:
        notification.error({
          message: 'Pago',
          description: 'Tu ha fallado por favor trata con otro medio de pago.'
        });
        return this.props.history.push('/payment');
      default:
        break;
    }
  }
  render() {
    return (
      <div>
        <AddCase />
        <Cases />
      </div>
    );
  }
}
function mapStateToProps({ userState }) {
  return { userState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      reportError
    },
    dispatch
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
