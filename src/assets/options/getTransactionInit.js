import moment from 'moment';

export default function getTransactionInit(transactionType) {
  return {
    date: moment().format('YYYY-MM-DD'),
    time: moment().format('HH:mm'),
    category: transactionType === 'costs' ? 'Еда' : 'Зарплата',
    summ: '',
    currency: 'RUB',
    comment: '',
  };
}
