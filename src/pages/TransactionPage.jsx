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
import {
  addCosts,
  addIncomes,
  editCosts,
  editIncomes,
} from '../redux/transactions/transactionsOperations';

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
  };

  componentDidMount() {
    const { category, transactionId } = this.props.match.params;
    const data = this.props[category] || [];
    const editTransaction = data.find(({ id }) => id === Number(transactionId));
    if (category && transactionId) {
      this.setState({ ...editTransaction });
    }
  }

  handleSubmitTransaction = e => {
    const { category, transactionId } = this.props.match.params;
    const { match, addCosts, addIncomes, editIncomes, editCosts } = this.props;
    const { ...dataForm } = this.state;
    const cardId = match.url.slice(1);
    e.preventDefault();

    if (category && transactionId) {
      category === 'incomes' && editIncomes(transactionId, this.state);
      category === 'costs' && editCosts(transactionId, this.state);
      this.handleGoToHome();
    }

    cardId === 'incomes' && addIncomes(dataForm);
    cardId === 'costs' && addCosts(dataForm);
    this.handleGoToHome();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  openCategoriesList = () => {
    const { history, location, match } = this.props;
    const nextLocation = {
      pathname: `${match.url}/category`,
      state: { from: location },
    };
    history.push(nextLocation);
  };

  onSetCategory = opts => {
    this.setState({
      category: opts,
    });
    this.handleGoBack();
  };

  handleGoBack = () => {
    this.props.history.push(this.props.location.state.from);
  };

  handleGoToHome = () => {
    this.props.history.push('/');
  };

  render() {
    const { title, match, location } = this.props;
    const cardId = match.url.slice(1);
    const { date, time, category, summ, currency, comment } = this.state;

    return (
      <>
        {location.pathname === `/${cardId}` && (
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
          path={`${match.path}/category`}
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

const mapStateToProps = store => ({
  incomes: store.transactions.incomes,
  costs: store.transactions.costs,
});

// const mapDispatchToProps = dispatch => ({
//   addIncomes(data) {
//     return dispatch(addIncomes(data));
//   },
// });

const mapDispatchToProps = {
  addIncomes,
  addCosts,
  editIncomes,
  editCosts,
};

// this.props.incomes

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);

// const con = (mSTP, mDTP) => (component) => "UpdateComponent"
