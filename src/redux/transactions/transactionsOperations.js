import axios from 'axios';
import {
  addCostsRequest,
  addCostsSuccess,
  addCostsError,
  addIncomesRequest,
  addIncomesSuccess,
  addIncomesError,
  getIncomesRequest,
  getIncomesSuccess,
  getIncomesError,
  getCostsRequest,
  getCostsSuccess,
  getCostsError,
} from './transactionsAction';

axios.defaults.baseURL = 'http://localhost:4040';

export const addCosts = data => dispatch => {
  dispatch(addCostsRequest());

  axios
    .post('/costs', data)
    .then(({ data }) => dispatch(addCostsSuccess(data)))
    .catch(err => dispatch(addCostsError(err)));
};

export const addIncomes = data => dispatch => {
  dispatch(addIncomesRequest());

  axios
    .post('/incomes', data)
    .then(({ data }) => dispatch(addIncomesSuccess(data)))
    .catch(err => dispatch(addIncomesError(err)));
};

export const getIncomes = () => dispatch => {
  dispatch(getIncomesRequest());

  axios
    .get('/incomes')
    .then(({ data }) => dispatch(getIncomesSuccess(data)))
    .catch(err => dispatch(getIncomesError(err)));
};

export const getCosts = () => dispatch => {
  dispatch(getCostsRequest());

  axios
    .get('/costs')
    .then(({ data }) => dispatch(getCostsSuccess(data)))
    .catch(err => dispatch(getCostsError(err)));
};
