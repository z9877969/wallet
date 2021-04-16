export const ActionType = {
    ADD_INCOMES: "ADD_INCOMES",
    ADD_COSTS: "ADD_COSTS"
}

export const addIncomes = data => ({
  type: ActionType.ADD_INCOMES,
  payload: data,
});

export const addCosts = data => ({
  type: ActionType.ADD_COSTS,
  payload: data,
});
