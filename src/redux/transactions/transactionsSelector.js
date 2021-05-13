export const getTransactions = state => state.transactions;

export const hasTransactions = state => {
    const {incomes, costs} = state.transactions;
    return incomes.length || costs.length;
}