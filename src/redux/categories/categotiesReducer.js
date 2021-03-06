import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
  addCostsCatSuccess,
  addIncomesCatSuccess,
  getCostsCatSuccess,
  getIncomesCatSuccess,
  isCostsCatNull,
  isIncomesCatNull,
  resetCategoriesNull,
} from './categoriesAction';

import { logoutSuccess } from '../auth/authAction';

const initialState = {
  isCategory: {
    incomes: false,
    costs: false,
  },
};

const incomesCatReducer = createReducer([], {
  [getIncomesCatSuccess]: (state, { payload }) => [...state, ...payload],
  [addIncomesCatSuccess]: (state, { payload }) => [...state, payload],
  [logoutSuccess]: () => [],
});

const costsCatReducer = createReducer([], {
  [getCostsCatSuccess]: (state, { payload }) => [...state, ...payload],
  [addCostsCatSuccess]: (state, { payload }) => [...state, payload],
  [logoutSuccess]: () => [],
});

const isCategoriesNullReducer = createReducer(initialState.isCategory, {
  [isIncomesCatNull]: (state, { payload }) => ({ ...state, [payload]: true }),
  [isCostsCatNull]: (state, { payload }) => ({ ...state, [payload]: true }),
  [resetCategoriesNull]: (state, {payload}) => ({
    ...state,
    [payload]: false,
  }),
  [logoutSuccess]: () => initialState.isCategory,
});

export default combineReducers({
  incomes: incomesCatReducer,
  costs: costsCatReducer,
  isNull: isCategoriesNullReducer,
});
