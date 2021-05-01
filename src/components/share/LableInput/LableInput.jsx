import css from './LabelInput.module.css';

const LableInput = ({
  id,
  title,
  type = 'text',
  name,
  value,
  placeholder = '',
  handleChange,
  handleClick,
}) => {
  return (
    <label className={css.label}>
      {title}
      {!handleClick ? (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
      ) : (
        <input
          id={id}
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
