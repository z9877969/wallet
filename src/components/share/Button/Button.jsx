import css from './Button.module.css';

const Button = ({
  title,
  icon,
  type = 'button',
  cbOnClick,
  className,
  style,
  cbArgs = [],
}) => {
  return (
    <button
      className={`${className} ${css.btn}`}
      style={style ? style : null}
      onClick={() => {
        cbOnClick && cbOnClick(...cbArgs);
      }}
      type={type}
    >
      {title ? (
        title
      ) : icon ? (
        <svg>
          <use href={icon.path + '#' + icon.id}></use>
        </svg>
      ) : null}
    </button>
  );
};

export default Button;
