import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PlanItem from '../plan/planItem';
import { getPlans } from '../../../actions';
import * as moment from 'moment';
import { Button, notification, Row } from 'antd';
import {
  getSubscriptionStatus,
  requirePayment,
  SUBSCRIPTION_WAITING_PAYMENT,
  SUBSCRIPTION_WAITING_PAYMENT_APPROVAL,
  SUBSCRIPTION_EXPIRED,
  SUBSCRIPTION_CANCELLED,
  SUBSCRIPTION_PAYMENT_FAILURED,
  SUBSCRIPTION_PAYMENT_REJECTED
} from '../../../constants';

import './subscripcion.scss';

class Subcripcion extends Component {
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
    this.props.getPlans();
  }

  renderStatus() {
    switch (this.props.userState.Subscription.status) {
      case SUBSCRIPTION_WAITING_PAYMENT:
        return (
          <span className="limit">
            <span className="status">{getSubscriptionStatus(this.props.userState.Subscription.status)}</span>
            <Button type="primary" href="/payment">
              Pagar
            </Button>
          </span>
        );
      case SUBSCRIPTION_PAYMENT_REJECTED:
        return (
          <span className="limit">
            {getSubscriptionStatus(this.props.userState.Subscription.status)}
            <Button type="primary" href="/payment">
              Reintentar Pago
            </Button>
          </span>
        );
      case SUBSCRIPTION_EXPIRED:
        return (
          <span className="danger">
            {getSubscriptionStatus(this.props.userState.Subscription.status)}
            <Button type="primary" href="/payment">
              Renovar
            </Button>
          </span>
        );
      case SUBSCRIPTION_CANCELLED:
        return (
          <span className="danger">
            {getSubscriptionStatus(this.props.userState.Subscription.status)}
            <Button type="primary" href="/payment">
              Activar
            </Button>
          </span>
        );
      case SUBSCRIPTION_PAYMENT_FAILURED:
        return (
          <span className="danger">
            <span className="status">{getSubscriptionStatus(this.props.userState.Subscription.status)}</span>
            <Button type="primary" href="/payment">
              Pagar
            </Button>
          </span>
        );
      case SUBSCRIPTION_WAITING_PAYMENT_APPROVAL:
        return <span className="danger">{getSubscriptionStatus(this.props.userState.Subscription.status)}</span>;
      default:
        return <span className="limit">{getSubscriptionStatus(this.props.userState.Subscription.status)} </span>;
    }
  }
  render() {
    return (
      <div className="subcriptions">
        <div className="current-tier">
          Plan actual: {this.props.userState.Subscription.Plan.name}
          <div>
            Limite de Casos: <span className="limit">{this.props.userState.Subscription.Plan.limitCases}</span>
          </div>
          {!requirePayment(this.props.userState.Subscription.status) &&
            this.props.userState.Subscription.Plan.default === false && (
              <div>
                <div>
                  Fecha inicio:{' '}
                  <span className="limit">{moment.utc(this.props.userState.Subscription.startDate).format('LL')}</span>
                </div>
                <div>
                  Fecha terminación:{' '}
                  <span className="limit">{moment.utc(this.props.userState.Subscription.endDate).format('LL')}</span>
                </div>
              </div>
            )}
          <div className="render-status">Estado: {this.renderStatus()}</div>
        </div>

        <Row gutter={16} type="flex" justify="center" className="plans-wrapper">
          {//!requirePayment(this.props.userState.Subscription.status) &&
          this.props.plans.map(plan => {
            if (plan.id === this.props.userState.Subscription.Plan.id) {
              return <PlanItem plan={plan} key={plan.key} current={true} />;
            } else if (plan.value > this.props.userState.Subscription.Plan.value) {
              return <PlanItem plan={plan} key={plan.key} canUpgrade={true} />;
            } else {
              return <PlanItem plan={plan} key={plan.key} canDowngrade={true} />;
            }
          })}
        </Row>
      </div>
    );
  }
}

function mapStateToProps({ userState, stripeState, planState }) {
  return { userState, stripeState, plans: planState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPlans }, dispatch);
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Subcripcion)
);
