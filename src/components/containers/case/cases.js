import React, { Component } from 'react';
import { Tabs } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCases, toggleCase } from '../../../actions';
import CasesTable from './casesTable';

import './cases.scss';
const TabPane = Tabs.TabPane;

class CasesTian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  render() {
    return (
      <div className="cases">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Procesos activos" key="1">
            <CasesTable
              getCases={this.props.getCases}
              casesState={this.props.casesState}
              active={true}
              toggleCase={this.props.toggleCase}
              caseLabel="activos"
              limitCases={this.props.userState.Subscription.Plan.limitCases}
            />
          </TabPane>
          <TabPane tab="Procesos archivados" key="2">
            <CasesTable
              getCases={this.props.getCases}
              casesState={this.props.InactiveCasesState}
              active={false}
              toggleCase={this.props.toggleCase}
              caseLabel="archivados"
              limitCases={this.props.userState.Subscription.Plan.limitCases}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps({ authState, casesState, InactiveCasesState, userState }) {
  return { authState, casesState, InactiveCasesState, userState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCases,
      toggleCase
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CasesTian));
