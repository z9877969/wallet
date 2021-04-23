import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Container from '../share/Container/Container';
import Form from '../share/Form';
import LableInput from '../share/LableInput';
import Section from '../share/Section/Section';

const initialFormState = {
  login: '',
  password: '',
};

const AuthForm = ({ handleSubmit, path }) => {
  const [dataForm, setDataForm] = useState(initialFormState);
  const { login, password } = dataForm;
  const handleChange = e => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };
  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(dataForm);
    setDataForm(initialFormState);
  };

  return (
    <Section>
      <Container>
        <Form onSubmit={onSubmit}>
          <LableInput
            title="Login"
            name="login"
            value={login}
            handleChange={handleChange}
          />
          <LableInput
            title="Password"
            name="password"
            value={password}
            handleChange={handleChange}
          />
        </Form>
        {path === '/login' && <NavLink to="/register">SignUp</NavLink>}
        {path === '/register' && <NavLink to="/login">LogIn</NavLink>}
      </Container>
    </Section>
  );
};

export default AuthForm;
