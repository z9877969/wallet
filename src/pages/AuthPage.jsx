import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import AuthForm from '../components/AuthForm/AuthForm';
import { login, register } from '../redux/auth/authAction';

const AuthPage = () => {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  const handleSubmit = data => {
    path === '/login' && dispatch(login(data));
    path === '/register' && dispatch(register(data));
  };
  return <AuthForm handleSubmit={handleSubmit} path={path} />;
};

export default AuthPage;
