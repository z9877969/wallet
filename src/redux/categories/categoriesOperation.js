import { addCategory, getCategoriesApi } from '../../services/firebaseApi';
import {
  addCostsCatError,
  addCostsCatRequest,
  addCostsCatSuccess,
  addIncomesCatError,
  addIncomesCatRequest,
  addIncomesCatSuccess,
  getCategoriesError,
  getCategoriesRequest,
  getCostsCatSuccess,
  getIncomesCatSuccess,
  isCostsCatNull,
  isIncomesCatNull,
} from './categoriesAction';

export const getCategories = () => (dispatch, getState) => {
  const { idToken } = getState().auth.user;
  dispatch(getCategoriesRequest());

  getCategoriesApi(idToken)
    .then(({ incomes, costs }) => {
      !incomes.length
        ? dispatch(isIncomesCatNull('incomes'))
        : dispatch(getIncomesCatSuccess(incomes));

      !costs.length
        ? dispatch(isCostsCatNull('costs'))
        : dispatch(getCostsCatSuccess(costs));
    })
    .catch(err =>
      dispatch(
        getCategoriesError({ message: err.message, status: err.status }),
      ),
    );
};

export const addIncomesCat = data => (dispatch, getState) => {
  const { localId, idToken } = getState().auth.user;
  dispatch(addIncomesCatRequest());

  addCategory({
    data,
    transactionType: 'costs',
  })
    .then(data => dispatch(addIncomesCatSuccess(data)))
    .catch(err =>
      dispatch(
        addIncomesCatError({ message: err.message, status: err.status }),
      ),
    );
};

export const addCostsCat = data => (dispatch, getState) => {
  const { localId, idToken } = getState().auth.user;
  dispatch(addCostsCatRequest());

  addCategory({
    data,
    transactionType: 'incomes',
  })
    .then(data => dispatch(addCostsCatSuccess(data)))
    .catch(err =>
      dispatch(addCostsCatError({ message: err.message, status: err.status })),
    );
};
