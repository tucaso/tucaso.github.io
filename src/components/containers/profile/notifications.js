import './notifications.scss';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input, Button, notification, Row, Col, Modal } from 'antd';
import { Form } from '@ant-design/compatible';
import { PlusOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';

import { updateCurrentUser, getCurrentUser } from '../../../actions';

const FormItem = Form.Item;

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addEmailModalOpen: false,
      modalErrorMessage: '',
      newEmail: ''
    };
  }

  remove = k => {
    // can use data-binding to set
    const emails = this.props.userState.teamEmails.filter(key => key !== k);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.saveEmails(emails);
      }
    });
  };

  saveEmails = values => {
    this.props
      .updateCurrentUser({ teamEmails: JSON.stringify(values) })
      .then(() => {
        this.props.getCurrentUser();
        notification.success({
          message: 'Notificaciones',
          description: 'Se han guardado los emails de notificaciones'
        });
        this.closeAddEmailModal();
      })
      .catch(() => {
        notification.error({
          message: 'Notificaciones',
          description: 'No se han guardado los emails de notificaciones'
        });
      });
  };

  notReppetEmail = (rule, value, callback) => {
    let emails = this.props.userState.teamEmails;

    if (value && emails.includes(value)) {
      return callback('El email esta repetido!');
    } else if (value && value === this.props.userState.email) {
      return callback('No puedes agregar tu propio email!');
    } else {
      return callback();
    }
  };

  addEmail = () => {
    const { teamEmails } = this.props.userState;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.saveEmails(teamEmails.concat(values.email));
      }
    });
  };

  closeAddEmailModal = () => {
    this.setState({
      addEmailModalOpen: false,
      newEmail: '',
      modalErrorMessage: ''
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    getFieldDecorator('keys', { initialValue: [] });

    return (
      <div className="notifications">
        <Row>
          <Col xs={24} sm={{ span: 20, offset: 2 }} className="desc">
            <div>
              Agrega hasta <span className="amount-of-notifications">2</span> emails.
            </div>
            <div className="long-desc">
              Los emails que tengas acá obtendrán las mismas notificaciones que tu correo principal (
              <span className="email">{this.props.userState.email}</span>)
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={{ span: 20, offset: 2 }} className="emails">
            {this.props.userState.teamEmails.map((e, i) => (
              <div className="email" key={i}>
                <span>{e}</span>
                <div className="delete" onClick={() => this.remove(e)}>
                  <DeleteOutlined />
                </div>
              </div>
            ))}
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit} className="notifications-form">
          {this.props.userState.teamEmails.length < 2 && (
            <Col xs={24} sm={{ span: 20, offset: 2 }}>
              <Button type="dashed" onClick={() => this.setState({ addEmailModalOpen: true })} style={{ width: '50%' }}>
                <PlusOutlined /> Agregar Email
              </Button>
            </Col>
          )}
        </Form>
        {this.state.addEmailModalOpen && (
          <Modal
            title="Agregar Email"
            visible={this.state.addEmailModalOpen}
            onOk={this.addEmail}
            onCancel={this.closeAddEmailModal}
            okText="Create"
            cancelText="Cancelar"
          >
            {this.state.modalErrorMessage !== '' && (
              <div className="modal-error-message">
                <span>{this.state.modalErrorMessage}</span>
                <CloseOutlined
                  className="close"
                  type="close"
                  onClick={() => this.setState({ modalErrorMessage: '' })}
                />
              </div>
            )}
            <div className="input">
              <FormItem {...formItemLayout} label={'Email'} required={false}>
                {getFieldDecorator(`email`, {
                  initialValue: '',
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      type: 'email',
                      message: 'No es un Email valido!'
                    },
                    {
                      required: true,
                      whitespace: true,
                      message: 'Igresa un email o elimina el campo.'
                    },
                    {
                      validator: (rule, value, callback) => {
                        return this.notReppetEmail(rule, value, callback);
                      }
                    }
                  ]
                })(<Input autoComplete="nope" placeholder="Email" />)}
              </FormItem>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

function mapStateToProps({ userState }) {
  return { userState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateCurrentUser, getCurrentUser }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Notifications)));
