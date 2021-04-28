import { createReducer } from '@reduxjs/toolkit';
import { registerError } from './auth/authAction';
import {
  addCostsCatError,
  addIncomesCatError,
  getCostsCatError,
  getIncomesCatError,
} from './categories/categoriesAction';
import {
  addCostsError,
  addIncomesError,
  editCostsError,
  editIncomesError,
  getCostsError,
  getIncomesError,
  removeCostsError,
  removeIncomesError,
} from './transactions/transactionsAction';

const errorReducer = createReducer(null, {
  [addIncomesError]: (_, { payload }) => payload,
  [addCostsError]: (_, { payload }) => payload,
  [getIncomesError]: (_, { payload }) => payload,
  [getCostsError]: (_, { payload }) => payload,
  [removeCostsError]: (_, { payload }) => payload,
  [removeIncomesError]: (_, { payload }) => payload,
  [editIncomesError]: (_, { payload }) => payload,
  [editCostsError]: (_, { payload }) => payload,
  [getIncomesCatError]: (_, { payload }) => payload,
  [getCostsCatError]: (_, { payload }) => payload,
  [addCostsCatError]: (_, { payload }) => payload,
  [addIncomesCatError]: (_, { payload }) => payload,
  [registerError]: (_, { payload }) => payload,
});

export default errorReducer;
