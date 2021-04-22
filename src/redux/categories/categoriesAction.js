import {createAction} from '@reduxjs/toolkit';

export const getIncomesCatRequest = createAction("getIncomesCatRequest");
export const getIncomesCatSuccess = createAction("getIncomesCatSuccess");
export const getIncomesCatError = createAction("getIncomesCatError");

export const getCostsCatRequest = createAction("getCostsCatRequest");
export const getCostsCatSuccess = createAction("getCostsCatSuccess");
export const getCostsCatError = createAction("getCostsCatError");

export const addIncomesCatRequest = createAction("addIncomesCatRequest");
export const addIncomesCatSuccess = createAction("addIncomesCatSuccess");
export const addIncomesCatError = createAction("addIncomesCatError");

export const addCostsCatRequest = createAction("addCostsCatRequest");
export const addCostsCatSuccess = createAction("addCostsCatSuccess");
export const addCostsCatError = createAction("addCostsCatError");

export const isCategoriesNull = createAction("isCategoriesNull");
export const resetCategoriesNull = createAction("resetCategoriesNull");