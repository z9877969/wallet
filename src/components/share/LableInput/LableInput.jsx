const LableInput = ({
    title,
    type = "text",
    name,
    value,
    placeholder = "",
    handleChange,
}) => {
    return (
        <label>
            {title}
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
            />
        </label>
    );
};

export default LableInput;
