import { useFormik } from 'formik';
import ErrorComponent from './ErrorComponent';

const withFormik = WrappedFormComponent => props => {
  const {
    options,
    initialValues,
    handleClick,
    onSubmit,
    validationSchema,
    ...rest
  } = props;

  const formik = useFormik({
    initialValues,
    onSubmit: value => onSubmit(value),
    validationSchema,
  });

  const categoryProp = options.find(({ name }) => name === 'category');
  const categoryName = categoryProp?.value || null;
  if (categoryName) {
    formik.values.category = categoryName;
  }

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
      {...rest}
    />
  );
};

export default withFormik;
