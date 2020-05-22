import * as numeral from 'numeral';
import moment from 'moment';

export const isNumber = data => {
  return !isNaN(data);
};

export const formatAmount = (data, decimals = 0, space = ' ') => {
  if (isNumber(data)) {
    if (decimals === 0) {
      return numeral(data).format('$' + space + '0,0');
    } else {
      let zeros = '0'.repeat(decimals);
      return numeral(data).format('$' + space + '0,0.' + zeros);
    }
  } else {
    return data;
  }
};

export const formatDate = (data, format = 'LL') => {
  return moment.utc(data).format(format);
};
