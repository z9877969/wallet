import moment from "moment"
import MainInfo from '../MainInfo';
import Button from '../share/Button';

const balance = [{ name: 'Все время', value: '0,00' }];
const MainPage = props => {
  const { costsDb, incomesDb, handleToggleCard, costs, incomes } = props;
  const currentDate = moment().format('YYYY-MM-DD')
  const currentWeek = moment(currentDate).week()
  const currentYear = moment(currentDate).year()
  const currentMonth = moment(currentDate).month()

  
  const getTransactionList = (data) => {
    const today = data.filter(elem => elem.date === currentDate)
    const week = data.filter(elem => moment(elem.date).week() === currentWeek && moment(elem.date).year() === currentYear )
    const month = data.filter(elem => moment(elem.date).month() === currentMonth && moment(elem.date).year() === currentYear)

    const getSummProp = (propName, data) => {
      return data.reduce((acc, el) => {
      if (!acc.name) {
        acc.name = propName
         acc.value = Number(el.summ)
        return acc
      } 

        acc.value += Number(el.summ)
        
      return acc
      }, {})
    }

    return [getSummProp("сегодня", today),getSummProp("неделя", week),getSummProp("месяц", month)]
  }

  getTransactionList(costs)

  console.log(getTransactionList(costs))

  return (
    <>
      <h1>Журнал рассходов</h1>
      <MainInfo
        n={n}
        title={costsDb.mainPageTitle}
        dataList={costsDb.mainPageList}
        summsOfPeriod={getTransactionList(costs)}
        cardId="costs"
        handleToggleCard={handleToggleCard}
        // foo={() => foo(2)}
      />

      <MainInfo
        n={n}
        title={incomesDb.mainPageTitle}
        dataList={incomesDb.mainPageList}
        summsOfPeriod={getTransactionList(incomes)}
        cardId="incomes"
        handleToggleCard={handleToggleCard}
        // foo={() => foo(2)}
      />

      <MainInfo title={'Баланс'} dataList={balance} />
      
      <Button title={'Все расходы'} />
      <Button title={'Все доходы'} />
    </>
  );
};

export default MainPage;
