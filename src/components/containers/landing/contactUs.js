import * as React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input, Button, notification } from 'antd';
import { Form } from '@ant-design/compatible';
import { LoadingOutlined } from '@ant-design/icons';

import { postContactUs } from '../../../actions';

const FormItem = Form.Item;
const { TextArea } = Input;

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
          .postContactUs({
            name: values.contactName,
            email: values.contactEmail,
            message: values.message,
            phone: values.phone
          })
          .then(() => {
            this.setState({ loading: false });
            notification.success({
              message: 'Gracias por tu contacto',
              description: 'Pronto nos pondremos en contacto con tigo'
            });
            this.props.form.resetFields();
          })
          .catch(error => {
            this.setState({ loading: false });
            notification.error({
              message: 'Error',
              description: typeof error === 'string' ? error : ''
            });
          });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2 className="mb-0 text-capitalize">
                  <span className="font-weight-bold">Contáctanos</span>
                </h2>
                <div className="main-title-border">
                  <i className="mdi mdi-atom" />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4 pt-4">
            <div className="col-lg-12">
              <div className="custom-form">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group mt-2">
                      <FormItem>
                        {getFieldDecorator('contactName', {
                          rules: [
                            { message: 'El nombre no es valido!' },
                            { required: true, message: 'Ingresa tu nombre!' }
                          ]
                        })(<Input placeholder="Tu Nombre*" className="form-control contact-input" />)}
                      </FormItem>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group mt-2">
                      <FormItem>
                        {getFieldDecorator('contactEmail', {
                          rules: [
                            {
                              type: 'email',
                              message: 'El email no es valido!'
                            },
                            { required: true, message: 'Ingresa tu email!' }
                          ]
                        })(<Input placeholder="Tu Email*" className="form-control contact-input" />)}
                      </FormItem>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group mt-2">
                      <FormItem>
                        {getFieldDecorator('phone', {
                          rules: [{ message: 'El teléfono no es valido!' }, { message: 'Ingresa tu telefono!' }]
                        })(<Input placeholder="Teléfono" className="form-control contact-input" />)}
                      </FormItem>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group mt-2">
                      <FormItem>
                        {getFieldDecorator('message', {
                          rules: [
                            { message: 'El nombre no es valido!' },
                            { required: true, message: 'Ingresa tu nombre!' }
                          ]
                        })(<TextArea rows={4} placeholder="Tu Mensaje..." className="form-control contact-input" />)}
                      </FormItem>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 text-center">
                    <FormItem className="submit-btn">
                      <Button htmlType="submit" className="btn btn-custom" disabled={this.state.loading}>
                        {this.state.loading ? <LoadingOutlined /> : 'Enviar Mensaje'}
                      </Button>
                    </FormItem>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      postContactUs
    },
    dispatch
  );
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Form.create()(Login))
);
