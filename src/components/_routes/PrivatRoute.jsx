import { Redirect, Route } from 'react-router';

const PrivatRoute = props => {
  const { component: Component, path, isAuth, exact, ...rest } = props;
  console.log('props :>> ', props);
  return isAuth ? (
    // exact ? (
    <Route
      path={path}
      exact
      render={routerProps => <Component {...rest} {...routerProps} />}
    />
  ) : (
    //   : (
    //     <Route
    //       path={path}
    //       render={routerProps => <Component {...rest} {...routerProps} />}
    //     />
    //   )
    // )
    <Redirect to="/login" />
  );
};

export default PrivatRoute;
