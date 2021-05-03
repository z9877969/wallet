import { NavLink } from 'react-router-dom';
import Container from '../share/Container/Container';
import FormTmp from '../FormTmp/FormTmp';
import Section from '../share/Section/Section';
import authFormOpts from '../../assets/options/authForm';
import schema from '../../assets/validation/authValidateSchema';
import withFormik from '../hoc/withFormik/withFormik';  

const AuthForm = ({ handleSubmit,options, path, handleChange, onSubmit, component }) => {

  return (
    <Section>
      <Container>
        <FormTmp
          options={options}
          onSubmit={onSubmit}
          handleChange={handleChange}
          validationSchema={schema}
          component={component}
        />
        {path === '/login' && <NavLink to="/register">SignUp</NavLink>}
        {path === '/register' && <NavLink to="/login">LogIn</NavLink>}
      </Container>
    </Section>
  );
};

export default withFormik(AuthForm);
