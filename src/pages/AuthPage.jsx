import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import AuthForm from '../components/AuthForm/AuthForm';
import { userRegister, userLogin } from '../redux/auth/authOperation';

const AuthPage = () => {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  const handleSubmit = ({login, password}) => {
    const data = {password, email: login}
    
    path === '/login' && dispatch(userLogin(data));
    path === '/register' && dispatch(userRegister(data));
  };
  return <AuthForm handleSubmit={handleSubmit} path={path} />;
};

export default AuthPage;
