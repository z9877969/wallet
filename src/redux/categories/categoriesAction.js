import {createAction} from '@reduxjs/toolkit';

export const getCategoriesRequest = createAction("getCategoriesRequest");
export const getIncomesCatSuccess = createAction("getIncomesCatSuccess");
export const getCostsCatSuccess = createAction("getCostsCatSuccess");
export const getCategoriesError = createAction("getCategoriesError");

export const addIncomesCatRequest = createAction("addIncomesCatRequest");
export const addIncomesCatSuccess = createAction("addIncomesCatSuccess");
export const addIncomesCatError = createAction("addIncomesCatError");

export const addCostsCatRequest = createAction("addCostsCatRequest");
export const addCostsCatSuccess = createAction("addCostsCatSuccess");
export const addCostsCatError = createAction("addCostsCatError");

export const isCostsCatNull = createAction("isCostsCatNull");
export const isIncomesCatNull = createAction("isIncomesCatNull");
export const resetCategoriesNull = createAction("resetCategoriesNull");