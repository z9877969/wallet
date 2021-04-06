const Button = ({ title, type = "button", cbOnClick, className }) => {
  return (
    <button
      className={className}
      onClick={() => {
        cbOnClick && cbOnClick();
      }}
      type={type}
    >
      {title}
    </button>
  );
};

export default Button;
