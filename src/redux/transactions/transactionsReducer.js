import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { logoutSuccess } from '../auth/authAction';
import {
  addCostsSuccess,
  addIncomesSuccess,
  addTransactionListId,
  getCostsSuccess,
  getIncomesSuccess,
  removeTransactionListId,
  removeCostsSuccess,
  removeIncomesSuccess,
  editCostsSuccess,
  editIncomesSuccess,
} from './transactionsAction';

const initialState = {
  costs: [],
  incomes: [],
  listId: "",
};

const costsReducer = createReducer(initialState.costs, {
  [addCostsSuccess]: (state, { payload }) => [...state, payload],
  [getCostsSuccess]: (_, { payload }) => [...payload],
  [removeCostsSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [editCostsSuccess]: (state, { payload }) => {
    const transactionsFiltered = state.filter(({ id }) => id !== payload.id);
    return [...transactionsFiltered, payload];
  },
  [logoutSuccess]: () => initialState.costs,
});

const incomesReducer = createReducer(initialState.incomes, {
  [addIncomesSuccess]: (state, { payload }) => [...state, payload],
  [getIncomesSuccess]: (_, { payload }) => [...payload],
  [removeIncomesSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [editIncomesSuccess]: (state, { payload }) => {
    const transactionsFiltered = state.filter(({ id }) => id !== payload.id);
    return [...transactionsFiltered, payload];
  },
  [logoutSuccess]: () => initialState.incomes,
});

const transactionListIdReducer = createReducer(initialState.listId, {
  [addTransactionListId]: (_, { payload }) => payload,
  [removeTransactionListId]: () => initialState.listId,
  [logoutSuccess]: () => initialState.listId,
});

const transactionsReducer = combineReducers({
  incomes: incomesReducer,
  costs: costsReducer,
  listId: transactionListIdReducer,
});

export default transactionsReducer;
