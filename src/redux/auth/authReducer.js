import { createReducer } from '@reduxjs/toolkit';
import { loginSuccess, logoutSuccess, registerSuccess } from './authAction';

const initialState = {
  user: {
    email: '',
    idToken: '',
    localId: '',
  },
  isAuth: false,
};

const authReducer = createReducer(initialState, {
  [loginSuccess]: (_, { payload }) => ({
    user: {
      email: payload.email,
      idToken: payload.idToken,
      localId: payload.localId,
    },
    isAuth: true,
  }),
  [registerSuccess]: (_, { payload }) => {
    console.log('payload :>> ', payload);
    return {
      user: {
        email: payload.email,
        idToken: payload.idToken,
        localId: payload.localId,
      },
      isAuth: true,
    };
  },
  [logoutSuccess]: () => initialState,
});

export default authReducer;
