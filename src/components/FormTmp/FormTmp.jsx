import Form from '../share/Form/Form';
import LableInput from '../share/LableInput';
import withFormik from '../hoc/withFormik/withFormik';

const FormTmp = ({
  options,
  handleChange,
  handleClick,
  onSubmit,
  component: Component,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      {options.map(el => (
        <>
          <LableInput
            key={el.name}
            id={el.id}
            type={el.type}
            title={el.title}
            name={el.name}
            value={el.value}
            handleChange={handleChange || null}
            handleClick={handleClick || null}
          />
          <Component name={el.name} />
        </>
      ))}
    </Form>
  );
};

export default withFormik(FormTmp);
