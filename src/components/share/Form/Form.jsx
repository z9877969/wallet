import { Children } from "react";
import Button from "../Button/Button";

const Form = ({ children }) => {
  console.log(children);
  return (
    <form>
      <Button title={"ok"} type={"submit"} />
      {children}
    </form>
  );
};

export default Form;
