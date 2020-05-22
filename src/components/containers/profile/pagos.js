import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table } from 'antd';
import { paymentsColumns } from './configs';
import { getPayments } from '../../../actions/payments-actions';

import './pagos.scss';

class Pagos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      page: 1
    };
    this.onPaginationChange = this.onPaginationChange.bind(this);
  }
  componentDidMount() {
    this.props.getPayments({
      page: this.state.page,
      limit: this.state.limit
    });
  }
  onPaginationChange(page) {
    this.setState({ page });
    this.props.getPayments({
      page,
      limit: this.state.pages,
      active: this.props.active
    });
  }
  render() {
    return (
      <Table
        columns={paymentsColumns}
        pagination={{
          pageSize: this.props.paymentsState.limit,
          total: this.props.paymentsState.total,
          onChange: this.onPaginationChange
        }}
        dataSource={this.props.paymentsState.docs}
        scroll={{ x: 750 }}
        locale={{ emptyText: 'No tienes pagos' }}
      />
    );
  }
}

function mapStateToProps({ userState, paymentsState }) {
  return { userState, paymentsState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPayments
    },
    dispatch
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Pagos)
);
