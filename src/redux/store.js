import { configureStore } from '@reduxjs/toolkit';
import transactions from './transactions/transactionsReducer';
import category from './categories/categotiesReducer';
import error from './errorReducer';
import auth from './auth/authReducer';

export default configureStore({
  reducer: {
    transactions,
    error,
    category,
    auth
  },
});
