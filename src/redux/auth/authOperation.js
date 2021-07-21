import axios from 'axios';

import { signUp, signIn, refreshTokenApi } from '../../services/firebaseApi';
import {
  loginError,
  loginRequest,
  loginSuccess,
  refreshError,
  refreshRequest,
  refreshSuccess,
  registerError,
  registerRequest,
  registerSuccess,
} from './authAction';

const userRegister = dataPost => async dispatch => {
  dispatch(registerRequest());

  try {
    const data = await signUp(dataPost);

    dispatch(registerSuccess(data));
  } catch (e) {
    dispatch(registerError({ message: e.message, status: e.status }));
  }
};

const userLogin = data => dispatch => {
  dispatch(loginRequest());

  signIn(data)
    .then(data => dispatch(loginSuccess(data)))
    .catch(e => {
      console.log('e :>> ', e);
      dispatch(loginError({ message: e.message, status: e.status }));
    });
};

const userRefresh = () => (dispatch, getState) => {
  const { refreshToken } = getState().auth.user;
  dispatch(refreshRequest());
  refreshTokenApi(refreshToken)
    .then(data => dispatch(refreshSuccess(data)))
    .catch(e =>
      dispatch(refreshError({ message: e.message, status: e.status })),
    );
};

export { userRegister, userLogin, userRefresh };
