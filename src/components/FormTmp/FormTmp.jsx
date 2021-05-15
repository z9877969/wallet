import { Fragment } from 'react';
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
      {options.map((el, i) => (
        <Fragment key={el.name}>
          <LableInput
            id={el.name}
            type={el.type}
            title={el.title}
            name={el.name}
            value={el.value}
            placeholder={el.placeholder}
            handleChange={el.type !== 'button' ? handleChange : null}
            handleClick={el.type === 'button' ? handleClick : null}
          />
          {el.isValidate && <Component name={el.name} key={el.name} />}
        </Fragment>
      ))}
    </Form>
  );
};

export default FormTmp;
