import { createReducer } from '@reduxjs/toolkit';
import { login, logout, register } from './authAction';

const initialState = {
  email: '',
  isAuth: false,
};

const authReducer = createReducer(initialState, {
  [login]: (_, { payload }) => ({ email: payload.email, isAuth: true }),
  [register]: (_, { payload }) => ({ email: payload.email, isAuth: true }),
  [logout]: () => initialState,
});

export default authReducer;
