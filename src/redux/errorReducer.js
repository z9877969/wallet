import { createReducer } from '@reduxjs/toolkit';
import {
  loginError,
  loginRequest,
  logoutRequest,
  refreshError,
  registerError,
} from './auth/authAction';
import {
  addCostsCatError,
  addIncomesCatError,
  getCategoriesError,
} from './categories/categoriesAction';
import {
  addCostsError,
  addIncomesError,
  editCostsError,
  editIncomesError,
  getTransactionsError,
  getTransactionsRequest,
  removeCostsError,
  removeIncomesError,
} from './transactions/transactionsAction';

const errorReducer = createReducer(null, {
  [getTransactionsRequest]: () => null,
  [loginRequest]: () => null,
  [logoutRequest]: () => null,
  [addIncomesError]: (_, { payload }) => payload,
  [addCostsError]: (_, { payload }) => payload,
  [getTransactionsError]: (_, { payload }) => payload,
  [removeCostsError]: (_, { payload }) => payload,
  [removeIncomesError]: (_, { payload }) => payload,
  [editIncomesError]: (_, { payload }) => payload,
  [editCostsError]: (_, { payload }) => payload,
  [getCategoriesError]: (_, { payload }) => payload,
  [addCostsCatError]: (_, { payload }) => payload,
  [addIncomesCatError]: (_, { payload }) => payload,
  [registerError]: (_, { payload }) => payload,
  [loginError]: (_, { payload }) => payload,
  [refreshError]: (_, { payload }) => payload,
});

export default errorReducer;
