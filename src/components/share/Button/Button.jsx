const Button = ({ title, type = "button", cbOnClick }) => {
    return (
        <button
            onClick={() => {
                cbOnClick();
            }}
            type={type}
        >
            {title}
        </button>
    );
};

export default Button;
