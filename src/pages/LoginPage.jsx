import { useState } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';

const initialLoginForm = {
  login: '',
  password: '',
};

const LoginPage = () => {
  const [dataForm, setDataForm] = useState(initialLoginForm);
  const { login, password } = dataForm;
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDataForm({ ...dataForm, [name]: value });
  };
  return (
    <LoginForm login={login} password={password} handleChange={handleChange} />
  );
};

export default LoginPage;
