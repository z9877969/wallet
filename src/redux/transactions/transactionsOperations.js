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
  removeCostsRequest,
  removeCostsSuccess,
  removeCostsError,
  removeIncomesRequest,
  removeIncomesSuccess,
  removeIncomesError,
  editCostsRequest,
  editCostsSuccess,
  editCostsError,
  editIncomesRequest,
  editIncomesSuccess,
  editIncomesError,
} from './transactionsAction';

import { getTransactionsApi, addTransaction } from '../../services/firebaseApi';

export const addCosts = data => (dispatch, getState) => {
  const { localId, idToken } = getState().auth.user;

  dispatch(addCostsRequest());

  addTransaction({
    data,
    localId,
    transactionType: 'costs',
    idToken,
  })
    .then((data) => dispatch(addCostsSuccess(data)))
    .catch(err => dispatch(addCostsError(err.message)));
};

export const addIncomes = data => (dispatch, getState) => {
  const { localId, idToken } = getState().auth.user;
  dispatch(addIncomesRequest());
  
  addTransaction({
    data,
    localId,
    transactionType: 'incomes',
    idToken,
  })
    .then((data) => dispatch(addIncomesSuccess(data)))
    .catch(err => dispatch(addIncomesError(err.message)));
};

export const getIncomes = () => dispatch => {
  dispatch(getIncomesRequest());

  axios
    .get('/incomes')
    .then(({ data }) => dispatch(getIncomesSuccess(data)))
    .catch(err => dispatch(getIncomesError(err.message)));
};

export const getCosts = () => dispatch => {
  dispatch(getCostsRequest());

  axios
    .get('/costs')
    .then(({ data }) => dispatch(getCostsSuccess(data)))
    .catch(err => dispatch(getCostsError(err.message)));
};

export const getTransactions = () => (dispatch, getState) => {
  dispatch(getCostsRequest());
  const { localId, idToken } = getState().auth.user;
  getTransactionsApi({ userId: localId, idToken })
    .then(({ incomes, costs }) => {
      dispatch(getCostsSuccess(costs || []));
      dispatch(getIncomesSuccess(incomes || []));
    })
    .catch(e => dispatch(getCostsError(e)));
};

export const removeCosts = id => dispatch => {
  dispatch(removeCostsRequest());

  axios
    .delete(`/costs/${id}`)
    .then(() => dispatch(removeCostsSuccess(id)))
    .catch(err => dispatch(removeCostsError(err.message)));
};

export const removeIncomes = id => dispatch => {
  dispatch(removeIncomesRequest());

  axios
    .delete(`/incomes/${id}`)
    .then(() => dispatch(removeIncomesSuccess(id)))
    .catch(err => dispatch(removeIncomesError(err.message)));
};

export const editCosts = (id, data) => dispatch => {
  dispatch(editCostsRequest());

  axios
    .patch(`/costs/${id}`, data)
    .then(({ data }) => dispatch(editCostsSuccess(data)))
    .catch(err => dispatch(editCostsError(err.message)));
};

export const editIncomes = (id, data) => dispatch => {
  dispatch(editIncomesRequest());

  axios
    .patch(`/incomes/${id}`, data)
    .then(({ data }) => dispatch(editIncomesSuccess(data)))
    .catch(err => dispatch(editIncomesError(err.message)));
};
