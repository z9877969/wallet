import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
  addCostsCatSuccess,
  addIncomesCatSuccess,
  getCostsCatSuccess,
  getIncomesCatSuccess,
  isCategoriesNull,
  resetCategoriesNull,
} from './categoriesAction';

const initialState = {
  isCategory: {
    incomes: false,
    costs: false,
  },
};

const incomesCatReducer = createReducer([], {
  [getIncomesCatSuccess]: (state, { payload }) => [...state, ...payload],
  [addIncomesCatSuccess]: (state, { payload }) => [...state, payload],
});

const costsCatReducer = createReducer([], {
  [getCostsCatSuccess]: (state, { payload }) => [...state, ...payload],
  [addCostsCatSuccess]: (state, { payload }) => [...state, payload],
});

const isCategoriesNullReducer = createReducer(initialState.isCategory, {
  [isCategoriesNull]: (state, { payload }) => ({ ...state, [payload]: true }),
  [resetCategoriesNull]: (state, { payload }) => ({
    ...state,
    [payload]: initialState.isCategory[payload],
  }),
});

export default combineReducers({
  incomes: incomesCatReducer,
  costs: costsCatReducer,
  isNull: isCategoriesNullReducer,
});
