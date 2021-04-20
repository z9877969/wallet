import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch } from 'react-redux';
import MainPage from './pages/MainPage';
import TransactionPage from './pages/TransactionPage';
import PageCategoriesForPeriod from './pages/pageCategoriesForPeriod';
import PageTransactionsList from './pages/pageTransactionsList';
import costsDb from './db/costs.json';
import incomesDb from './db/incomes.json';
import {
  getCosts,
  getIncomes,
} from './redux/transactions/transactionsOperations';

const App = () => {
  const dispatch = useDispatch();
  const [activeCard, setActiveCard] = useState('');

  const handleToggleCard = (cardId = '') => {
    setActiveCard(cardId);
  };

  useEffect(() => {
    dispatch(getIncomes());
    dispatch(getCosts());
  }, []);

  return (
    <>
      <Switch>
        <Route
          path="/"
          exact
          render={roterProps => (
            <MainPage
              {...roterProps}
              costsDb={costsDb}
              incomesDb={incomesDb}
              handleToggleCard={handleToggleCard}
            />
          )}
        />
        <Route
          path="/costs"
          render={props => (
            <TransactionPage
              {...props}
              title={'Расходы'}
              handleToggleCard={handleToggleCard}
              cardId="costs"
            />
          )}
        />
        <Route
          path="/incomes"
          render={props => (
            <TransactionPage
              {...props}
              title={'Доходы'}
              handleToggleCard={handleToggleCard}
              cardId="incomes"
            />
          )}
        />
        <Route
          path="/categories/:category/list"
          render={() => <PageTransactionsList />}
        />
        {/* <Route path="/categories/:category" component={PageCategoriesForPeriod}/> */}
        <Route
          path="/categories/:category"
          render={() => <PageCategoriesForPeriod />}
        />
      </Switch>
    </>
  );
};

export default App;
