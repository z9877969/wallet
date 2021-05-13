import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import transactions from './transactions/transactionsReducer';
import categories from './categories/categotiesReducer';
import error from './error/errorReducer';
import auth from './auth/authReducer';
import analitics from './analitics/analiticsReducer';

const persistConfigAuth = {
  key: 'auth',
  version: 1,
  whitelist: ['user'],
  storage,
};

const persistConfigTransactions = {
  key: "listId",
  whitelist: ['listId'],
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfigAuth, auth),
    transactions: persistReducer(persistConfigTransactions, transactions),
    categories,
    analitics,
    error,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
