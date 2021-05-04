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
import error from './errorReducer';
import auth from './auth/authReducer';

const persistConfigAuth = {
  key: 'auth',
  version: 1,
  whitelist: ['user'],
  storage,
};

export const store = configureStore({
  reducer: {
    transactions,
    error,
    categories,
    auth: persistReducer(persistConfigAuth, auth),
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
