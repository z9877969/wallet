import {createAction} from '@reduxjs/toolkit';

// export const ActionType = {
//   ADD_INCOMES: 'ADD_INCOMES',
//   ADD_COSTS: 'ADD_COSTS',
//   ADD_TRANSACTION_LIST_ID: 'ADD_TRANSACTION_LIST_ID',
//   REMOVE_TRANSACTION_LIST_ID: 'REMOVE_TRANSACTION_LIST_ID',
// };

export const addIncomesRequest = createAction("addIncomesRequest")
export const addIncomesSuccess = createAction("addIncomesSuccess")
export const addIncomesError = createAction("addIncomesError")

export const getIncomesRequest = createAction("getIncomesRequest")
export const getIncomesSuccess = createAction("getIncomesSuccess")
export const getIncomesError = createAction("getIncomesError")

export const addCostsRequest = createAction("addCostsRequest")
export const addCostsSuccess = createAction("addCostsSuccess")
export const addCostsError = createAction("addCostsError")

export const getCostsRequest = createAction("getCostsRequest")
export const getCostsSuccess = createAction("getCostsSuccess")
export const getCostsError = createAction("getCostsError")

export const addTransactionListId = createAction("addTransactionListId")
export const removeTransactionListId = createAction("removeTransactionListId")
