import { combineReducers } from '@reduxjs/toolkit';
import transactionsReducer from './transactions/transactionsReducer';

export default combineReducers({
  transactions: transactionsReducer,
});
