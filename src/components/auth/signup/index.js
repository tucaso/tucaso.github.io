import * as React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, Button, notification, Checkbox } from 'antd';
import { Form } from '@ant-design/compatible';

import { signUpUserWithEmail } from '../../../actions';

const FormItem = Form.Item;
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      showError: false,
      showErrorMessage: '',
      loading: false,
      confirmDirty: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props
          .signUpUserWithEmail(values.email, values.password, '')
          .catch(error => {
            this.setState({
              showError: true,
              showErrorMessage: typeof error === 'string' ? error : '',
              loading: false
            });

            notification.error({
              message: 'Error de Registro',
              description: typeof error === 'string' ? error : ''
            });
          })
          .then(() => {
            this.setState({
              loading: false
            });
            return this.props.history.push('/dashboard');
          });
      }
    });
  }
  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Las contraseñas deben ser iguales!');
    } else {
      callback();
    }
  }

  validateToNextPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }
      }
    };

    return (
      <Form onSubmit={this.handleSubmit} className="signup">
        <FormItem {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Ingresa tu nombre!'
              }
            ]
          })(<Input placeholder="Nombre" className="form-control mb-2 trial-input" />)}
        </FormItem>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'El Email no es valido!'
              },
              {
                required: true,
                message: 'Ingresa tu Email!'
              }
            ]
          })(<Input placeholder="Email" className="form-control mb-2 trial-input" />)}
        </FormItem>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Ingresa tu contraseña!'
              },
              {
                validator: this.validateToNextPassword
              },
              { min: 6, message: 'Contraseña debe ser de 6 digitos minimo' }
            ]
          })(<Input type="password" placeholder="Contraseña" className="form-control mb-2 trial-input" />)}
        </FormItem>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Por favor confirma tu contraseña!'
              },
              {
                validator: this.compareToFirstPassword
              },
              { min: 6, message: 'Contraseña debe ser de 6 digitos minimo' }
            ]
          })(
            <Input
              type="password"
              onBlur={this.handleConfirmBlur}
              placeholder="Confirmar contraseña"
              className="form-control mb-2 trial-input"
            />
          )}
        </FormItem>

        <FormItem className="policies">
          {getFieldDecorator('policies', {
            valuePropName: 'checked',
            initialValue: true,
            rules: [
              {
                required: true,
                message: 'Acepta los terminos!'
              }
            ]
          })(
            <Checkbox>
              He leido y acepto <Link to="#"> Terminos y condiciones</Link>
            </Checkbox>
          )}
        </FormItem>

        <FormItem className="submit-btn">
          <Button htmlType="submit" className="btn-custom w-100 btn-rounded mt-3 ">
            Registrarse
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = ({ authState, utilsState }) => {
  return { utilsState, authState };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      signUpUserWithEmail
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Signup)));
