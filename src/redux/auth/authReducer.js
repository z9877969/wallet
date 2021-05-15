import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  loginSuccess,
  logoutSuccess,
  refreshSuccess,
  registerSuccess,
  setIsAuth,
} from './authAction';

const initialState = {
  user: {
    email: '',
    idToken: '',
    localId: '',
    refreshToken: '',
  },
  isAuth: false,
};

const userReducer = createReducer(initialState.user, {
  [loginSuccess]: (_, { payload }) => ({
    email: payload.email,
    idToken: payload.idToken,
    refreshToken: payload.refreshToken,
  }),
  [registerSuccess]: (_, { payload }) => ({
    email: payload.email,
    idToken: payload.idToken,
    refreshToken: payload.refreshToken,
  }),
  [refreshSuccess]: (state, { payload }) => ({
    email: state.email,
    idToken: payload.idToken,
    localId: payload.localId,
    refreshToken: payload.refreshToken,
  }),
  [logoutSuccess]: () => initialState.user,
});

const isAuthReducer = createReducer(initialState.isAuth, {
  [loginSuccess]: () => true,
  [registerSuccess]: () => true,
  [setIsAuth]: (_, { payload }) => payload,
  logoutSuccess: () => initialState.isAuth,
});

const persistConfigUser = {
  key: 'token',
  whitelist: ['idToken'],
  storage,
};

export default combineReducers({
  user: persistReducer(persistConfigUser, userReducer),
  isAuth: isAuthReducer,
});
