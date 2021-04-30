import axios from 'axios';

const dbConst = {
  authKey: 'AIzaSyCRFI_dZqdUgbia23ytk0ieVoSex3J7HCY',
  authUrl: 'https://identitytoolkit.googleapis.com/v1/',
  dbUrl: 'https://careful-ensign-297412-default-rtdb.firebaseio.com/',
  refreshUrl: 'https://securetoken.googleapis.com/v1/token',
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
    .catch(e => {
      throw e;
    });
};

const signIn = data => {
  setRequestOptions(dbConst.authUrl, { key: dbConst.authKey });
  return axios
    .post('accounts:signInWithPassword', { ...data, returnSecureToken: true })
    .then(({ data }) => {
      return data;
    })
    .catch(e => {
      throw e;
    });
};

const refreshTokenApi = REFRESH_TOKEN => {
  setRequestOptions(dbConst.refreshUrl, {
    key: dbConst.authKey,
    grant_type: 'refresh_token',
    refresh_token: REFRESH_TOKEN,
  });
  return axios
    .post()
    .then(({ data: { user_id, access_token, refresh_token } }) => ({
      localId: user_id,
      idToken: access_token,
      refreshToken: refresh_token,
    }))
    .catch(e => {
      throw e;
    });
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
    .catch(e => {
      throw e;
    });
};

const addTransaction = ({ data, localId, transactionType, idToken }) => {
  return axios
    .post(`/users/${localId}/transactions/${transactionType}.json`, data)
    .then(({ data: { name: id } }) => {
      return { ...data, id };
    })
    .catch(e => {
      throw e;
    });
};

const editTransaction = ({
  data,
  localId,
  transactionType,
  id: transactionId,
}) => {
  return axios
    .patch(
      `/users/${localId}/transactions/${transactionType}/${transactionId}.json`,
      data,
    )
    .then(({ data }) => {
      return { ...data, id: transactionId };
    })
    .catch(e => {
      throw e;
    });
};

const getCategoriesApi = ({ userId }) => {
  return axios
    .get(`/users/${userId}/categories.json`)
    .then(({ data }) => {
      const { costs, incomes } = data;
      const transformDataToArr = data =>
        Object.entries(data).map(([id, data]) => ({ id, ...data }));
      const costsToArr = transformDataToArr(costs || []);
      const incomesToArr = transformDataToArr(incomes || []);
      return { incomes: incomesToArr, costs: costsToArr };
    })
    .catch(e => {
      throw e;
    });
};

const addCategory = ({ data, localId, transactionType, idToken }) => {
  return axios
    .post(
      `/users/${localId}/categories/${transactionType}.json?auth=${idToken}`,
      data,
    )
    .then(({ data: { name: id } }) => {
      return { ...data, id };
    })
    .catch(e => {
      throw e;
    });
};

export {
  signIn,
  signUp,
  refreshTokenApi,
  addTransaction,
  getTransactionsApi,
  editTransaction,
  getCategoriesApi,
  addCategory,
};
