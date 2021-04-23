import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './pages/MainPage';
import TransactionPage from './pages/TransactionPage';
import PageCategoriesForPeriod from './pages/pageCategoriesForPeriod';
import PageTransactionsList from './pages/pageTransactionsList';
import AuthHeader from './components/AuthHeader/AuthHeader';
import AuthPage from './pages/AuthPage';
import costsDb from './db/costs.json';
import incomesDb from './db/incomes.json';
import {
  getCosts,
  getIncomes,
} from './redux/transactions/transactionsOperations';
import { getIsAuth } from './redux/auth/authSelector';
import { logout } from './redux/auth/authAction';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);

  const handleLogout = () => dispatch(logout());

  useEffect(() => {
    dispatch(getIncomes());
    dispatch(getCosts());
  }, []);

  return (
    <>
      <AuthHeader isAuth={isAuth} handleLogout={handleLogout} />
      {/* <AuthHeader {...{ isAuth, handleLogout }} /> */}
      {!isAuth ? (
        <>
          <Switch>
            <Route path="/login" component={AuthPage} />
            <Route path="/register" component={AuthPage} />
            <Redirect to="/login" />
          </Switch>
        </>
      ) : (
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
                />
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
            <Redirect to="/" />
          </Switch>
        </>
      )}
    </>
  );
};

export default App;
