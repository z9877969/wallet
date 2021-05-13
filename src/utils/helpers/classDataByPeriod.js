import moment from 'moment';

class DataByPeriod {
  constructor() {
    this.current = moment().format('YYYY-MM-DD');
  }

  splitDate = (date = null) => {
    const [year, month, day] = this.split(date || this.current);
    return {
      year,
      month,
      day,
    };
  };

  getWeek = date => moment(date).week();
  getYear = (date = null) => {
    return this.splitDate(date)['year'];
  };
  getMonth = (date = null) => {
    return this.splitDate(date)['month'];
  };

  getDataDay = (data, date) => {
    return data.filter(transaction => transaction.date === date);
  };

  getDataWeek = (data, date) => {
    const periodWeek = this.getWeek(date);
    const periodYear = this.getYear(date);
    return data.filter(
      ({ date: dataDate }) =>
        this.getYear(dataDate) === periodYear &&
        this.getWeek(dataDate) === periodWeek,
    );
  };
  getDataMonth = (data, date) => {
    const { month: periodMonth, year: periodYear } = this.splitDate(date);
    return data.filter(({ date }) => {
      const { month, year } = this.splitDate(date);
      return year === periodYear && month === periodMonth;
    });
  };
  getDataYear = (data, date) => {
    const { year: periodYear } = this.splitDate(date);
    return data.filter(({ date }) => {
      const { year } = this.splitDate(date);
      return year === periodYear;
    });
  };
  getDataByCat = data => {
    return data.reduce((acc, transaction) => {
      const { category: cat } = transaction;
      const sum = Number(transaction.summ);
      const category = typeof cat === 'object' ? cat.name : cat;
      if (!acc[category]) {
        acc[category] = { total: sum };
        acc[category] = {
          ...acc[category],
          data: [transaction],
        };
        return acc;
      }
      acc[category].data.push(transaction);
      acc[category].total += sum;
      return acc;
    }, {});
  };
  getCategoriesDataList = ({ data, date, period = 'all' }) => {
    let newData = [];
    switch (period) {
      case 'day':
        newData = this.getDataDay(data, date);
        break;
      case 'week':
        newData = this.getDataWeek(data, date);
        break;
      case 'month':
        newData = this.getDataMonth(data, date);
        break;
      case 'year':
        newData = this.getDataYear(data, date);
        break;
      default:
        newData = data;
    }
    return this.getDataByCat(newData);
  };
}

const dataByPeriod = new DataByPeriod();

export default dataByPeriod;
