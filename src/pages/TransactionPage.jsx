import { Component } from 'react';
import moment from 'moment';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import Button from '../components/share/Button';
import Form from '../components/share/Form';
import LableInput from '../components/share/LableInput';
import CategoriesList from '../components/CategoriesList';
import Section from '../components/share/Section/Section';
import Container from '../components/share/Container/Container';

import costsOpts from '../db/costs.json';
import incomesOpts from '../db/incomes.json';

import { addIncomes, addCosts } from '../redux/transactions/transactionsAction';

const { categoriesList: costsList } = costsOpts;
const { categoriesList: incomesList } = incomesOpts;

class TransactionPage extends Component {
  state = {
    date: moment().format('YYYY-MM-DD'),
    time: moment().format('HH:mm'),
    category:
      this.props.match.url.slice(1) === 'costs'
        ? { id: 'food', name: 'Еда' }
        : { id: 'salary', name: 'Зарплата' },
    summ: '',
    currency: 'RUB',
    comment: '',
    isCategoriesList: false,
  };

  handleSubmitTransaction = e => {
    const { match, addCosts, addIncomes } = this.props;
    const { isCategoriesList, ...dataForm } = this.state;
    const cardId = match.url.slice(1);
    e.preventDefault();
    cardId === 'incomes' && addIncomes(dataForm);
    cardId === 'costs' && addCosts(dataForm);

    this.handleGoToHome();
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  openCategoriesList = () => {
    const { history, location } = this.props;
    const baseLocation = {
      pathname: `${location.pathname}/category`,
      state: location,
    };
    history.push(baseLocation);
  };

  onSetCategory = opts => {
    this.setState({
      category: opts,
    });
    this.handleGoBack();
  };

  handleGoBack = () => {
    this.props.history.push(this.props.location.state);
  };

  handleGoToHome = () => {
    this.props.history.push('/');
  };

  render() {
    const { title, match } = this.props;
    const cardId = match.url.slice(1);
    const { date, time, category, summ, currency, comment } = this.state;

    return (
      <>
        {this.props.location.pathname === `/${cardId}` && (
          <Section>
            <Container>
              <Button cbOnClick={this.handleGoToHome} title={'Go back'} />
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
            </Container>
          </Section>
        )}
        <Route
          path={`${this.props.match.url}/category`}
          render={props => (
            <CategoriesList
              {...props}
              handleGoBack={this.handleGoBack}
              onCategoryClick={this.onSetCategory}
              categoriesList={
                this.props.cardId === 'costs' ? costsList : incomesList
              }
            />
          )}
        />
      </>
    );
  }
}

// const mapStateToProps = store => ({
//   incomes: store.transactions.incomes,
// });

// const mapDispatchToProps = dispatch => ({
//   addIncomes(data) {
//     return dispatch(addIncomes(data));
//   },
// });

const mapDispatchToProps = {
  addIncomes,
  addCosts,
};

// this.props.incomes

export default connect(null, mapDispatchToProps)(TransactionPage);

// const con = (mSTP, mDTP) => (component) => "UpdateComponent"
