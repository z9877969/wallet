import axios from 'axios';

import { signUp, signIn } from '../../services/firebaseApi';
import {
  loginError,
  loginRequest,
  loginSuccess,
  registerError,
  registerRequest,
  registerSuccess,
} from './authAction';

const userRegister = dataPost => async dispatch => {
  dispatch(registerRequest());

  try {
    const data = await signUp(dataPost);
    
    dispatch(registerSuccess(data));
    // if (data) {
    // } else {
    //   throw new Error('Data undefined');
    // }
  } catch (e) {
    dispatch(registerError(e.message));
    throw e;
  }
};

const userLogin = data => dispatch => {
  dispatch(loginRequest());

  signIn(data)
    .then(data => dispatch(loginSuccess(data)))
    .catch(e => dispatch(loginError(e.message)));
};

export { userRegister, userLogin };
