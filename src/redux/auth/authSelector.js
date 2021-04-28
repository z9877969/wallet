export const getIsAuth = state => state.auth.isAuth;
export const getIsToken = state => !!state.auth.user.idToken;