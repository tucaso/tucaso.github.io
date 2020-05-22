import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col, Button, Input } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getCase, removeCase, updateCase, reportError } from '../../../actions';

import './showCase.scss';

const { TextArea } = Input;

class ShowCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowed: true,
      errorMsg: '',
      modify: false,
      description: '',
      editDescription: '',
      updating: false
    };
    this.descInput = React.createRef();
    this.updateCase = this.updateCase.bind(this);
    this.modify = this.modify.bind(this);
  }

  componentDidMount() {
    this.props.removeCase();
    this.props
      .getCase(this.props.match.params.id)
      .then(() => {
        this.setState({ description: this.props.caseState.userCases[0].description });
      })
      .catch(err => {
        this.setState({
          allowed: false,
          errorMsg: err.message
        });
      });
  }

  updateCase() {
    this.setState({ updating: true });
    this.props
      .updateCase(this.props.match.params.id, { description: this.state.editDescription })
      .then(() => {
        this.setState({
          updating: false,
          modify: false,
          description: this.props.caseState.userCases[0].description
        });
      })
      .catch(() => {
        this.setState({ updating: false });
      });
  }

  modify() {
    this.setState(
      prevState => {
        return { modify: true, editDescription: prevState.description };
      },
      () => {
        this.descInput.current.focus();
      }
    );
  }

  render() {
    try {
      if (!this.props.caseState.isValid) {
        return (
          <div>
            <h2>Error - {this.props.caseState.caseNumber}</h2>
            <p>
              <code>Este numero de caso no es valido</code>
            </p>
          </div>
        );
      } else if (!this.state.allowed) {
        return (
          <div>
            <h2>Error</h2>
            <p>
              <code>{this.state.errorMsg}</code>
            </p>
          </div>
        );
      } else {
        if (this.props.caseState.id) {
          return (
            <div className="show-case">
              {!this.props.caseState.userCases[0].active && <div className="not-active">Este caso no esta activo</div>}
              <Row className="mt-2">
                <Col xs={24}>
                  <strong>Caso:</strong> {this.props.caseState.caseNumber}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs={24}>
                  <strong>Ciudad:</strong>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs={24}>
                  <strong>Entidad:</strong>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs={24} sm={12}>
                  <strong>Creado:</strong> {moment(this.props.caseState.createdAt).format('MM-DD-YYYY HH:mm a')}
                </Col>
                <Col xs={24} sm={12}>
                  <strong>Ultima actualizacion:</strong>{' '}
                  {moment(this.props.caseState.updatedAt).format('MM-DD-YYYY HH:mm a')}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs={10} sm={4}>
                  <strong>Descripción:</strong>
                </Col>
                <Col xs={16} sm={20} className={this.state.modify === false ? 'description' : ''}>
                  {this.state.modify === false ? (
                    this.state.description
                  ) : (
                    <TextArea
                      ref={this.descInput}
                      rows={4}
                      value={this.state.editDescription}
                      onChange={e => this.setState({ editDescription: e.target.value })}
                    />
                  )}
                </Col>
              </Row>
              <Row justify="space-around" className="mt-20">
                {this.state.modify === false ? (
                  <Col xs={12}>
                    <Button type="primary" onClick={this.modify}>
                      Modificar
                    </Button>
                  </Col>
                ) : (
                  <React.Fragment>
                    <Col xs={12}>
                      <Button type="primary" onClick={this.updateCase} loading={this.state.updating}>
                        Guardar
                      </Button>
                    </Col>
                    <Col xs={12}>
                      <Button
                        type="dashed"
                        onClick={() => this.setState({ modify: false })}
                        loading={this.state.updating}
                      >
                        Cancelar
                      </Button>
                    </Col>
                  </React.Fragment>
                )}
              </Row>
              <hr className="mt-20" />
              <Row>
                <h5>Datos del Proceso</h5>
              </Row>
              <Row className="mt-2">
                <Col xs={24}>
                  <strong>Información de Radicación del Proceso</strong>
                </Col>
              </Row>
              <Row className="mt-2 case-data-row">
                <Col xs={12} className="case-data">
                  <strong>Despacho:</strong> {this.props.caseState.despacho}
                </Col>
                <Col xs={12} className="case-data">
                  <strong>Ponente:</strong> {this.props.caseState.ponente}
                </Col>
              </Row>

              <Row className="mt-3">
                <Col xs={24}>
                  <strong>Clasificación del Proceso</strong>
                </Col>
              </Row>
              <Row className="mt-2 case-data-row">
                <Col xs={6} className="case-data">
                  <strong>Tipo:</strong> {this.props.caseState.tipo}
                </Col>
                <Col xs={6} className="case-data">
                  <strong>Clase:</strong> {this.props.caseState.clase}
                </Col>
                <Col xs={6} className="case-data">
                  <strong>Recurso:</strong> {this.props.caseState.recurso}
                </Col>
                <Col xs={6} className="case-data">
                  <strong>Ubicación del Expediente:</strong> {this.props.caseState.ubicacion}
                </Col>
              </Row>

              <Row className="mt-3">
                <Col xs={24}>
                  <strong>Sujetos Procesales</strong>
                </Col>
              </Row>
              <Row className="mt-2 case-data-row">
                <Col xs={12} className="case-data">
                  <strong>Demandante(s):</strong> {this.props.caseState.demandante}
                </Col>
                <Col xs={12} className="case-data">
                  <strong>Demandado(s):</strong> {this.props.caseState.demandado}
                </Col>
              </Row>

              <Row className="mt-3">
                <Col xs={24}>
                  <strong>Contenido de Radicación</strong>
                </Col>
              </Row>
              <Row className="mt-2 case-data-row">
                <Col xs={24} className="case-data">
                  <strong>Contenido:</strong> {this.props.caseState.contenido}
                </Col>
              </Row>

              {this.props.caseState.userCases[0].newActuaciones > 0 && (
                <Row>
                  <Col xs={24} className="new-actuaciones">
                    Estas viendo
                    <span className="value">{this.props.caseState.userCases[0].newActuaciones}</span>
                    nuevas actualizaciones desde la ultima vez que entraste
                  </Col>
                </Row>
              )}
              {!this.props.caseState.Actuacions.length && this.props.caseState.userCases[0].active && (
                <div className="loading-case-data">
                  Estamos cargando los datos de este caso, regresa en unos minutos y los veras aca
                </div>
              )}
              <Row className="case-info-table">
                <table className="mt-30 ant-table-bordered">
                  <thead
                    className="ant-table-thead"
                    dangerouslySetInnerHTML={{ __html: this.props.caseState.Actuacions[0].header }}
                  />
                  <tbody
                    className="ant-table-tbody"
                    dangerouslySetInnerHTML={{ __html: this.props.caseState.Actuacions[0].value }}
                  />
                </table>
              </Row>
            </div>
          );
        } else {
          return (
            <div>
              <h2>Cargando</h2>
              <p>Las Actuaciónes sobre este caso, en un momento se veran reflejadas en este sitio dentro de poco</p>
            </div>
          );
        }
      }
    } catch (e) {
      this.props.reportError(e);
      return <h2>Tenemos un error en nuestras manos, en menos de 24 horas lo arreglaremos para ti</h2>;
    }
  }
}

function mapStateToProps({ authState, caseState, userState }) {
  return { authState, caseState, userState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCase,
      removeCase,
      updateCase,
      reportError
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowCase));
