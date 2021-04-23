import { Redirect } from 'react-router';

const PrivatRoute = props => {
  const { component: Component, isAuth, ...rest } = props;
  return isAuth ? <Component {...rest} /> : <Redirect to="/login" />;
};

export default PrivatRoute;
