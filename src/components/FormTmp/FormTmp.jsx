import Form from '../share/Form/Form';
import LableInput from '../share/LableInput';

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
            id={el.name}
            type={el.type}
            title={el.title}
            name={el.name}
            value={el.value}
            placeholder={el.placeholder}
            handleChange={el.type !== 'button' ? handleChange : null}
            handleClick={el.type === 'button' ? handleClick : null}
          />
          {el.isValidate && <Component name={el.name} />}
        </>
      ))}
    </Form>
  );
};

export default FormTmp;
