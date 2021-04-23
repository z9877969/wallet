import { Redirect, Route } from 'react-router';

const PublicRotes = props => {
  const { isAuth, path, component: Component, ...rest } = props;
  console.log('props_public :>> ', props);
  return !isAuth ? (
    <Route
      path={path}
      render={routerProps => <Component {...rest} {...routerProps} />}
    />
  ) : (
    <Redirect to="/" />
  );
};

export default PublicRotes;
