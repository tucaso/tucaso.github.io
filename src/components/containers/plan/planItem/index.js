import React, { Component } from 'react';
import { Col, Card, List, Button, notification } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { StarOutlined } from '@ant-design/icons';

import { upgrade, downgrade, subscribe } from '../../../../actions';
import { formatAmount } from '../../../../utils';
import logo from '../../../../images/logo200.png';

import './index.scss';

class PlanItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.subscribe = this.subscribe.bind(this);
    this.downgrade = this.downgrade.bind(this);
    this.upgrade = this.upgrade.bind(this);
  }
  subscribe() {
    if (this.state.loading === false) {
      this.setState({ loading: true });
      this.props
        .subscribe(this.props.plan.id)
        .then(() => {
          this.setState({ loading: false });
          if (this.props.plan.default) {
            return this.props.history.push('/profile');
          } else {
            notification.success({
              message: 'Plan',
              description: 'Tu subscripcion ha sido creada.'
            });
            return this.props.history.push('/payment');
          }
        })
        .catch(() => {
          notification.error({
            message: 'Subscripción',
            description: 'Error cdreando tu subscripción.'
          });
          this.setState({ loading: false });
          return this.props.history.push('/');
        });
    }
  }
  downgrade() {
    // TODO
  }
  upgrade() {
    this.props
      .upgrade(this.props.plan.id)
      .then(() => {
        this.setState({ loading: false });
        notification.success({
          message: 'Plan',
          description: 'Tu plan ha sigo actualizado.'
        });
        return this.props.history.push('/payment');
      })
      .catch(() => {
        notification.error({
          message: 'Upgrade',
          description: 'Error subiendo tu plan.'
        });
        this.setState({ loading: false });
        return this.props.history.push('/profile/subscripcion');
      });
    // TODO
  }
  render() {
    const plan = this.props.plan;
    return (
      <Col xs={24} lg={6} className="plan-item">
        <Card>
          <h1>
            {' '}
            <img alt={plan.description} src={logo} /> {plan.name}
          </h1>
          {plan.value !== null ? (
            <strong className="price">{formatAmount(plan.value, 0, '')}</strong>
          ) : (
            <strong className="price">Te llamamos</strong>
          )}
          <List
            size="small"
            dataSource={plan.features}
            renderItem={item => (
              <List.Item>
                <StarOutlined />
                {item.label}
              </List.Item>
            )}
          />
          {this.props.current !== true ? (
            this.props.canDowngrade === true ? (
              // <Button type="primary" size="large" onClick={this.downgrade} loading={this.state.loading}>
              //   {' '}
              //   Bajar a plan
              // </Button>
              <span />
            ) : this.props.canUpgrade === true ? (
              <Button
                className="upgrade"
                type="primary"
                size="large"
                onClick={this.upgrade}
                loading={this.state.loading}
              >
                {' '}
                Subir a Plan
              </Button>
            ) : (
              <Button type="primary" size="large" onClick={this.subscribe} loading={this.state.loading}>
                {' '}
                Seleccionar
              </Button>
            )
          ) : (
            ''
          )}
        </Card>
      </Col>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      subscribe,
      upgrade,
      downgrade
    },
    dispatch
  );
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(PlanItem)
);
