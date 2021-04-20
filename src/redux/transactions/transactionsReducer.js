import { combineReducers } from 'redux';
import { ActionType } from './transactionsAction';

const setToLS = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const getFromLS = (key, initial) => JSON.parse(localStorage.getItem(key)) || initial;

const initialState = {
  costs: getFromLS('costs', []),
  incomes: getFromLS('incomes', []),
  listId: getFromLS('listId', ""),
};

const costsReducer = (state = initialState.costs, { type, payload }) => {
  switch (type) {
    case ActionType.ADD_COSTS:
      const newState = [...state, payload];
      setToLS('costs', newState);
      return newState;
    default:
      return state;
  }
};

const incomesReducer = (state = initialState.incomes, { type, payload }) => {
  switch (type) {
    case ActionType.ADD_INCOMES:
      const newState = [...state, payload];
      setToLS('incomes', newState);
      return newState;
    default:
      return state;
  }
};

const transactionListIdReducer = (
  state = initialState.listId,
  { type, payload },
) => {
  switch (type) {
    case ActionType.ADD_TRANSACTION_LIST_ID:
      setToLS('listId', payload);
      return payload;
    case ActionType.REMOVE_TRANSACTION_LIST_ID:
      setToLS('listId', payload);
      return '';
    default:
      return state;
  }
};

const transactionsReducer = combineReducers({
  incomes: incomesReducer,
  costs: costsReducer,
  listId: transactionListIdReducer,
});

export default transactionsReducer;
