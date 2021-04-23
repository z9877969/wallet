import { useHistory } from 'react-router-dom';
import MainInfo from '../components/MainInfo';
import Button from '../components/share/Button';
import Section from '../components/share/Section/Section';
import Container from '../components/share/Container/Container';

const balance = [{ name: 'Все время', value: '0,00' }];

const MainPage = ({ costsDb, incomesDb }) => {
  const history = useHistory();

  const handlerOpenCosts = () => {
    history.push('/categories/costs');
  };
  const handlerOpenIncomes = () => history.push('/categories/incomes');

  return (
    <>
      <Section title={'Журнал рассходов'}>
        <MainInfo title={costsDb.mainPageTitle} cardId="costs" />
        <MainInfo title={incomesDb.mainPageTitle} cardId="incomes" />
        <MainInfo title={'Баланс'} dataList={balance} />
        <Container>
          <Button title={'Все расходы'} cbOnClick={handlerOpenCosts} />
          <Button title={'Все доходы'} cbOnClick={handlerOpenIncomes} />
        </Container>
      </Section>
    </>
  );
};

export default MainPage;
