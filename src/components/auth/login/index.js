import * as React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Input, Button, Checkbox, notification } from 'antd';
import { Form } from '@ant-design/compatible';
import { LoadingOutlined } from '@ant-design/icons';

import { loginUserWithEmail } from '../../../actions';

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        this.props
          .loginUserWithEmail(values.email, values.password)
          .then(() => {
            this.setState({ loading: false });
            if (!this.props.userState.subscriptionId) {
              return this.props.history.push('/plan');
            }
            return this.props.history.push('/dashboard');
          })
          .catch(error => {
            this.setState({ loading: false });
            notification.error({
              message: 'Error al ingresar',
              description: typeof error === 'string' ? error : ''
            });
          });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'El email no es valido!'
              },
              { required: true, message: 'Ingresa tu email!' }
            ]
          })(<Input placeholder="Email" className="form-control mb-2 trial-input" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Ingresa tu contraseña!' },
              { min: 6, message: 'Contraseña debe ser de 6 digitos minimo' }
            ]
          })(<Input type="password" placeholder="Contraseña" className="form-control mb-2 trial-input" />)}
        </FormItem>
        <FormItem className="remember-me">
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox className="remember">Recordar mi cuenta</Checkbox>)}
        </FormItem>
        <FormItem className="submit-btn">
          <Button
            htmlType="submit"
            className="login-form-button btn-custom w-100 btn-rounded mt-3"
            disabled={this.state.loading}
          >
            {this.state.loading ? <LoadingOutlined /> : 'Ingresar'}
          </Button>
        </FormItem>
        <FormItem className="login-form-forgot">
          <Link to="#">Olvidaste tu clave?</Link>
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = ({ authState, utilsState, userState }) => {
  return { utilsState, authState, userState };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loginUserWithEmail
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login)));
