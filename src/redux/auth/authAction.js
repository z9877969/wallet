import {createAction} from '@reduxjs/toolkit';

export const loginRequest = createAction("loginRequest");
export const loginSuccess = createAction("loginSuccess");
export const loginError = createAction("loginError");


export const logoutRequest = createAction("logoutRequest");
export const logoutSuccess = createAction("logoutSuccess");
export const logoutError = createAction("logoutError");

export const registerRequest = createAction("registerRequest");
export const registerSuccess = createAction("registerSuccess");
export const registerError = createAction("registerError");