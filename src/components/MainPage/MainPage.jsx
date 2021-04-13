import { useState } from 'react';
import MainInfo from '../MainInfo';
import Button from '../share/Button';

const balance = [{ name: 'Все время', value: '0,00' }];
const MainPage = props => {
  // const [ n, setN ] = useState(0);
  const { costsDb, incomesDb, handleToggleCard, costs, incomes, n } = props;

  // const foo = n => setN(p => {
  //   console.log('p :>> ', p);
  //   console.log('n :>> ', n);
  //   return p + n});
  // console.log('n :>> ', n);
  return (
    <>
      <h1>Журнал рассходов</h1>
      <MainInfo
        n={n}
        title={costsDb.mainPageTitle}
        dataList={costsDb.mainPageList}
        cardId="costs"
        handleToggleCard={handleToggleCard}
        // foo={() => foo(2)}
      />

      <MainInfo
        n={n}
        title={incomesDb.mainPageTitle}
        dataList={incomesDb.mainPageList}
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
