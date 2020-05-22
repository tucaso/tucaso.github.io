import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPlans } from '../../../actions';
import { Row, Col } from 'antd';
import PlanItem from './planItem';
import { withRouter } from 'react-router-dom';

import './index.scss';

class Plan extends Component {
  componentDidMount() {
    this.props.getPlans();
    if (this.props.userState.subscriptionId !== null) {
      return this.props.history.push('/profile');
    }
  }

  render() {
    if (this.props.plans.length === 0) {
      throw new Error('There are not plans');
    }

    return (
      <Row>
        <Col>
          <h1>Hola {this.props.userState.fullName}, Selecciona tu plan</h1>
          <Row gutter={16} type="flex" justify="center" className="plans-wrapper">
            {this.props.plans.map(plan => {
              return <PlanItem plan={plan} key={plan.key} />;
            })}
          </Row>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps({ userState, planState }) {
  return { userState, plans: planState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPlans
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Plan));
