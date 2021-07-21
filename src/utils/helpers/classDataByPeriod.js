import moment from 'moment';
import 'moment/locale/ru';
// import 'moment/locale/uk';

class DataByPeriod {
  #dateFormat = {
    simple: 'YYYY-MM-DD',
    full: 'YYYY-MMMM-W',
  };

  #direction = {
    RIGHT: 'right',
    LEFT: 'left',
  };

  #periodsTypes = {
    year: 'year',
    month: 'month',
    week: 'week',
    day: 'day',
  };

  #getPeriod = {
    week: date => moment(date).week(),
    year: (date = null) => this.splitDate(date)['year'],
    month: (date = null) => this.splitDate(date)['month'],
  };

  get dateFormat() {
    return this.#dateFormat;
  }

  get direction() {
    return this.#direction;
  }

  get periodsTypes() {
    return this.#periodsTypes;
  }

  get getPeriod() {
    return this.#getPeriod;
  }

  constructor() {
    this.current = moment().format(this.simpleDateFormat);
    this.updatingDate = this.current;
    this.pointOfPeriod = 0;
  }

  changeDateToDate = dateStr => moment(dateStr)._d;

  changeToCapitalize = str => str[0].toUpperCase() + str.slice(1);

  splitDate = (date = null) => {
    const [year, month, day] = (date || this.current).split('-');
    return {
      year,
      month,
      day,
    };
  };

  splitFullDate = date => {
    const fullDate = moment(date).local('ru').format(this.dateFormat.full);
    const [year, month, dayOfWeek] = fullDate.split('-');
    return {
      year,
      month,
      dayOfWeek,
    };
  };

  getDataPerDay = (data, date) => {
    return data.filter(transaction => transaction.date === date);
  };

  getDataPerWeek = (data, date) => {
    const periodWeek = this.getPeriod.week(date);
    const periodYear = this.getPeriod.year(date);
    return data.filter(
      ({ date: dataDate }) =>
        this.getPeriod.year(dataDate) === periodYear &&
        this.getPeriod.week(dataDate) === periodWeek,
    );
  };

  getDataPerMonth = (data, date) => {
    const { month: periodMonth, year: periodYear } = this.splitDate(date);
    return data.filter(({ date }) => {
      const { month, year } = this.splitDate(date);
      return year === periodYear && month === periodMonth;
    });
  };

  getDataPerYear = (data, date) => {
    const { year: periodYear } = this.splitDate(date);
    return data.filter(({ date }) => {
      const { year } = this.splitDate(date);
      return year === periodYear;
    });
  };

  getUpdatingDate = (baseDate, method, periodType) =>
    {
      console.log('periodType :>> ', periodType === this.periodsTypes.month);
      return moment(baseDate)
      [method](
        1,
        // periodType === this.periodsTypes.month ? periodType + 'es' : periodType + 's',
        "monthes"
      )
      .format(this.dateFormat.simple)};

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

  getDataListOfCategories = ({ data, date, period = 'all' }) => {
    const { day, week, year, month } = this.periodsTypes;
    let newData = [];
    switch (period) {
      case day:
        newData = this.getDataPerDay(data, date);
        break;
      case week:
        newData = this.getDataPerWeek(data, date);
        break;
      case month:
        newData = this.getDataPerMonth(data, date);
        break;
      case year:
        newData = this.getDataPerYear(data, date);
        break;
      default:
        newData = data;
    }
    return this.getDataByCat(newData);
  };

  getDateOfPeriodStr = ({ date, period }) => {
    switch (period) {
      case this.periodsTypes.month:
        const { year, month } = this.splitFullDate(date);
        const monthWithCapitalize = this.changeToCapitalize(month);
        return `${monthWithCapitalize} ${year}`;
      case this.periodsTypes.week:
        const { dayOfWeek } = this.splitFullDate(date);
        const weekStart = moment(date)
          .subtract(dayOfWeek - 1, 'days')
          .format('LL');
        const weekEnd = moment(date)
          .add(7 - dayOfWeek, 'days')
          .format('LL');
        return `${weekStart} - ${weekEnd}`;
      case this.periodsTypes.day:
        return moment(date).format('LL');
      case this.periodsTypes.year:
        return this.splitFullDate(date).year;
    }
  };

  setUpdatingDate = (periodType, updatingDirection = 'left' || 'right') => {
    const method =
      updatingDirection === this.direction.RIGHT
        ? 'add'
        : updatingDirection === this.direction.LEFT
        ? 'subtract'
        : null;
    if (!method) return;
    this.pointOfPeriod += 1;
    this.updatingDate = this.getUpdatingDate(
      this.updatingDate,
      method,
      periodType,
    );
    // switch (periodType) {
    //   case this.periodsTypes.month:
    // this.updatingDate = getUpdatingDate(this.updatingDate, method, periodType)
    // moment(this.updatingDate)
    //   [method](this.pointOfPeriod, 'monthes')
    //   .format(this.dateFormat.simple);
    // default:
    //   this.updatingDate = moment(this.updatingDate)
    //     [method](this.pointOfPeriod, periodType + 's')
    //     .format(this.dateFormat.simple);
    // }
    this.pointOfPeriod = 0;
  };
}

const dataByPeriod = new DataByPeriod();

export default dataByPeriod;
