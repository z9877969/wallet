import axios from 'axios';

const dbConst = {
  authKey: 'AIzaSyCRFI_dZqdUgbia23ytk0ieVoSex3J7HCY',
  authUrl: 'https://identitytoolkit.googleapis.com/v1/',
  dbUrl: 'https://careful-ensign-297412-default-rtdb.firebaseio.com/',
};

const setRequestOptions = (baseUrl, params) => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.params = params;
};

const signUp = data => {
  setRequestOptions(dbConst.authUrl, { key: dbConst.authKey });
  return axios
    .post('accounts:signUp', { ...data, returnSecureToken: true })
    .then(({ data }) => {
      return data;
    })
    .catch(e => e);
};

const signIn = data => {
  setRequestOptions(dbConst.authUrl, { key: dbConst.authKey });
  return axios
    .post('accounts:signInWithPassword', { ...data, returnSecureToken: true })
    .then(({ data }) => {
      return data;
    })
    .catch(e => e);
};

const getTransactionsApi = ({ userId, idToken }) => {
  setRequestOptions(dbConst.dbUrl, { auth: idToken });
  return axios
    .get(`/users/${userId}/transactions.json`)
    .then(({ data }) => {
      const { costs, incomes } = data;
      const transformDataToArr = data =>
        Object.entries(data).map(([id, data]) => ({ id, ...data }));
      const costsToArr = transformDataToArr(costs || []);
      const incomesToArr = transformDataToArr(incomes || []);
      return { incomes: incomesToArr, costs: costsToArr };
    })
    .catch(e => e);
};

const addTransaction = ({ data, localId, transactionType, idToken }) => {
  return axios
    .post(
      `/users/${localId}/transactions/${transactionType}.json?auth=${idToken}`,
      data,
    )
    .then(({ data: { name: id } }) => {
      return { ...data, id };
    })
    .catch(e => e);
};

export { signIn, signUp, addTransaction, getTransactionsApi };
