import { createAction } from '@reduxjs/toolkit';

// export const ActionType = {
//   ADD_INCOMES: 'ADD_INCOMES',
//   ADD_COSTS: 'ADD_COSTS',
//   ADD_TRANSACTION_LIST_ID: 'ADD_TRANSACTION_LIST_ID',
//   REMOVE_TRANSACTION_LIST_ID: 'REMOVE_TRANSACTION_LIST_ID',
// };

export const addIncomesRequest = createAction('addIncomesRequest');
export const addIncomesSuccess = createAction('addIncomesSuccess');
export const addIncomesError = createAction('addIncomesError');

export const addCostsRequest = createAction('addCostsRequest');
export const addCostsSuccess = createAction('addCostsSuccess');
export const addCostsError = createAction('addCostsError');

export const getIncomesRequest = createAction('getIncomesRequest');
export const getIncomesSuccess = createAction('getIncomesSuccess');
export const getIncomesError = createAction('getIncomesError');

export const getCostsRequest = createAction('getCostsRequest');
export const getCostsSuccess = createAction('getCostsSuccess');
export const getCostsError = createAction('getCostsError');

export const removeCostsRequest = createAction('removeCostsRequest');
export const removeCostsSuccess = createAction('removeCostsSuccess');
export const removeCostsError = createAction('removeCostsError');

export const removeIncomesRequest = createAction('removeIncomesRequest');
export const removeIncomesSuccess = createAction('removeIncomesSuccess');
export const removeIncomesError = createAction('removeIncomesError');

export const editCostsRequest = createAction('editCostsRequest');
export const editCostsSuccess = createAction('editCostsSuccess');
export const editCostsError = createAction('editCostsError');

export const editIncomesRequest = createAction('editIncomesRequest');
export const editIncomesSuccess = createAction('editIncomesSuccess');
export const editIncomesError = createAction('editIncomesError');

export const addTransactionListId = createAction('addTransactionListId');
export const removeTransactionListId = createAction('removeTransactionListId');
