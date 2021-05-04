import { useFormik } from 'formik';
import ErrorComponent from './ErrorComponent';

const withFormik = WrappedFormComponent => props => {
  const {
    options,
    initialValues,
    onSubmit,
    validationSchema,
    handleClick,
    ...rest
  } = props;

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
      handleChange={formik.handleChange.bind(formik)}
      handleClick={handleClick}
      options={optionsToWraped}
      component={({ name }) => <ErrorComponent name={name} formik={formik} />}
      {...rest}
    />
  );
};

export default withFormik;
