import { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import TransactionForm from '../components/TransactionForm/TransactionForm';
import CategoriesList from '../components/CategoriesList';
import costsOpts from '../db/costs.json';
import incomesOpts from '../db/incomes.json';
import {
  addCosts,
  addIncomes,
  editCosts,
  editIncomes,
} from '../redux/transactions/transactionsOperations';
import getFormOpts from '../assets/options/getTransactionFormOpts';
import getTransactionInit from '../assets/options/getTransactionInit';

const { categoriesList: costsList } = costsOpts;
const { categoriesList: incomesList } = incomesOpts;

const TransactionPage = props => {
  const { match, location, history, title } = props;
  const dispatch = useDispatch();

  const cardId = match.url.slice(1);

  const { incomes, costs } = useSelector(state => state.transactions);

  const [categoryName, setCategoryName] = useState(
    (cardId === 'costs' && costsList[0].name) ||
      (cardId === 'incomes' && incomesList[0].name),
  );

  const handleSubmitTransaction = dataForm => {
    const { category, transactionId } = match.params;

    if (category && transactionId) {
      category === 'incomes' && dispatch(editIncomes(transactionId, dataForm));
      category === 'costs' && dispatch(editCosts(transactionId, dataForm));
      handleGoToHome();
    }
    cardId === 'incomes' && dispatch(addIncomes(dataForm));
    cardId === 'costs' && dispatch(addCosts(dataForm));
    handleGoToHome();
  };

  const openCategoriesList = () => {
    const nextLocation = {
      pathname: `${match.url}/category`,
      state: { from: location },
    };
    history.push(nextLocation);
  };

  const onSetCategory = opts => {
    setCategoryName(opts['name']);
    handleGoBack();
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
    // if (category && transactionId) {
    //   setInitForm(editTransaction);
    // }
  }, []);

  return (
    <>
      <TransactionForm
        options={getFormOpts(getTransactionInit(cardId), categoryName)}
        handleClick={openCategoriesList}
        onSubmit={handleSubmitTransaction}
        initialValues={getTransactionInit(cardId)}
        title={title}
        cardId={cardId}
        handleGoToHome={handleGoToHome}
      >
        {{
          component: (cbOnChange) => <Route
          path={`${match.path}/category`}
          render={props => (
            <CategoriesList
              {...props}
              handleGoBack={handleGoBack}
              handleChange={cbOnChange}
              categoriesList={
                props.cardId === 'costs' ? costsList : incomesList
              }
            />
          )}
        />
        }}
      </TransactionForm>
    </>
  );
};

export default TransactionPage;
