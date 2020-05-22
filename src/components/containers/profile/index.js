import React, { Component } from 'react';
import { Tabs, Card } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPlans, getCurrentUser } from '../../../actions';
import Subscripcion from './subscripcion';
import Pagos from './pagos';
import Notificaciones from './notifications';
import logo from '../../../images/logo200.png';

import './index.scss';

const TabPane = Tabs.TabPane;
const { Meta } = Card;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      default: this.props.match.params.active ? this.props.match.params.active : 'profile'
    };
  }
  componentDidMount() {
    this.props.getPlans();
    this.props.getCurrentUser();
  }

  render() {
    let img = logo;
    try {
      img = JSON.parse(this.props.userState.googleData).image.url.split('?')[0];
    } catch (err) {
      // console.log('There is no google img, using the default one');
    }
    return (
      <Tabs defaultActiveKey={this.state.default} onChange={activeKey => this.setState({ default: activeKey })}>
        <TabPane tab="Perfil" key="profile" className="profile-tab">
          <Card hoverable style={{ width: 240 }} cover={<img alt="perfil" src={img} />}>
            <Meta title={this.props.userState.fullName} description={this.props.userState.email} />
          </Card>
        </TabPane>
        <TabPane tab="Subscripción" key="subscripcion">
          <Subscripcion />
        </TabPane>
        <TabPane tab="Pagos" key="pagos">
          <Pagos />
        </TabPane>
        <TabPane tab="Notificaciones" key="notificaciones">
          <Notificaciones isOn={this.state.default === 'notificaciones'} />
        </TabPane>
      </Tabs>
    );
  }
}

function mapStateToProps({ userState }) {
  return { userState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPlans,
      getCurrentUser
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
