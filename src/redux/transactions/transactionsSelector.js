export const hasTransactions = state => {
    const {incomes, costs} = state.transactions;
    return incomes.length || costs.length;
}