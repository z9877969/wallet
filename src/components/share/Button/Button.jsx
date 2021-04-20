import css from './Button.module.css';

const Button = ({
  title,
  type = 'button',
  cbOnClick,
  className,
  cbArgs = [],
}) => {
  return (
    <button
      className={`${className} ${css.btn}`}
      onClick={() => {
        cbOnClick && cbOnClick(...cbArgs);
      }}
      type={type}
    >
      {title}
    </button>
  );
};

export default Button;
