import { Component } from 'react';
import moment from 'moment';
import Button from '../share/Button';
import Form from '../share/Form';
import LableInput from '../share/LableInput';
import CategoriesList from '../CategoriesList';

import costsOpts from '../../db/costs.json';
import incomesOpts from '../../db/incomes.json';

const { categoriesList: costsList } = costsOpts;
const { categoriesList: incomesList } = incomesOpts;

class TransactionPage extends Component {
  state = {
    date: moment().format('YYYY-MM-DD'),
    time: moment().format('HH:mm'),
    category:
      this.props.cardId === 'costs'
        ? { id: 'food', name: 'Еда' }
        : { id: 'salary', name: 'Зарплата' },
    summ: '',
    currency: 'RUB',
    comment: '',
    isCategoriesList: false,
  };

  handleSubmitTransaction = e => {
    const { isCategoriesList, ...dataForm } = this.state;
    e.preventDefault();
    this.props.handleSubmit(dataForm, this.props.cardId);
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  openCategoriesList = () => {
    this.setState({
      isCategoriesList: true,
    });
  };

  onSetCategory = opts => {
    this.setState({
      category: opts,
    });
  };

  render() {
    const { title, handleToggleCard } = this.props;
    const {
      date,
      time,
      category,
      summ,
      currency,
      comment,
      isCategoriesList,
    } = this.state;

    return !isCategoriesList ? (
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
            value={category.name}
            // handleChange={this.handleChange}
            handleClick={this.openCategoriesList}
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
    ) : (
      <CategoriesList
        onCategoryClick={this.onSetCategory}
        categoriesList={this.props.cardId === 'costs' ? costsList : incomesList}
      />
    );
  }
}

export default TransactionPage;
