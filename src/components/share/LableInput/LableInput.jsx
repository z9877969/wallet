const LableInput = ({ title, type = "text", name, value, placeholder = "" }) => {
  return (
    <label>
      {title}
      <input type={type} name={name} value={value} placeholder={placeholder} />
    </label>
  );
};

export default LableInput;
