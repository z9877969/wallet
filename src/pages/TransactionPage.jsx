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
import {
  addCostsCat,
  addIncomesCat,
  getCategories,
} from '../redux/categories/categoriesOperation';
import getFormOpts from '../assets/options/getTransactionFormOpts';
import categoriesInit from '../assets/options/categoriesInit';
import { categoriesList as catListIncomes } from '../db/incomes.json';
import { categoriesList as catListCosts } from '../db/costs.json';
import { resetCategoriesNull } from '../redux/categories/categoriesAction';
import schema from '../assets/validation/categoriesValidateSchema';

const { categoriesList: costsList } = costsOpts;
const { categoriesList: incomesList } = incomesOpts;

const TransactionPage = props => {
  const { match, location, history, title } = props;
  const dispatch = useDispatch();

  const transactionType = match.url.slice(1);

  const { incomes, costs } = useSelector(state => state.transactions);
  const categories = useSelector(state => state.categories);
  const { incomes: isCatIncomesNull, costs: isCatCostsNull } = useSelector(
    state => state.categories.isNull,
  );

  const [categoryName, setCategoryName] = useState(categoriesInit["category"]);

  const categoriesList = categories[transactionType] || [];

  const handleSubmitTransaction = dataForm => {
    const { category, transactionId } = match.params;

    console.log('dataForm :>> ', dataForm);

    if (category && transactionId) {
      category === 'incomes' && dispatch(editIncomes(transactionId, dataForm));
      category === 'costs' && dispatch(editCosts(transactionId, dataForm));
      handleGoBack();
    }
    transactionType === 'incomes' && dispatch(addIncomes(dataForm));
    transactionType === 'costs' && dispatch(addCosts(dataForm));
    handleGoBack();
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
    !categoriesList.length && dispatch(getCategories());
  }, []);

  useEffect(() => {
    isCatIncomesNull &&
      // transactionType === 'incomes' &&
      catListIncomes.forEach(async ({ name }, i) => {
        i === 0 && dispatch(resetCategoriesNull('incomes'));
        await dispatch(addIncomesCat({ name }));
      });
    isCatCostsNull &&
      // transactionType === 'costs' &&
      catListCosts.forEach(async ({ name }, i) => {
        i === 0 && dispatch(resetCategoriesNull('costs'));
        await dispatch(addCostsCat({ name }));
      });
  }, [isCatIncomesNull, isCatCostsNull]);

  return (
    <>
      <TransactionForm
        options={getFormOpts(categoriesInit, categoryName)}
        handleClick={openCategoriesList}
        onSubmit={handleSubmitTransaction}
        initialValues={categoriesInit}
        validationSchema={schema}
        title={title}
        cardId={transactionType}
        handleGoToHome={handleGoBack}
      >
        {{
          component: cbOnChange => (
            <Route
              path={`${match.path}/category`}
              render={props => (
                <CategoriesList
                  {...props}
                  handleGoBack={handleGoBack}
                  handleChangeFormik={cbOnChange}
                  categoriesList={
                    transactionType === 'costs' ? costsList : incomesList
                  }
                />
              )}
            />
          ),
        }}
      </TransactionForm>
    </>
  );
};

export default TransactionPage;
