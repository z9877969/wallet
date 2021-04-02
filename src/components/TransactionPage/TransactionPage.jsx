import Button from "../share/Button/Button";
import Form from "../share/Form/Form";
import LableInput from "../share/LableInput/LableInput";

const TransactionPage = ({ title }) => {
  return (
    <>
      <Button title={"Go back"} />
      <h1>{title}</h1>
      <Form>
        <LableInput title="День" type="date" name="date" value="" />
        <LableInput title="Время" type="time" name="time" value="" />
        <LableInput title="Категории" type="button" name="category" value="Еда" />
        <LableInput title="Сумма" type="text" name="summ" value="" placeholder="Введите сумму" />
        <LableInput title="Валюта" type="button" name="currency" value="RUB" />
        <LableInput title="Комментарий" type="text" name="comment" value="" placeholder="Комментарий" />
      </Form>
    </>
  );
};

export default TransactionPage;
