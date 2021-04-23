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
import AuthHeader from './components/AuthHeader/AuthHeader';
import PublicRotes from './components/_routes/PublicRotes';
import LoginPage from './pages/LoginPage';
import PrivatRoute from './components/_routes/PrivatRoute';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIncomes());
    dispatch(getCosts());
  }, []);

  const isAuth = true;

  return (
    <>
      <AuthHeader />
      <Switch>
        <PublicRotes path="/login" isAuth={isAuth} component={LoginPage} />
        <PublicRotes path="/register" isAuth={isAuth} component={LoginPage} />
        <PrivatRoute
          isAuth={isAuth}
          path="/"
          exact={true}
          component={MainPage}
          {...{ costsDb, incomesDb, isAuth }}
        />
        <PrivatRoute
          isAuth={isAuth}
          path="/categories/:category/list"
          // exact={true}
          component={PageTransactionsList}
        />
        <PrivatRoute
          isAuth={isAuth}
          path="/:category/:transactionId/edit"
          component={TransactionPage}
        />
        <PrivatRoute
          isAuth={isAuth}
          // exact
          path="/:category/categories"
          component={PageCategoriesForPeriod}
        />
        <PrivatRoute
          isAuth={isAuth}
          path="/costs"
          title="Расходы"
          component={TransactionPage}
        />
        <PrivatRoute
          isAuth={isAuth}
          path="/incomes"
          title="Доходы"
          component={TransactionPage}
        />
        {/* <Route
          path="/incomes"
          render={props => <TransactionPage {...props} title={'Доходы'} />}
        /> */}
      </Switch>
    </>
  );
};

export default App;
