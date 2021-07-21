export const getIsAuth = state => state.auth.isAuth;
// export const getIsAuth = state => !state.error?.message.includes('code 401');
export const getIsToken = state => !!state.auth.user.idToken;