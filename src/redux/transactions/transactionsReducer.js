import { combineReducers } from 'redux';
import {ActionType} from './transactionsAction';

const setToLS = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const getFromLS = key => JSON.parse(localStorage.getItem(key)) || [];

const initialState = {
  costs: getFromLS('costs'),
  incomes: getFromLS('incomes'),
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

const transactionsReducer = combineReducers({
  incomes: incomesReducer,
  costs: costsReducer,
});

export default transactionsReducer;
