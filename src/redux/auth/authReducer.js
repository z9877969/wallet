import { createReducer } from '@reduxjs/toolkit';
import { loginSuccess, logoutSuccess, refreshSuccess, registerSuccess } from './authAction';

const initialState = {
  user: {
    email: '',
    idToken: '',
    localId: '',
    refreshToken: '',
  },
  isAuth: false,
};

const authReducer = createReducer(initialState, {
  [loginSuccess]: (_, { payload }) => ({
    user: {
      email: payload.email,
      idToken: payload.idToken,
      localId: payload.localId,
      refreshToken: payload.refreshToken
    },
    isAuth: true,
  }),
  [registerSuccess]: (_, { payload }) => {
    return {
      user: {
        email: payload.email,
        idToken: payload.idToken,
        localId: payload.localId,
        refreshToken: payload.refreshToken
      },
      isAuth: true,
    };
  },
  [refreshSuccess]: (state, {payload}) => {
    return {
      user: {
        email: state.user.email,
        idToken: payload.idToken,
        localId: payload.localId,
        refreshToken: payload.refreshToken
      },
      isAuth: true,
    }
  },
  [logoutSuccess]: () => initialState,
});

export default authReducer;
