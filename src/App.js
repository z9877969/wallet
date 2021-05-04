import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './pages/MainPage';
import TransactionPage from './pages/TransactionPage';
import PageCategoriesForPeriod from './pages/CategoriesForPeriodPage';
import PageTransactionsList from './pages/TransactionsListPage';
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
  const { push, location } = useHistory();
  // const isAuth = useSelector(getIsAuth);
  const isAuth = useSelector(getIsToken);
  // const isAuth = true;
  const error = useSelector(state => state.error);
  const [locationBeforeError, setLocationBeforeError] = useState(location);

  const handleLogout = () => dispatch(logoutSuccess());

  // needs after refresh
  useEffect(() => {
    if (isAuth) {
      dispatch(getTransactions());
    }
    // setLocationBeforeError(location);
  }, []);

  //needds after auth
  useEffect(() => {
    if (isAuth) {
      dispatch(getTransactions());
    }
  }, [isAuth]);

  useEffect(() => {
    const isAuth = !error?.message.includes('code 401')
    isAuth && setLocationBeforeError(location);
    !isAuth && dispatch(userRefresh());
  }, [error?.message, location]);

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
            {error?.message.includes('code 401') && <Redirect to={locationBeforeError}/>}
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
