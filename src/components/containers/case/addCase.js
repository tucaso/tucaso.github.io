import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Select, Button, notification } from 'antd';
import { Form } from '@ant-design/compatible';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

import { removeEntities, addNewCase } from '../../../actions';

import './addCase.scss';

const { TextArea } = Input;
const FormItem = Form.Item;

class AddCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caseNumber: '',
      showErrorMsg: false,
      ErrorMsg: '',
      selectedEntity: '',
      description: '',
      messageClass: '',
      loading: false
    };
    this.submit = this.submit.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.closeErrorMsg = this.closeErrorMsg.bind(this);
  }

  componentDidMount() {
    this.props.removeEntities();
  }

  submit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const year = this.state.caseNumber.substr(12, 4);
        if (parseInt(year, 10) > new Date().getFullYear()) {
          this.setState({
            showErrorMsg: true,
            ErrorMsg: 'Número de Radicación erroneo',
            messageClass: ''
          });
          return;
        }
        const params = {
          caseNumber: this.state.caseNumber,
          description: this.state.description
        };
        this.setState({
          loading: true,
          showErrorMsg: false,
          ErrorMsg: ''
        });
        this.props
          .addNewCase(params, {
            page: this.props.casesState.page,
            limit: this.props.casesState.limit
          })
          .then(() => {
            this.setState({
              showErrorMsg: true,
              ErrorMsg: 'Caso agregado',
              caseNumber: '',
              description: '',
              messageClass: 'success',
              loading: false
            });
            this.props.form.setFieldsValue({
              description: '',
              caseNumber: ''
            });
          })
          .catch(err => {
            if (err.message === 'limitExceeded') {
              const key = `open${Date.now()}`;
              const btn = (
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    notification.close(key);
                    return this.props.history.push('/profile/subscripcion');
                  }}
                >
                  Aumentar limite
                </Button>
              );
              notification.open({
                message: 'Subir de plan',
                description: 'Superas el limite de casos, revisa nuestras cuentas premium.',
                btn,
                duration: 0,
                key
              });
            } else {
              this.setState({
                showErrorMsg: true,
                ErrorMsg: err.message,
                messageClass: '',
                loading: false
              });
            }
          });
      }
    });
  }

  renderOptions(option, showValue = false) {
    return (
      <Select.Option key={option.id} value={option.id} label={option.label}>
        {showValue ? `${option.label} - ${option.value}` : option.label}
      </Select.Option>
    );
  }

  setDescription(e) {
    this.setState({ description: e.target.value.substring(0, 160) });
  }

  closeErrorMsg() {
    this.setState({
      showErrorMsg: false,
      ErrorMsg: '',
      messageClass: ''
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 14,
          offset: 8
        },
        sm: {
          span: 14,
          offset: 10
        }
      }
    };
    return (
      <Form onSubmit={this.submit} className="add-case">
        {this.state.showErrorMsg && (
          <div className={`error-message ${this.state.messageClass}`}>
            {this.state.ErrorMsg}
            <span className="close" onClick={this.closeErrorMsg}>
              X
            </span>
          </div>
        )}
        <div>
          <FormItem {...formItemLayout} label="Número de Radicación" className="mt-2">
            {getFieldDecorator('caseNumber', {
              rules: [
                { required: true, message: 'Escribe el Número de Radicación!' },
                { len: 23, message: 'El numero de radicación debe tener 23 caracteres' }
              ]
            })(<Input type="number" size="large" onChange={e => this.setState({ caseNumber: e.target.value })} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Descripción" className="mt-2">
            {getFieldDecorator('description', {
              rules: [
                { required: false, message: 'Escribe una Descripcion para este caso' },
                { max: 160, message: 'maximo 160 caracteres' }
              ]
            })(<TextArea rows="3" autoSize={{ minRows: 2 }} size="large" onChange={this.setDescription} />)}
          </FormItem>
        </div>
        <FormItem {...tailFormItemLayout} className="add-button mt-2">
          <Button type="primary" htmlType="submit" disabled={this.state.loading}>
            Agregar Proceso
            {this.state.loading ? <LoadingOutlined /> : ''}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

function mapStateToProps({ authState, citiesState, entitiesState, casesState, userState }) {
  return { authState, citiesState, entitiesState, casesState, userState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      removeEntities,
      addNewCase
    },
    dispatch
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddCase)));
