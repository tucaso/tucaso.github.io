import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUserWithGoogle } from '../../../actions';
import * as URLSearchParams from 'url-search-params';
import { Spin } from 'antd';

class OAuth extends React.Component {
  componentDidMount() {
    const searchParams = new URLSearchParams(this.props.location.search);
    this.props
      .loginUserWithGoogle(searchParams.get('code'))
      .then(() => {
        if (!this.props.userState.subscriptionId) {
          return this.props.history.push('/plan');
        }
        this.props.history.push('/');
      })
      .catch(err => {
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <div className="oauth spining-load">
        <Spin />
      </div>
    );
  }
}

function mapStateToProps({ authState, userState }) {
  return { authState, userState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loginUserWithGoogle
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OAuth));
