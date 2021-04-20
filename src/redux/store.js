import { configureStore } from '@reduxjs/toolkit';
import transactions from './transactions/transactionsReducer';
import error from './errorReducer';

export default configureStore({
  reducer: {
    transactions,
    error,
  },
});
