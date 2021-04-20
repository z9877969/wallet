import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
  addCostsSuccess,
  addIncomesSuccess,
  addTransactionListId,
  getCostsSuccess,
  getIncomesSuccess,
  removeTransactionListId,
} from './transactionsAction';

const setToLS = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const getFromLS = (key, initial) =>
  JSON.parse(localStorage.getItem(key)) || initial;

const initialState = {
  costs: [],
  incomes: [],
  listId: getFromLS('listId', ''),
};

const costsReducer = createReducer(initialState.costs, {
  [addCostsSuccess]: (state, { payload }) => [...state, payload],
  [getCostsSuccess]: (_, { payload }) => [...payload],
});

const incomesReducer = createReducer(initialState.incomes, {
  [addIncomesSuccess]: (state, { payload }) => [...state, payload],
  [getIncomesSuccess]: (_, { payload }) => [...payload],
});

const transactionListIdReducer = createReducer(initialState.listId, {
  [addTransactionListId]: (_, { payload }) => {
    setToLS('listId', payload);
    return payload;
  },
  [removeTransactionListId]: () => {
    setToLS('listId', '');
    return initialState.listId;
  },
});

const transactionsReducer = combineReducers({
  incomes: incomesReducer,
  costs: costsReducer,
  listId: transactionListIdReducer,
});

export default transactionsReducer;
