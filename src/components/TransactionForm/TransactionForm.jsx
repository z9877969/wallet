import { useLocation } from 'react-router-dom';
import FormTmp from '../FormTmp/FormTmp';
import withFormik from '../hoc/withFormik/withFormik';
import Button from '../share/Button';
import Container from '../share/Container/Container';
import Section from '../share/Section/Section';

const TransactionForm = ({
  children,
  title,
  cardId,
  handleGoToHome,
  component,
  options,
  handleClick,
  handleChange,
  onSubmit,
}) => {
  const location = useLocation();
  
  return (
    <>
      {location.pathname === `/${cardId}` && (
        <Section>
          <Container>
            <Button cbOnClick={handleGoToHome} title={'Go back'} />
            <h1>{title}</h1>

            <FormTmp
              options={options}
              handleClick={handleClick}
              handleChange={handleChange}
              component={component}
              onSubmit={onSubmit}
            />
          </Container>
        </Section>
      )}
      {children.component(handleChange)}
    </>
  );
};

export default withFormik(TransactionForm);
