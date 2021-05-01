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
import { getTransactions } from './redux/transactions/transactionsOperations';
import { getIsAuth, getIsToken } from './redux/auth/authSelector';
import { logoutSuccess } from './redux/auth/authAction';
import { userRefresh } from './redux/auth/authOperation';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsToken);
  // const isAuth = true;
  const error = useSelector(state => state.error);

  const handleLogout = () => dispatch(logoutSuccess());

  useEffect(() => {
    if (isAuth) {
      dispatch(getTransactions());
    }
  }, [isAuth]);

  useEffect(() => {
    error?.message.includes('code 401') && dispatch(userRefresh());
    // : error && dispatch(logoutSuccess());
  }, [error?.message]);

  return (
    <>
      <AuthHeader isAuth={isAuth} handleLogout={handleLogout} />
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
