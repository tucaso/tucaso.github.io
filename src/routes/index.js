import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../components/containers/header';
import Footer from '../components/containers/footer';
import Dashboard from '../components/containers/dashboard';
import ShowCase from '../components/containers/case/showCase';
import Profile from '../components/containers/profile';
import Plan from '../components/containers/plan';
import Payment from '../components/containers/payment';
import Landing from '../components/containers/landing';
import ContactUs from '../components/containers/contact-us';
import OAuth from '../components/containers/auth/oauth';
import Loader from '../components/loader';

import PrivateRoute from '../components/privateRoute';
import NoMatch from '../components/404';
import { Row, Col } from 'antd';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  isAuthenticated() {
    return localStorage.getItem('jwt') !== null;
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    } else {
      return (
        <Router>
          <div className="site-wrapper">
            <Header isAuthenticated={this.isAuthenticated} logout={this.logout} />
            <div className="main-wrapper">
              <Row type="flex" justify="center">
                <Col sm={18} lg={18} xs={23}>
                  <Switch>
                    <Route path="/" exact render={props => <Landing isAuthenticated={this.isAuthenticated} />} />
                    <PrivateRoute path="/dashboard" component={Dashboard} isAuthenticated={this.isAuthenticated} />
                    <PrivateRoute path="/case/:id" component={ShowCase} isAuthenticated={this.isAuthenticated} />
                    <PrivateRoute path="/profile/:active" component={Profile} isAuthenticated={this.isAuthenticated} />
                    <PrivateRoute path="/profile" component={Profile} isAuthenticated={this.isAuthenticated} />
                    <PrivateRoute path="/plan" component={Plan} isAuthenticated={this.isAuthenticated} />
                    <PrivateRoute path="/payment" component={Payment} isAuthenticated={this.isAuthenticated} />
                    <PrivateRoute
                      path="/contact-us"
                      component={ContactUs}
                      isAuthenticated={this.isAuthenticated}
                      user={this.state.user}
                    />
                    <Route path="/redirect" component={OAuth} />
                    <Route component={NoMatch} />
                  </Switch>
                </Col>
              </Row>
            </div>
            <Footer />
            <a href="#" className="back_top" style={{ display: 'inline' }}>
              {' '}
              <i className="mbri-arrow-up"> </i>{' '}
            </a>
          </div>
        </Router>
      );
    }
  }
}

export default Routes;
