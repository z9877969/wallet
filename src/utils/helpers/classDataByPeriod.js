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
  getDataByCat = data => {
    return data.reduce((acc, { category: cat, ...rest }) => {
      // const { category: cat } = transaction;
      const category = typeof cat === 'object' ? cat.name : cat;
      if (!acc.length) return [{ [category]: [{ ...rest, category }] }];
      let i = 0;
      const curCatList = acc.find((catList, idx) => {
        i = idx;

        return category in catList;
      });
      if (curCatList !== undefined) {
        console.log('acc[i] :>> ', acc[i]);
        acc[i][category].push({ ...rest, category });
        return acc;
      }
      acc.push({ [category]: [{ ...rest, category }] });

      return acc;
    }, []);
  };
}

const dataByPeriod = new DataByPeriod();

export default dataByPeriod;
