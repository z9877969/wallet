import { NavLink } from 'react-router-dom';
import Container from '../share/Container/Container';
import FormTmp from '../FormTmp/FormTmp';
import Section from '../share/Section/Section';
import authFormOpts from '../../assets/options/authForm';
import schema from '../../assets/validation/authValidateSchema';

const AuthForm = ({ handleSubmit, path }) => {
  const onSubmit = data => handleSubmit(data);

  return (
    <Section>
      <Container>
        <FormTmp
          options={authFormOpts}
          onSubmit={onSubmit}
          validationSchema={schema}
        />
        {path === '/login' && <NavLink to="/register">SignUp</NavLink>}
        {path === '/register' && <NavLink to="/login">LogIn</NavLink>}
      </Container>
    </Section>
  );
};

export default AuthForm;
