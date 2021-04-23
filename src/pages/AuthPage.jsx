import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm';
import { login, register } from '../redux/auth/authAction';

const AuthPage = () => {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  const handleSubmit = data => {
    path === '/login' && dispatch(login(data));
    path === '/register' && dispatch(register(data));
  };
  return <LoginForm handleSubmit={handleSubmit} path={path} />;
};

export default AuthPage;
