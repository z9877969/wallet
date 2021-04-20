import moment from 'moment';

const currentDate = moment().format('YYYY-MM-DD');
const currentWeek = moment(currentDate).week();
const currentYear = moment(currentDate).year();
const currentMonth = moment(currentDate).month();

const getSummProp = (propName, data) => {
  return data.reduce((acc, el) => {
    if (!acc.name) {
      acc.name = propName;
      acc.value = Number(el.summ);
      return acc;
    }
    acc.value += Number(el.summ);
    return acc;
  }, {});
};

const getTransactionPeriodsList = data => {
  const today = data.filter(elem => elem.date === currentDate);
  const week = data.filter(
    elem =>
      moment(elem.date).week() === currentWeek &&
      moment(elem.date).year() === currentYear,
  );
  const month = data.filter(
    elem =>
      moment(elem.date).month() === currentMonth &&
      moment(elem.date).year() === currentYear,
  );

  return [
    getSummProp('сегодня', today),
    getSummProp('неделя', week),
    getSummProp('месяц', month),
  ];
};

export default getTransactionPeriodsList;
