import axios from 'axios';
import {
  addCostsRequest,
  addCostsSuccess,
  addCostsError,
  addIncomesRequest,
  addIncomesSuccess,
  addIncomesError,
  getIncomesSuccess,
  getCostsSuccess,
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
  getTransactionsRequest,
  getTransactionsError,
} from './transactionsAction';

import {
  getTransactionsApi,
  addTransaction,
  editTransaction,
} from '../../services/firebaseApi';

export const addCosts = data => dispatch => {
  dispatch(addCostsRequest());
  addTransaction({
    data,
    transactionType: 'costs',
  })
    .then(data => dispatch(addCostsSuccess(data)))
    .catch(err =>
      dispatch(addCostsError({ message: err.message, status: err.status })),
    );
};

export const addIncomes = data => dispatch => {
  dispatch(addIncomesRequest());
  addTransaction({
    data,
    transactionType: 'incomes',
  })
    .then(data => dispatch(addIncomesSuccess(data)))
    .catch(err =>
      dispatch(addIncomesError({ message: err.message, status: err.status })),
    );
};

export const getTransactions = () => (dispatch, getState) => {
  const { idToken } = getState().auth.user;
  dispatch(getTransactionsRequest());
  getTransactionsApi(idToken)
    .then(data => {
      const { costs = [], incomes = [] } = data;
      dispatch(getCostsSuccess(costs));
      dispatch(getIncomesSuccess(incomes));
    })
    .catch(err =>
      dispatch(
        getTransactionsError({ message: err.message, status: err.status }),
      ),
    );
};

export const removeCosts = id => dispatch => {
  dispatch(removeCostsRequest());
  axios
    .delete(`/costs/${id}`)
    .then(() => dispatch(removeCostsSuccess(id)))
    .catch(err =>
      dispatch(removeCostsError({ message: err.message, status: err.status })),
    );
};

export const removeIncomes = id => dispatch => {
  dispatch(removeIncomesRequest());
  axios
    .delete(`/incomes/${id}`)
    .then(() => dispatch(removeIncomesSuccess(id)))
    .catch(err =>
      dispatch(
        removeIncomesError({ message: err.message, status: err.status }),
      ),
    );
};

export const editCosts = (id, data) => (dispatch, getState) => {
  const { localId, idToken } = getState().auth.user;
  dispatch(editCostsRequest());
  editTransaction({
    data,
    localId,
    transactionType: 'costs',
    idToken,
    id,
  })
    .then(data => dispatch(editCostsSuccess(data)))
    .catch(err =>
      dispatch(editCostsError({ message: err.message, status: err.status })),
    );
};

export const editIncomes = (id, data) => (dispatch, getState) => {
  const { localId, idToken } = getState().auth.user;
  dispatch(editIncomesRequest());
  editTransaction({
    data,
    localId,
    transactionType: 'costs',
    idToken,
    id,
  })
    .then(data => dispatch(editIncomesSuccess(data)))
    .catch(err =>
      dispatch(editIncomesError({ message: err.message, status: err.status })),
    );
};
