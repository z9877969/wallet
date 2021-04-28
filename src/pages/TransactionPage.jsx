import { Component, useEffect, useReducer, useState } from 'react';
import moment from 'moment';
import { Route, useHistory, useLocation, useRouteMatch } from 'react-router';
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

// let i = 0

const reducer = (state, action) => {
  switch (action.type) {
    case 'date':
      return { ...state, date: action.payload };
    case 'time':
      return { ...state, time: action.payload };
    case 'category':
      return { ...state, category: action.payload };
    case 'summ':
      return { ...state, summ: action.payload };
    case 'currency':
      return { ...state, currency: action.payload };
    case 'comment':
      return { ...state, comment: action.payload };
    case 'initialEdit':
      return { ...action.payload };
    default:
      return state;
  }
};

const TransactionPage = props => {
  const {
    match,
    location,
    history,
    addCosts,
    addIncomes,
    editIncomes,
    editCosts,
    title,
  } = props;
  const cardId = match.url.slice(1);

  // const matchHook = useRouteMatch();
  // const locationHook = useLocation();
  // const historyHook = useHistory();

  // console.log('matchHook :>> ', matchHook);
  // console.log('locationHook :>> ', locationHook);
  // console.log('historyHook :>> ', historyHook);

  const initialState = {
    date: moment().format('YYYY-MM-DD'),
    time: moment().format('HH:mm'),
    category:
      match.url.slice(1) === 'costs'
        ? { id: 'food', name: 'Еда' }
        : { id: 'salary', name: 'Зарплата' },
    summ: '',
    currency: 'RUB',
    comment: '',
  };

  // const [dataForm, setDataForm] = useState(initialState);
  const [stateForm, dispatch] = useReducer(reducer, initialState);

  const handleSubmitTransaction = e => {
    const { category, transactionId } = match.params;
    e.preventDefault();

    if (category && transactionId) {
      category === 'incomes' && editIncomes(transactionId, stateForm);
      category === 'costs' && editCosts(transactionId, stateForm);
      handleGoToHome();
    }

    cardId === 'incomes' && addIncomes(stateForm);
    cardId === 'costs' && addCosts(stateForm);
    handleGoToHome();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    // setDataForm({ ...dataForm, [name]: value });
    dispatch({ type: name, payload: value });
  };

  const openCategoriesList = () => {
    const nextLocation = {
      pathname: `${match.url}/category`,
      state: { from: location },
    };
    history.push(nextLocation);
  };

  const onSetCategory = opts => {
    // setDataForm({ ...dataForm, category: opts });
    dispatch({ type: 'category', payload: opts });
    handleGoBack();
  };

  const handleGoBack = () => {
    history.push(location.state.from);
  };

  const handleGoToHome = () => {
    history.push('/');
  };

  useEffect(() => {
    const { category, transactionId } = match.params;
    const data = props[category] || [];
    const editTransaction = data.find(({ id }) => id === Number(transactionId));
    if (category && transactionId) {
      // setDataForm({ ...editTransaction });
      dispatch({ type: 'initialEdit', payload: editTransaction });
    }
  }, []);
  // useEff`ect(() => {
  //   cardId === "incomes" && console.log('cardId :>> ', cardId);
  // }, [cardId]);`

  // useEffect(() => {
  //   i+=1;
  // }, [dataForm.summ])

  return (
    <>
      {location.pathname === `/${cardId}` && (
        <Section>
          <Container>
            <Button cbOnClick={handleGoToHome} title={'Go back'} />
            <h1>{title}</h1>
            <Form onSubmit={handleSubmitTransaction}>
              {getInputs(stateForm, {
                handleChange: handleChange,
                handleClick: openCategoriesList,
              }).map(
                ({ title, type, name, value, handleChange, handleClick }) => (
                  <LableInput
                    key={name}
                    title={title}
                    type={type}
                    name={name}
                    value={value}
                    handleChange={handleChange}
                    handleClick={handleClick}
                  />
                ),
              )}
            </Form>
          </Container>
        </Section>
      )}
      <Route
        path={`${match.path}/category`}
        render={props => (
          <CategoriesList
            {...props}
            handleGoBack={handleGoBack}
            onCategoryClick={onSetCategory}
            categoriesList={props.cardId === 'costs' ? costsList : incomesList}
          />
        )}
      />
    </>
  );
};

const mapStateToProps = store => ({
  incomes: store.transactions.incomes,
  costs: store.transactions.costs,
});

const mapDispatchToProps = {
  addIncomes,
  addCosts,
  editIncomes,
  editCosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);

function getInputs(state, cbs) {
  return [
    {
      title: 'День',
      type: 'date',
      name: 'date',
      value: state.date,
      handleChange: cbs['handleChange'],
    },
    {
      title: 'Время',
      type: 'time',
      name: 'time',
      value: state.time,
      handleChange: cbs['handleChange'],
    },
    {
      title: 'Категории',
      type: 'button',
      name: 'category',
      value: state.category.name,
      handleClick: cbs['handleClick'],
    },
    {
      title: 'Сумма',
      type: 'text',
      name: 'summ',
      value: state.summ,
      handleChange: cbs['handleChange'],
    },
    {
      title: 'Валюта',
      type: 'text',
      name: 'currency',
      value: state.currency,
      handleChange: cbs['handleChange'],
    },
    {
      title: 'Комментарий',
      type: 'text',
      name: 'comment',
      value: state.comment,
      handleChange: cbs['handleChange'],
    },
  ];
}
