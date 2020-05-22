import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Select, Row, Col, Badge, Button, Input } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';

import { MOBILE_RESOLUTION } from '../../../constants';
import { withRouter } from 'react-router-dom';

import './casesTable.scss';

const pagination = [1, 2, 5, 10, 20, 50, 100];

class CasesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: 10,
      filteredInfo: null,
      sortedInfo: null,
      size: '',
      searchDesc: '',
      filterDropdownVisible: false,
      casesWarningOpen: true
    };

    this.descInput = React.createRef();

    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.setPagination = this.setPagination.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.toggleCase = this.toggleCase.bind(this);
    this.onSearchDesc = this.onSearchDesc.bind(this);
    this.clearSearchDesc = this.clearSearchDesc.bind(this);
  }

  componentDidMount() {
    this.props.getCases({
      page: this.state.page,
      limit: this.state.pages,
      active: this.props.active,
      desc: this.state.searchDesc
    });

    let screenSize = '';
    if (window.innerWidth < MOBILE_RESOLUTION) {
      screenSize = 'mobile';
    }
    const resizeListener = window.addEventListener('resize', () => {
      if (window.innerWidth < MOBILE_RESOLUTION) {
        this.setState({ size: 'mobile' });
      } else {
        this.setState({ size: '' });
      }
    });

    this.setState({ size: screenSize, resizeListener });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.resizeListener);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this.props.casesState.cases.length !== prevProps.casesState.cases.length) {
      return 'oelo';
    }
    return null;
  }

  clearFilters() {
    this.setState({ filteredInfo: null });
  }

  onPaginationChange(page) {
    this.setState({ page }, () => {
      this.props.getCases({
        page,
        limit: this.state.pages,
        active: this.props.active,
        desc: this.state.searchDesc
      });
    });
  }

  setPagination(pages) {
    this.setState({ pages }, () => {
      this.props.getCases({
        page: this.state.page,
        limit: this.state.pages,
        active: this.props.active,
        desc: this.state.searchDesc
      });
    });
  }

  renderOptions(option) {
    return (
      <Select.Option key={option} value={option} label={option}>
        {option}
      </Select.Option>
    );
  }

  handleChange(pagination, filters, sorter) {
    this.setState({ filteredInfo: filters, sortedInfo: sorter });
  }

  toggleCase(caseId) {
    this.props.toggleCase(caseId, {
      page: this.props.casesState.page,
      limit: this.props.casesState.limit
    });
  }

  onSearchDesc() {
    this.setState({ page: 1, filterDropdownVisible: false });
    this.props.getCases({
      page: 1,
      limit: this.state.pages,
      active: this.props.active,
      desc: this.state.searchDesc
    });
  }

  clearSearchDesc() {
    this.setState({ searchDesc: '' }, () => {
      this.onSearchDesc();
    });
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Número de Radicación',
        dataIndex: 'caseNumber',
        key: 'caseNumber',
        width: 220,
        render: (text, record) => (
          <div className="case-number">
            <Link to={`/case/${text}`}>{text}</Link>
            <Badge
              className="badge"
              count={record.userCases[0].newActuaciones}
              onClick={() => this.props.history.push(`/case/${text}`)}
            />
          </div>
        ),
        sorter: (a, b) => {
          if (a.caseNumber < b.caseNumber) return -1;
          if (a.caseNumber > b.caseNumber) return 1;
          return 0;
        },
        sortOrder: sortedInfo.columnKey === 'caseNumber' && sortedInfo.order
      },
      {
        title: 'Ciudad',
        dataIndex: 'Entity.City.label',
        key: 'Entity.City.label',
        width: 120,
        filteredValue: filteredInfo['Entity.City.label'] || null,
        onFilter: (value, record) => record.Entity.City.label.includes(value),
      },
      {
        title: 'Entidad',
        dataIndex: 'Entity.label',
        key: 'Entity.label',
        width: 200
      },
      {
        title: 'Descripción',
        dataIndex: 'description',
        key: 'description',
        width: 210,
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={this.descInput}
              placeholder="Buscar por descripcion"
              value={this.state.searchDesc}
              onChange={e => this.setState({ searchDesc: e.target.value })}
              onPressEnter={this.onSearchDesc}
              addonAfter={<CloseOutlined onClick={this.clearSearchDesc} />}
            />
            <Button type="primary" onClick={this.onSearchDesc}>
              Buscar
            </Button>
          </div>
        ),
        filterIcon: (
          <span>
            <SearchOutlined style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />
          </span>
        ),
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownVisible: visible
            },
            () => this.descInput && this.descInput.current.focus()
          );
        },
        sorter: (a, b) => {
          if (typeof a.userCases[0].description === 'undefined' && typeof b.userCases[0].description === 'undefined')
            return 0;
          if (typeof a.userCases[0].description === 'undefined') return 1;
          if (typeof b.userCases[0].description === 'undefined') return -1;
          if (a.userCases[0].description < b.userCases[0].description) return -1;
          if (a.userCases[0].description > b.userCases[0].description) return 1;
          return 0;
        },
        sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
        render: (text, record) => <span className="desc">{record.userCases[0].description}</span>
      },
      {
        title: 'Accion',
        key: 'action',
        width: 120,
        render: (text, record) => (
          <span>
            {this.props.active ? (
              <Button type="danger" size="small" onClick={() => this.toggleCase(record.id)}>
                Archivar
              </Button>
            ) : (
              <Button type="primary" size="large" className="active-action" onClick={() => this.toggleCase(record.id)}>
                Des-Archivar
              </Button>
            )}
          </span>
        )
      }
    ];
    let casesLeft = this.props.limitCases - this.props.casesState.total;
    const ten = this.props.limitCases * 0.1;
    return (
      <div className={`${this.props.active ? 'active-cases' : 'inactive-cases'}`}>
        <Row type="flex" align="middle" className="search">
          <Col xs={24} sm={6} md={3}>
            Buscar
          </Col>
          <Col xs={24} sm={6} md={12}>
            <Input
              size="large"
              ref={this.descInput}
              placeholder="Buscar por descripcion"
              value={this.state.searchDesc}
              onChange={e => this.setState({ searchDesc: e.target.value })}
              onPressEnter={this.onSearchDesc}
              addonAfter={<CloseOutlined onClick={this.clearSearchDesc} />}
            />
          </Col>
          <Col xs={24} sm={1} md={1} />
          <Col xs={24} sm={6} md={4}>
            Casos por pagina
          </Col>
          <Col xs={24} sm={6} md={4}>
            <Select size="large" onChange={this.setPagination} style={{ width: '100%' }} value={this.state.pages}>
              {pagination.map(p => {
                return this.renderOptions(p);
              })}
            </Select>
          </Col>
        </Row>
        <Row className="mt-10">
          Tienes un total de <strong>{this.props.casesState.total}</strong> procesos {this.props.caseLabel} actualmente
        </Row>
        {(casesLeft < ten || casesLeft < 10) &&
          this.state.casesWarningOpen && (
            <Row className="mt-10 cases-warning">
              <div className="close" onClick={() => this.setState({ casesWarningOpen: false })}>
                x
              </div>
              Tu plan esta casi al limite, solo tienes <strong>{casesLeft}</strong> procesos libres por activar
              <br />
              Pásate a un plan con mas procesos disponibles
            </Row>
          )}
        <Table
          className="cases-list mt-10"
          columns={columns}
          pagination={{
            pageSize: this.props.casesState.limit,
            total: this.props.casesState.total,
            onChange: this.onPaginationChange
          }}
          dataSource={this.props.casesState.cases}
          locale={{ emptyText: 'No tienes casos' }}
          scroll={{ x: 1100 }}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default withRouter(CasesTable);
