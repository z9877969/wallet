const LableInput = ({
  title,
  type = 'text',
  name,
  value,
  placeholder = '',
  handleChange,
  handleClick,
}) => {
  return (
    <label>
      {title}
      {!handleClick ? (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onClick={handleClick}
        />
      )}
    </label>
  );
};

export default LableInput;
