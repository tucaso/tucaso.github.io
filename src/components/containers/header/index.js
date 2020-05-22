import 'rc-drawer-menu/assets/index.css';
import './index.scss';

import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Col } from 'antd';
import Drawer from 'rc-drawer-menu';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Scrollspy from 'react-scrollspy';

import FormAuth from '../../auth/index';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'home',
      open: false
    };
    this.onIconClick = this.onIconClick.bind(this);
    this.onMaskClick = this.onMaskClick.bind(this);
    this.onSwitch = this.onSwitch.bind(this);

    this.menu = React.createRef();
  }
  handleClick = e => {
    this.setState({
      current: e.key
    });
  };
  onMaskClick() {
    this.setState({
      open: false
    });
  }
  onIconClick(bool) {
    this.setState({
      open: !this.state.open
    });
  }
  onSwitch() {
    this.setState({
      open: !this.state.open
    });
  }
  renderMenu() {
    if (this.props.isAuthenticated()) {
      return (
        <Menu theme={'light'} mode={'horizontal'} id="nav" className="nav-header">
          <Menu.Item key="/dashboard">
            <Link to="/dashboard">Tus Procesos</Link>
          </Menu.Item>
          <Menu.Item key="/profile">
            <Link to="/profile">{this.props.userState.fullName || this.props.userState.email}</Link>
          </Menu.Item>
          <Menu.Item key="/logout">
            <Link to="#" onClick={this.props.logout}>
              Salir
            </Link>
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <React.Fragment>
          <nav className="navbar navbar-expand-lg fixed-top custom-nav sticky">
            <div className="container">
              <a className="navbar-brand logo" href="/#home">
                <div className="icon-logo img-fluid" />
                <strong>TU CASO</strong>
              </a>

              <button
                className={`navbar-toggler`}
                type="button"
                data-toggle="collapse"
                data-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="mbri-menu" />
              </button>
              <div className={`collapse navbar-collapse`} id="navbarCollapse" ref={this.menu}>
                <Scrollspy
                  className="navbar-nav ml-auto"
                  items={['home', 'services', 'caracteristicas', 'price', 'stats', 'contact']}
                  currentClassName="active"
                >
                  <li className="nav-item" onClick={() => (this.menu.current.className = 'navbar-collapse collapse')}>
                    <a href="/#home" className="nav-link">
                      Inicio
                    </a>
                  </li>
                  <li className="nav-item" onClick={() => (this.menu.current.className = 'navbar-collapse collapse')}>
                    <a href="/#services" className="nav-link">
                      Servicios
                    </a>
                  </li>
                  <li className="nav-item" onClick={() => (this.menu.current.className = 'navbar-collapse collapse')}>
                    <a href="/#caracteristicas" className="nav-link">
                      Características
                    </a>
                  </li>
                  <li className="nav-item" onClick={() => (this.menu.current.className = 'navbar-collapse collapse')}>
                    <a href="/#price" className="nav-link">
                      Planes
                    </a>
                  </li>
                  <li className="nav-item" onClick={() => (this.menu.current.className = 'navbar-collapse collapse')}>
                    <a href="/#stats" className="nav-link">
                      Estadísticas
                    </a>
                  </li>
                  <li className="nav-item" onClick={() => (this.menu.current.className = 'navbar-collapse collapse')}>
                    <a href="/#contact" className="nav-link">
                      Contáctanos
                    </a>
                  </li>
                </Scrollspy>
              </div>
            </div>
          </nav>
          <section className="section home-bg-img" id="home">
            <div className="bg-overlay" />
            <div className="home-table">
              <div className="home-table-center">
                <div className="container">
                  <div className="row vertical-content">
                    <div className="col-lg-7">
                      <div className="header_content">
                        <h5 className="header_small_title">
                          <span>tucaso.co</span>
                        </h5>
                        <h1 className="header-title text-white mb-0 pt-4">Consulta de procesos automatizada</h1>
                        <p className="header_subtitle pt-4">
                          Actualízate todos los días con tus procesos judiciales, no pierdas un proceso por no estar al
                          tanto de sus actuaciones.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-5 mt-3">
                      <FormAuth />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="scroll_down">
              <a href="/#services" className="scroll">
                <i className="mbri-arrow-down text-white" />
              </a>
            </div>
          </section>
        </React.Fragment>
      );
    }
  }

  renderMobileMenu() {
    if (this.props.isAuthenticated()) {
      return (
        <Menu
          theme={'light'}
          mode={'inline'}
          id="nav"
          style={{ width: 240, height: '200%' }}
          defaultSelectedKeys={[this.props.location.pathname]}
          onClick={() => this.setState({ open: false })}
          className="menu-mobile"
        >
          <Menu.Item key="/home" className="logo">
            <Link to="/" id="logo">
              {' '}
              <i className="icon-logo img-fluid" height="29" />
            </Link>
          </Menu.Item>
          <Menu.Item key="/dashboard">
            <Link to="/dashboard">Procesos</Link>
          </Menu.Item>
          <Menu.Item key="/profile">
            <Link to="/profile">{this.props.userState.fullName || this.props.userState.email}</Link>
          </Menu.Item>
          <Menu.Item key="/logout">
            <Link to="#" onClick={this.props.logout}>
              Salir
            </Link>
          </Menu.Item>
        </Menu>
      );
    }
  }

  render() {
    return (
      <header id="header">
        {this.props.isAuthenticated() && (
          <React.Fragment>
            <Drawer width="240px" open={this.state.open} onIconClick={this.onIconClick} onMaskClick={this.onMaskClick}>
              {this.renderMobileMenu()}
            </Drawer>
            <div className="drawer-button" onClick={this.onSwitch}>
              <i className="drawer-button-icon" />
            </div>
          </React.Fragment>
        )}
        <Col xs={24}>
          <React.Fragment>
            {this.props.isAuthenticated() && (
              <Link to="/" id="logo" className="navbar-brand logo auth">
                <div className="icon-logo img-fluid" />
                <strong>TU CASO</strong>
              </Link>
            )}
            {this.renderMenu()}
          </React.Fragment>
        </Col>
      </header>
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
  )(Header)
);
