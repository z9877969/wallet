import Container from '../_share/Container/Container';
import Form from '../_share/Form';
import LableInput from '../_share/LableInput';
import Section from '../_share/Section/Section';

const LoginForm = ({ login, password, handleChange }) => {
  return (
    <Section>
      <Container>
        <Form>
          <LableInput
            title="Login"
            name={'login'}
            value={login}
            onChange={handleChange}
          />
          <LableInput
            title="Password"
            name={'password'}
            value={password}
            onChange={handleChange}
          />
        </Form>
      </Container>
    </Section>
  );
};

export default LoginForm;
