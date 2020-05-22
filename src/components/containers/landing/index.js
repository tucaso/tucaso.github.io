import React, { Component } from 'react';
import { Col, Card, List, Input } from 'antd';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SmileOutlined } from '@ant-design/icons';

import GoogleOauthButton from '../../google-oauth-button';
import { getPlans, getPublicStats } from '../../../actions';
import { formatAmount } from '../../../utils';

import ContactUs from './contactUs';

import logo from '../../../images/logo200.png';

import './index.scss';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calcCases: '0',
      howMuchToCharge: 0
    };
    this.doMath = this.doMath.bind(this);
  }

  componentDidMount() {
    this.props.getPlans();
    this.props.getPublicStats();
    if (this.props.isAuthenticated()) {
      this.props.history.push('dashboard');
    }
  }
  renderPlan(plan) {
    return (
      <Col span={6} className="price-card mt-15" key={plan.key}>
        <Card cover={<img alt={plan.description} src={logo} />}>
          <h1>{plan.name}</h1>
          {plan.value !== null ? (
            <strong className="price">{formatAmount(plan.value, 0, '')}</strong>
          ) : (
            <strong className="price">Te llamamos</strong>
          )}
          <List
            size="small"
            dataSource={plan.features}
            renderItem={item => {
              return (
                <List.Item>
                  <SmileOutlined />
                  {item.label}
                </List.Item>
              );
            }}
          />
          <GoogleOauthButton buttonText={'Empezar'} type="primary" planId={plan.id} size="large" useAntd={true} />
        </Card>
      </Col>
    );
  }

  doMath(value) {
    this.setState({ calcCases: value });
    if (parseInt(value, 10) < 0 || value === '-0') {
      this.setState({ calcCases: '0' });
      return;
    }
    const plan = this.props.plans.filter(p => {
      return p.limitCases >= parseInt(value, 10);
    });
    if (value !== '0' && value !== '' && parseInt(value, 10) > 3 && plan.length > 1) {
      this.setState({ howMuchToCharge: plan[0].value });
    } else {
      this.setState({ howMuchToCharge: parseInt(value, 10) > 20 ? 'Contáctanos' : 0 });
    }
  }

  render() {
    return (
      <div className="home-wrapper">
        <section className="section" id="services">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <h2 className="mb-0 text-capitalize">
                    Los mejores <span className="font-weight-bold">Servicios</span>
                  </h2>
                  <div className="main-title-border">
                    <i className="mdi mdi-atom" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row pt-4">
              <div className="col-lg-4">
                <div className="lan_box_ser text-center p-4 mt-3">
                  <div className="ser_icon">
                    <i className="mbri-database text-danger bg-danger-opacity" />
                  </div>
                  <div className="service-content mt-4">
                    <h5>Suscripción Flexible</h5>
                    <p className="mt-3 text-muted mb-0">
                      Planes personalízales y tarifas amigables, sin cláusulas de permanencia adaptadas a sus
                      necesidades de vigilancia judicial.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="lan_box_ser text-center p-4 mt-3">
                  <div className="ser_icon">
                    <i className="mbri-website-theme text-green bg-green-opacity" />
                  </div>
                  <div className="service-content mt-4">
                    <h5>Seguridad y Confianza</h5>
                    <p className="mt-3 text-muted mb-0">
                      Seguridad del 99,98 % con procesos de auditoría diarios sobre la información y control informático
                      de rastreo de sus notificaciones.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="lan_box_ser text-center p-4 mt-3">
                  <div className="ser_icon">
                    <i className="mbri-growing-chart text-blue bg-blue-opacity" />
                  </div>
                  <div className="service-content mt-4">
                    <h5>Estándares de Calidad</h5>
                    <p className="mt-3 text-muted mb-0">
                      Soporte personalizado mediante los canales de atención al cliente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section" id="caracteristicas">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <h2 className="mb-0 text-capitalize">
                    Nuestras <span className="font-weight-bold">Características</span>
                  </h2>
                  <div className="main-title-border">
                    <i className="mdi mdi-atom" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4 pt-4 vertical-content">
              <div className="col-lg-6">
                <div className="mt-3 features-1" />
              </div>
              <div className="col-lg-6">
                <div className="lan_features_box mt-3">
                  <div className="lan_features_content mt-4">
                    <h3 className="font-weight-bold">La solución perfecta para pequeñas y grandes empresas</h3>
                    <p className="text-muted lan_features_subtitle mt-3">
                      Tendrás notificaciones de cualquier cambio en tus casos, ya no perderás tiempo revisando todos los
                      días.
                    </p>
                    <p className="mb-0 text-muted">
                      <i className="mdi mdi-radiobox-marked text-custom" /> Perfecto para menos de 5 empleados.
                    </p>
                    <p className="mb-0 text-muted">
                      <i className="mdi mdi-radiobox-marked text-custom" /> Perfecto de 6 a 30 empleados.
                    </p>
                    <p className="mb-0 text-muted">
                      <i className="mdi mdi-radiobox-marked text-custom" /> Perfecto para mas de 30 empleados.
                    </p>
                    <div className="mt-4">
                      <a href="/#home" className="btn btn-custom">
                        Comenzar
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4 pt-4 vertical-content">
              <div className="col-lg-6">
                <div className="lan_features_box mt-3">
                  <div className="lan_features_content mt-4">
                    <h3 className="font-weight-bold">Cobertura Nacional</h3>
                    <p className="text-muted lan_features_subtitle mt-3">
                      Solo ingresa tus casos una sola vez y obtén notificaciones de estos cada día que tengan
                      actuaciones nuevas.
                    </p>
                    <p className="mb-0 text-muted">
                      <i className="mdi mdi-radiobox-marked text-custom" /> Rama judicial
                    </p>
                    <p className="mb-0 text-muted">
                      <i className="mdi mdi-radiobox-marked text-custom" /> Notificaciones judiciales.
                    </p>
                    <p className="mb-0 text-muted">
                      <i className="mdi mdi-radiobox-marked text-custom" /> Sin cláusula de permanencia.
                    </p>
                    <div className="mt-4">
                      <a href="/#home" className="btn btn-custom">
                        Comenzar
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mt-3 features-2" />
              </div>
            </div>
          </div>
        </section>
        <section className="section calculator" id="price">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <h2 className="mb-0 text-capitalize">
                    Nuestros <span className="font-weight-bold">Planes</span>
                  </h2>
                  <div className="sub-header">Calcule sus costos mensuales</div>
                  <div className="main-title-border">
                    <i className="mdi mdi-atom" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4 pt-4">
              <div className="col-lg-4">
                <div className="mt-3 bg-white price_border_box">
                  <div className="mb-2">
                    Los procesos de Tucaso.co se venden en bloques. Al final de cada ciclo de facturación, los bloques
                    de crédito no utilizados caducan. Su precio depende de la cantidad de procesos que compre al
                    comienzo de un mes. Y como construimos descuentos en nuestra estructura de pago, su precio por
                    correo electrónico disminuye a medida que envía más correos electrónicos.
                  </div>
                  <div className="mb-2">
                    Estos cambios de precios tendrán efecto cuando conecte su cuenta de Tucaso.co con una cuenta de pago
                    mensual.
                  </div>
                  <div className="font-weight-bold mb-2">Example volumes:</div>
                  <div className="mb-2 price-example" onClick={() => this.doMath(20)}>
                    20 procesos / mes
                  </div>
                  <div className="mb-2 price-example" onClick={() => this.doMath(50)}>
                    50 procesos / mes
                  </div>
                  <div className="mb-2 price-example" onClick={() => this.doMath(100)}>
                    100 procesos / mes
                  </div>
                  <div className="mb-2 price-example" onClick={() => this.doMath(150)}>
                    150 procesos / mes
                  </div>
                  <div className="mb-2 price-example" onClick={() => this.doMath(200)}>
                    200 procesos / mes
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="mt-3 bg-white text-center price_border_box active position-relative">
                  <div className="lable mx-auto">
                    <h6 className="best mb-0 text-capitalize">El mejor plan para ti</h6>
                  </div>
                  <div className="price-name">
                    <h5 className="text-muted mb-0">Calcule sus costos mensuales</h5>
                  </div>
                  <div className="lan-price mt-4 calc-input border-bottom">
                    <h4 className="input-desc">
                      Ingrese su estimado
                      <div>
                        <sup className="sub">procesos por mes</sup>
                      </div>
                    </h4>
                    <Input
                      type="number"
                      id="cases-calc"
                      className="form-control trial-input"
                      placeholder="50"
                      value={this.state.calcCases}
                      onChange={e => this.doMath(e.target.value)}
                    />
                  </div>
                  <div className="lan_price_feat border-bottom">
                    {this.state.calcCases === '0' || this.state.calcCases === '' ? (
                      this.props.plans.map((plan, i) => {
                        return (
                          <div key={plan.id} className="cases-price-desc mt-2">
                            <div className="number-cases">
                              <div className="cases">{plan.limitCases}</div>{' '}
                              <span className="font-weight-bold text-dark">Procesos</span>
                            </div>
                            <div className="each-case-price">
                              {plan.value === 0 || plan.value === null
                                ? plan.value === 0
                                  ? '$0 / Proceso'
                                  : 'Contáctanos'
                                : `${formatAmount(plan.value / plan.limitCases)} / Proceso`}
                            </div>
                            <div className="cases-price">
                              {plan.value === 0 && 'Gratis'}
                              {plan.value === null && 'Contáctanos'}
                              {plan.value !== 0 && plan.value !== null && formatAmount(plan.value)}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="cases-price-desc mt-2">
                        <div className="number-cases">
                          <div className="cases">{parseInt(this.state.calcCases, 10)} </div>
                          <span className="font-weight-bold text-dark">Procesos</span>
                        </div>
                        <div className="each-case-price">
                          {typeof this.state.howMuchToCharge === 'string'
                            ? this.state.howMuchToCharge
                            : `${formatAmount(
                                this.state.howMuchToCharge / parseInt(this.state.calcCases, 10)
                              )} / Proceso`}
                        </div>
                        <div className="cases-price">{formatAmount(this.state.howMuchToCharge)}</div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <a href="#" className="btn btn-custom">
                      Comenzar
                    </a>
                  </div>
                </div>
                <div className="mt-4 pl-3 pr-3">
                  Nuestra base de conocimientos incluye proceso diario de procesos, disminuye los costos de tu
                  organización y aumenta la productividad.
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section bg-funfact" id="stats">
          <div className="bg-overlay" />
          <div className="container">
            <div className="row" id="counter">
              <div className="col-lg-3">
                <div className="text-center lan_funfact p-4 mt-3 rounded text-white">
                  <div className="lan_fun_icon mb-3">
                    <i className="mbri-timer h1" />
                  </div>
                  <h1 className="lan_fun_value mb-1 text-white" data-count={this.props.public.stats.totalCases}>
                    {this.props.public.stats.totalCases} +
                  </h1>
                  <p className="lan_fun_name mb-0">Casos en nuestro sistema</p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="text-center lan_funfact p-4 mt-3 rounded text-white">
                  <div className="lan_fun_icon mb-3">
                    <i className="mbri-gift h1" />
                  </div>
                  <h1 className="lan_fun_value mb-1 text-white" data-count="500">
                    500 +
                  </h1>
                  <p className="lan_fun_name mb-0">El mes anterior notificamos</p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="text-center lan_funfact p-4 mt-3 rounded text-white">
                  <div className="lan_fun_icon mb-3">
                    <i className="mbri-user h1" />
                  </div>
                  <h1 className="lan_fun_value mb-1 text-white" data-count="100">
                    100%
                  </h1>
                  <p className="lan_fun_name mb-0">Clientes satisfechos</p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="text-center lan_funfact p-4 mt-3 rounded text-white">
                  <div className="lan_fun_icon mb-3">
                    <i className="mbri-users h1" />
                  </div>
                  <h1 className="lan_fun_value mb-1 text-white" data-count="1000">
                    1000 +
                  </h1>
                  <p className="lan_fun_name mb-0">Actuaciones nuevas mes pasado</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section bg-light" id="contact">
          <ContactUs />
        </section>
      </div>
    );
  }
}

function mapStateToProps({ planState, publicState, userState }) {
  return { plans: planState, public: publicState, userState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPlans,
      getPublicStats
    },
    dispatch
  );
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Landing));
