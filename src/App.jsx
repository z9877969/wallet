import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './pages/MainPage';
import TransactionPage from './pages/TransactionPage';
import CategoriesForPeriodPage from './pages/CategoriesForPeriodPage';
import PageTransactionsList from './pages/TransactionsListPage';
import AuthHeader from './components/AuthHeader/AuthHeader';
import AuthPage from './pages/AuthPage';
import { getTransactions } from './redux/transactions/transactionsOperations';
import { getIsAuth, getIsToken } from './redux/auth/authSelector';
import { logoutSuccess, setIsAuth } from './redux/auth/authAction';
import { userRefresh } from './redux/auth/authOperation';
import { getNeedRefresh } from './redux/error/errorSelector';
import { hasTransactions } from './redux/transactions/transactionsSelector';

const App = () => {
  const dispatch = useDispatch();
  const { location } = useHistory();
  const isAuth = useSelector(getIsAuth);
  const isToken = useSelector(getIsToken);
  const needRefresh = useSelector(getNeedRefresh);
  const hasTrans = useSelector(hasTransactions);
  const [locationBeforeError, setLocationBeforeError] = useState(location);

  const handleLogout = () => dispatch(logoutSuccess());

  useEffect(() => {
    isToken && dispatch(setIsAuth(true));
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(getTransactions());
    }
  }, [isAuth]);

  useEffect(() => {
    !needRefresh ? setLocationBeforeError(location) : dispatch(userRefresh());
  }, [needRefresh, location]);

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
            {needRefresh && <Redirect to={locationBeforeError} />}
            <Route path="/" exact component={MainPage} />
            <Route
              exact
              path="/categories/:category/list"
              component={PageTransactionsList}
            />
            <Route
              path="/:category/:transactionId/edit"
              component={TransactionPage}
            />
            <Route
              path="/categories/:category"
              render={() => <CategoriesForPeriodPage />}
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
