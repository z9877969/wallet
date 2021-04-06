import { Component } from 'react';
import moment from 'moment';
import Button from '../share/Button';
import Form from '../share/Form';
import LableInput from '../share/LableInput';

class TransactionPage extends Component {
  state = {
    date: moment().format('YYYY-MM-DD'),
    time: moment().format('HH:mm'),
    category: this.props.cardId === 'costs' ? 'еда' : 'Зарплата',
    summ: '',
    currency: 'RUB',
    comment: '',
  };

  handleSubmitTransaction = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state, this.props.cardId);
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const { title, handleToggleCard } = this.props;
    const { date, time, category, summ, currency, comment } = this.state;

    return (
      <>
        <Button cbOnClick={handleToggleCard} title={'Go back'} />
        <h1>{title}</h1>
        <Form onSubmit={this.handleSubmitTransaction}>
          <LableInput
            title="День"
            type="date"
            name="date"
            value={date}
            handleChange={this.handleChange}
          />
          <LableInput
            title="Время"
            type="time"
            name="time"
            value={time}
            handleChange={this.handleChange}
          />
          <LableInput
            title="Категории"
            type="button"
            name="category"
            value={category}
            handleChange={this.handleChange}
          />
          <LableInput
            title="Сумма"
            type="text"
            name="summ"
            value={summ}
            handleChange={this.handleChange}
            placeholder="Введите сумму"
          />
          <LableInput
            title="Валюта"
            type="button"
            name="currency"
            value={currency}
            handleChange={this.handleChange}
          />
          <LableInput
            title="Комментарий"
            type="text"
            name="comment"
            value={comment}
            handleChange={this.handleChange}
            placeholder="Комментарий"
          />
        </Form>
      </>
    );
  }
}

export default TransactionPage;
