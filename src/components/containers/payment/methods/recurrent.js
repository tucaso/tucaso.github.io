import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Form, notification, Button, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import { createPaymentStripe } from './../../../../actions/payment-actions';
import { PAYMENT_TYPE_STRIPE, PAYMENT_PROCESSING } from '../../../../constants';

import './recurrent.scss';
const FormItem = Form.Item;

class RecurrentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      if (!this.state.loading) {
        this.setState({ loading: true });
        try {
          // create payment token
          const token = (await this.props.stripe.createToken({ name: this.props.userState.fullName })).token.id;

          if (!token) {
            throw new Error('Token was not created');
          }
          let payment = {
            type: PAYMENT_TYPE_STRIPE,
            total: this.props.userState.Subscription.Plan.value,
            subscriptionId: this.props.userState.subscriptionId,
            status: PAYMENT_PROCESSING,
            data: {
              token: token,
              recurrent: values.recurrent
            }
          };
          // create payment
          await this.props
            .createPaymentStripe(payment)
            .then(() => {
              this.setState({ processing: false });
              notification.success({
                message: 'Pago',
                description: 'Tu pago ha sido creado'
              });
              return this.props.history.push('/profile/subscripcion');
            })
            .catch(() => {
              this.setState({ processing: false });
              notification.error({
                message: 'Pago',
                description: 'El pago ha fallado, intenta de nuevo'
              });
            });
        } catch (err) {
          notification.error({
            message: 'Pago',
            description: 'El pago ha fallado, intenta de nuevo'
          });
        }
        this.setState({ loading: false });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const stylesStripe = {
      base: {
        fontSize: '22px',
        '::placeholder': {
          color: '#7a7a7a'
        },
        ':focus': {
          borderColor: '#f1592a'
        }
      }
    };
    return (
      <Row className="recurrent">
        <Col>
          <h1>Pago con tarjeta de credito</h1>
          <p> El pago es procesado a traves de Stripe, una plataforma totalmente segura y confiable.</p>
          <Form onSubmit={this.handleSubmit} className="checkout-form">
            <FormItem className="card-data">
              {getFieldDecorator('cardNumber', {
                rules: [{ required: true, message: 'Ingresa el mnumero de tu tarjeta!' }]
              })(<CardNumberElement placeholder="Card Number" style={stylesStripe} />)}
            </FormItem>
            <FormItem className="card-data">
              {getFieldDecorator('cardExpire', {
                rules: [{ required: true, message: 'Ingresa la fecha de expiración de tu tarjeta!' }]
              })(<CardExpiryElement style={stylesStripe} />)}
            </FormItem>
            <FormItem className="card-data">
              {getFieldDecorator('cardCVC', {
                rules: [{ required: true, message: 'Ingresa el codigo CVC!' }]
              })(<CardCVCElement style={stylesStripe} />)}
            </FormItem>

            <FormItem>
              {getFieldDecorator('recurrent', {})(
                <Checkbox style={stylesStripe}>
                  Deseas que hagamos el cobro automatico a tu tarjeta de credito cada mes?{' '}
                </Checkbox>
              )}
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit" loading={this.state.loading}>
                Pagar
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps({ userState }) {
  return { userState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createPaymentStripe }, dispatch);
}

export default withRouter(
  injectStripe(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Form.create()(RecurrentMethod))
  )
);
