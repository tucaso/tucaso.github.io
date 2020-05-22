import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col, DatePicker, Icon, Upload, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import { createPaymentWithImage } from './../../../../actions/payment-actions';
import moment from 'moment';
import { PAYMENT_TYPE_TRANSFER, PAYMENT_WAITING_APPROVE, getApiUrl } from '../../../../constants';

import './transfer.scss';
const FormItem = Form.Item;

class TransferMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_uri: null,
      filename: null,
      filetype: null,
      processing: false
    };
    this.imgUpload = this.imgUpload.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ processing: true });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let payment = {
          type: PAYMENT_TYPE_TRANSFER,
          total: this.props.userState.Subscription.Plan.value,
          subscriptionId: this.props.userState.subscriptionId,
          status: PAYMENT_WAITING_APPROVE,
          data: {
            date: values.date,
            number: values.number
          }
        };
        let image = {
          data_uri: this.state.data_uri,
          filename: this.state.filename,
          filetype: this.state.filetype
        };
        this.props
          .createPaymentWithImage(payment, image)
          .then(() => {
            this.setState({ processing: false });
            notification.success({
              message: 'Pago',
              description: 'Tu pago ha sido creado y esta pendiente de aprobación'
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
      }
    });
  };

  disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().subtract(30, 'days');
  }

  imgUpload(info) {
    console.log('info.file.status', info.file.status);
    if (info.file.status !== 'uploading') {
      console.log('uploading', info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
    if (info.file.status === 'removed') {
      this.setState({
        data_uri: null,
        filename: null,
        filetype: null
      });
    } else {
      const reader = new FileReader();
      const file = info.file;

      reader.onload = upload => {
        this.setState({
          data_uri: upload.target.result,
          filename: file.name,
          filetype: file.type
        });
      };
      reader.readAsDataURL(file);
    }
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
        sm: { span: 16 }
      }
    };
    console.log('state', this.state);
    return (
      <Row>
        <Col>
          <h1>Pago Transferencia Bancolombia</h1>
          <p>
            <div>
              Si la transferencia es fuera de Antioquia debes asumir el gasto de la transferencia regional, 8.000 cop
            </div>
            <Row className="mt-3">
              <Col xs={4}>Cuenta numero</Col>
              <Col xs={8}>
                <strong>015-689414-42</strong>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>Tipo</Col>
              <Col xs={8}>
                <strong>Ahorros</strong>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>A nombre de</Col>
              <Col xs={8}>
                <strong>Juan Sebastian Velez Posada</strong>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>Cc</Col>
              <Col xs={8}>
                <strong>1036 623 535</strong>
              </Col>
            </Row>
          </p>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Número de Transacción">
              {getFieldDecorator('number', {
                rules: [
                  {
                    required: true,
                    message: 'Llena el campo Numero de Transacción!'
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Fecha de la Transacción">
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: 'Llena el campo Fecha de Transacción!'
                  }
                ]
              })(<DatePicker format="YYYY-MM-DD" disabledDate={this.disabledDate} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Comprobante">
              {getFieldDecorator('document', {
                rules: [
                  {
                    required: true,
                    message: 'Debes subir un comprobante!'
                  }
                ],
                valuePropName: 'picture',
                getValueFromEvent: this.normFile
              })(
                <Upload
                  name="picture"
                  accept="image/*"
                  action={`${getApiUrl()}/payment/transfersupport`}
                  beforeUpload={() => false}
                  listType="picture"
                  multiple={false}
                  onChange={this.imgUpload}
                  headers={{
                    authorization: `Bearer ${localStorage.getItem('jwt')}`
                  }}
                >
                  <Button>
                    <Icon type="upload" /> Click Para subir
                  </Button>
                </Upload>
              )}
            </FormItem>
            <FormItem {...formItemLayout}>
              <Button type="primary" loading={this.state.processing} htmlType="submit">
                Enviar Comprobante
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
  return bindActionCreators({ createPaymentWithImage }, dispatch);
}

export default Form.create()(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransferMethod)));
