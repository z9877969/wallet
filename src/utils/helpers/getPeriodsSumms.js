import moment from 'moment';

const currentDate = moment().format('YYYY-MM-DD');
const currentWeek = moment(currentDate).week();
const currentYear = moment(currentDate).year();
const currentMonth = moment(currentDate).month();

const getSummForPeriods = dataForPeriod => {
  const [[period, data]] = Object.entries(dataForPeriod);
  return data.length
    ? data.reduce((acc, { summ }) => {
        if (!acc[period]) {
          acc[period] = Number(summ);
          return acc;
        }
        acc[period] += Number(summ);
        return acc;
      }, {})
    : { [period]: 0 };
};

const getPeriodsSumms = (data = []) => {
  const today = data.filter(elem => {
    return elem.date === currentDate});
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

  const periods = [{ today }, { week }, { month }];
  const dataRender = periods.reduce((acc, dataForPeriod) => {
    const summForPeriod = getSummForPeriods(dataForPeriod);
    acc = { ...acc, ...summForPeriod };
    return acc;
  }, {});

  return dataRender;
};

export default getPeriodsSumms;
