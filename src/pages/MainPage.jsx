import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import MainInfo from '../components/MainInfo';
import Button from '../components/share/Button';

import help from '../utils/helpers';

const balance = [{ name: 'Все время', value: '0,00' }];

const MainPage = props => {
  const { costsDb, incomesDb, handleToggleCard, costs, incomes } = props;

  const history = useHistory();

  const handlerOpenCosts = () => {
    console.log('handlerOpenCosts');
    history.push('/categories/costs');
  };
  const handlerOpenIncomes = () => history.push('/categories/incomes');

  return (
    <>
      <h1>Журнал рассходов</h1>
      <MainInfo
        title={costsDb.mainPageTitle}
        dataList={costsDb.mainPageList}
        summsOfPeriod={help.getTransactionPeriodsList(costs)}
        cardId="costs"
        handleToggleCard={handleToggleCard}
      />
      <MainInfo
        title={incomesDb.mainPageTitle}
        dataList={incomesDb.mainPageList}
        summsOfPeriod={help.getTransactionPeriodsList(incomes)}
        cardId="incomes"
        handleToggleCard={handleToggleCard}
      />
      <MainInfo title={'Баланс'} dataList={balance} />
      <Button title={'Все расходы'} cbOnClick={handlerOpenCosts} />
      <Button title={'Все доходы'} cbOnClick={handlerOpenIncomes} />
    </>
  );
};

const mapStateToProps = state => ({
  incomes: state.transactions.incomes,
  costs: state.transactions.costs,
});

export default connect(mapStateToProps)(MainPage);
