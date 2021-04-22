import axios from 'axios';
import {
  addCostsCatError,
  addCostsCatRequest,
  addCostsCatSuccess,
  addIncomesCatError,
  addIncomesCatRequest,
  addIncomesCatSuccess,
  getCostsCatError,
  getCostsCatRequest,
  getCostsCatSuccess,
  getIncomesCatError,
  getIncomesCatRequest,
  getIncomesCatSuccess,
  isCategoriesNull,
} from './categoriesAction';

export const getIncomesCat = () => dispatch => {
  dispatch(getIncomesCatRequest());

  axios
    .get('/incomes-cat')
    .then(({ data }) => {
      dispatch(getIncomesCatSuccess(data));
      !data.length && dispatch(isCategoriesNull('incomes'));
    })
    .catch(err => dispatch(getIncomesCatError(err.message)));
};

export const getCostsCat = () => dispatch => {
  dispatch(getCostsCatRequest());

  axios
    .get('/costs-cat')
    .then(({ data }) => {
      dispatch(getCostsCatSuccess(data));
      !data.length && dispatch(isCategoriesNull('costs'));
    })
    .catch(err => dispatch(getCostsCatError(err.message)));
};

export const addIncomesCat = data => dispatch => {
  dispatch(addIncomesCatRequest());

  axios
    .post('/incomes-cat', data)
    .then(({ data }) => dispatch(addIncomesCatSuccess(data)))
    .catch(err => dispatch(addIncomesCatError(err.message)));
};

export const addCostsCat = data => dispatch => {
  dispatch(addCostsCatRequest());

  axios
    .post('/costs-cat', data)
    .then(({ data }) => dispatch(addCostsCatSuccess(data)))
    .catch(err => dispatch(addCostsCatError(err.message)));
};
