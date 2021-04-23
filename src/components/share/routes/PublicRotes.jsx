import { Redirect } from 'react-router';

const PublicRotes = props => {
  const { isAuth, component: Component, ...rest } = props;
  return !isAuth ? <Component {...rest} /> : <Redirect to="/" />;
};

export default PublicRotes;
