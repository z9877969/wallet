import Form from '../share/Form/Form';
import LableInput from '../share/LableInput';

const FormTmp = ({ options, handleChange, handleClick, onSubmit }) => {
  return (
    <Form onSubmit={onSubmit}>
      {options.map(el => (
        <LableInput
          type={el.type}
          title={el.title}
          name={el.name}
          value={el.value}
          handleChange={handleChange}
        />
      ))}
    </Form>
  );
};

export default FormTmp;
