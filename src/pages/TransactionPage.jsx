import { Component, useEffect, useReducer, useState } from 'react';
import moment from 'moment';
import { Route, useHistory, useLocation, useRouteMatch } from 'react-router';
import { connect, useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../components/share/Button';
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
import getFormOpts from '../assets/options/transactionForm';
import FormTmp from '../components/FormTmp/FormTmp';

const { categoriesList: costsList } = costsOpts;
const { categoriesList: incomesList } = incomesOpts;

// let i = 0

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'date':
//       return { ...state, date: action.payload };
//     case 'time':
//       return { ...state, time: action.payload };
//     case 'category':
//       return { ...state, category: action.payload };
//     case 'summ':
//       return { ...state, summ: action.payload };
//     case 'currency':
//       return { ...state, currency: action.payload };
//     case 'comment':
//       return { ...state, comment: action.payload };
//     case 'initialEdit':
//       return { ...action.payload };
//     default:
//       return state;
//   }
// };

const TransactionPage = props => {
  const { match, location, history, title } = props;
  const dispatch = useDispatch();
  const { incomes, costs } = useSelector(state => state.transactions);
  const [initForm, setInitForm] = useState({
    date: moment().format('YYYY-MM-DD'),
    time: moment().format('HH:mm'),
    category:
      match.url.slice(1) === 'costs'
        ? { id: 'food', name: 'Еда' }
        : { id: 'salary', name: 'Зарплата' },
    summ: '',
    currency: 'RUB',
    comment: '',
  });
  const cardId = match.url.slice(1);

  // const initialStateForm = {
  //   date: moment().format('YYYY-MM-DD'),
  //   time: moment().format('HH:mm'),
  //   category:
  //     match.url.slice(1) === 'costs'
  //       ? { id: 'food', name: 'Еда' }
  //       : { id: 'salary', name: 'Зарплата' },
  //   summ: '',
  //   currency: 'RUB',
  //   comment: '',
  // };

  // const [stateForm, dispatchStateForm] = useReducer(reducer, initialStateForm);

  // const handleSubmitTransaction = e => {
  //   const { category, transactionId } = match.params;
  //   e.preventDefault();

  //   if (category && transactionId) {
  //     category === 'incomes' && dispatch(editIncomes(transactionId, stateForm));
  //     category === 'costs' && dispatch(editCosts(transactionId, stateForm));
  //     handleGoToHome();
  //   }

  //   cardId === 'incomes' && dispatch(addIncomes(stateForm));
  //   cardId === 'costs' && dispatch(addCosts(stateForm));
  //   handleGoToHome();
  // };

  // const handleChange = e => {
  //   const { name, value } = e.target;
  //   dispatchStateForm({ type: name, payload: value });
  // };

  const openCategoriesList = () => {
    const nextLocation = {
      pathname: `${match.url}/category`,
      state: { from: location },
    };
    history.push(nextLocation);
  };

  const onSetCategory = opts => {
    setInitForm(prev => ({ ...prev, category: opts }));
    // handleGoBack();
  };

  const handleGoBack = () => {
    history.push(location.state?.from || '/');
  };

  const handleGoToHome = () => {
    history.push('/');
  };

  useEffect(() => {
    const { category, transactionId } = match.params;
    const data =
      (category === 'incomes' && incomes) ||
      (category === 'costs' && costs) ||
      [];
    const editTransaction = data.find(({ id }) => id === transactionId);
    if (category && transactionId) {
      setInitForm(editTransaction);
    }
  }, []);

  return (
    <>
      {location.pathname === `/${cardId}` && (
        <Section>
          <Container>
            <Button cbOnClick={handleGoToHome} title={'Go back'} />
            <h1>{title}</h1>

            <FormTmp
              options={getFormOpts(initForm)}
              // handleChange={handleChange}
              handleClick={openCategoriesList}
              // onSubmit={handleSubmitTransaction}
            />
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
