import { configureStore } from '@reduxjs/toolkit';
import transactions from './transactions/transactionsReducer';
import category from './categories/categotiesReducer';
import error from './errorReducer';

export default configureStore({
  reducer: {
    transactions,
    error,
    category,
  },
});
