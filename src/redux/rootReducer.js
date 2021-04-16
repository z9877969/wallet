import { combineReducers } from 'redux';
import transactionsReducer from './transactions/transactionsReducer';

export default combineReducers({
  transactions: transactionsReducer,
});
