const Button = ({
  title,
  type = 'button',
  cbOnClick,
  className,
  cbArgs = [],
}) => {
  return (
    <button
      className={className}
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
