import { useState, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import Container from '../share/Container/Container';
// import Form from '../share/Form';
import Form from '../FormTmp/FormTmp';
import LableInput from '../share/LableInput';
import Section from '../share/Section/Section';
import loginForm from '../../assets/options/loginForm';

const initialFormState = {
  login: '',
  password: '',
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'login':
      return { ...state, login: payload };
    case 'password':
      return { ...state, password: payload };
    case 'reset':
      return initialFormState;
    default:
      return state;
  }
};

const AuthForm = ({ handleSubmit, path }) => {
  const [state, dispatch] = useReducer(reducer, initialFormState);

  const { login, password } = state;
  const handleChange = e => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
  };
  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(state);
    dispatch({ type: initialFormState });
  };

  const options = loginForm.map(el => ({
    ...el, value: state[el.name]
  }))

  return (
    <Section>
      <Container>
        <Form
          options={options}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
        {/* <Form onSubmit={onSubmit}> */}
        {/* {loginForm.map(el => (
            <LableInput
              title={el.title}
              name={el.name}
              value={state[el.name]}
              handleChange={handleChange}
            />
          ))} */}
        {/* <LableInput
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
          /> */}
        {/* </Form> */}
        {path === '/login' && <NavLink to="/register">SignUp</NavLink>}
        {path === '/register' && <NavLink to="/login">LogIn</NavLink>}
      </Container>
    </Section>
  );
};

export default AuthForm;
