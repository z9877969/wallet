const ErrorComponent = ({ name, formik }) => {
  return formik.errors[name] && formik.touched[name] ? (
    <div>{formik.errors[name]}</div>
  ) : null;
};

export default ErrorComponent;
