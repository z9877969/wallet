import { useFormik } from 'formik';
import ErrorComponent from './ErrorComponent';

const withFormik = WrappedFormComponent => props => {
  const { options, handleClick, onSubmit, validationSchema } = props;
  
  const initialValues = options.reduce((acc, { name, value }) => {
    acc[name] = value;
    return acc;
  }, {});

  const formik = useFormik({
    initialValues,
    onSubmit: value => onSubmit(value),
    validationSchema,
  });

  const optionsToWraped = options.map(({ value, name, ...rest }) => ({
    ...rest,
    name,
    value: formik.values[name],
  }));

  return (
    <WrappedFormComponent
      onSubmit={formik.handleSubmit}
      handleChange={formik.handleChange}
      handleClick={handleClick}
      options={optionsToWraped}
      component={({ name }) => <ErrorComponent name={name} formik={formik} />}
    />
  );
};

export default withFormik;
