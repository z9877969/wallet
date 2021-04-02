const Button = ({ title, type = "button" }) => {
  return <button type={type}>{title}</button>;
};

export default Button;
