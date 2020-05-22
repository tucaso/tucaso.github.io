import React from 'react';
import { getPaymentStatus } from '../../../constants';
import { Link } from 'react-router-dom';
import { formatAmount, formatDate } from '../../../utils/formatters';

const paymentsColumns = [
  {
    title: 'Id',
    key: 'id',
    render: object => <Link to={`/payment/${object.id}`}>{object.id}</Link>
  },
  {
    title: 'Total',
    key: 'total',
    render: object => formatAmount(object.total)
  },
  {
    title: 'Estado',
    key: 'status',
    render: object => getPaymentStatus(object.status)
  },
  {
    title: 'Tipo',
    key: 'type',
    render: object => object.type
  },
  {
    title: 'Creado en',
    key: 'createdAt',
    render: object => formatDate(object.createdAt)
  },
  {
    title: 'Actualizado en',
    key: 'updatedAt',
    render: object => formatDate(object.updatedAt)
  }
];

export { paymentsColumns };
