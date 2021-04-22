import React, { useEffect } from 'react';
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
            <MainPage {...roterProps} costsDb={costsDb} incomesDb={incomesDb} />
          )}
        />
        <Route
          exact
          path="/categories/:category/list"
          render={() => <PageTransactionsList />}
        />
        <Route
          path="/:category/:transactionId/edit"
          component={TransactionPage}
        />
        <Route
          path="/categories/:category"
          render={() => <PageCategoriesForPeriod />}
        />
        <Route
          path="/costs"
          render={props => <TransactionPage {...props} title={'Расходы'} />}
        />
        <Route
          path="/incomes"
          render={props => <TransactionPage {...props} title={'Доходы'} />}
        />
      </Switch>
    </>
  );
};

export default App;
