export const ActionType = {
  ADD_INCOMES: 'ADD_INCOMES',
  ADD_COSTS: 'ADD_COSTS',
  ADD_TRANSACTION_LIST_ID: 'ADD_TRANSACTION_LIST_ID',
  REMOVE_TRANSACTION_LIST_ID: 'REMOVE_TRANSACTION_LIST_ID',
};

export const addIncomes = data => ({
  type: ActionType.ADD_INCOMES,
  payload: data,
});

export const addCosts = data => ({
  type: ActionType.ADD_COSTS,
  payload: data,
});

export const addTransactionListId = id => ({
  type: ActionType.ADD_TRANSACTION_LIST_ID,
  payload: id,
});

export const removeTransactionListId = () => ({
  type: ActionType.REMOVE_TRANSACTION_LIST_ID,
});
