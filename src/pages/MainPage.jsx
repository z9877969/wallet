import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import MainInfo from '../components/MainInfo';
import Button from '../components/share/Button';
import help from '../utils/helpers';
import Section from '../components/share/Section/Section';

const balance = [{ name: 'Все время', value: '0,00' }];

const MainPage = props => {
  const { costsDb, incomesDb } = props;
  const history = useHistory();

  const handlerOpenCosts = () => {
    history.push('/categories/costs');
  };
  const handlerOpenIncomes = () => history.push('/categories/incomes');

  return (
    <>
      <Section title={"Журнал рассходов"}>
        <MainInfo title={costsDb.mainPageTitle} cardId="costs" />
        <MainInfo title={incomesDb.mainPageTitle} cardId="incomes" />
        <MainInfo title={'Баланс'} dataList={balance} />
        <Button title={'Все расходы'} cbOnClick={handlerOpenCosts} />
        <Button title={'Все доходы'} cbOnClick={handlerOpenIncomes} />
      </Section>
    </>
  );
};

const mapStateToProps = state => ({
  incomes: state.transactions.incomes,
  costs: state.transactions.costs,
});

export default connect(mapStateToProps)(MainPage);
