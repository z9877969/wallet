import axios from 'axios';

axios.defaults.baseURL = 'https://identitytoolkit.googleapis.com/v1/';
axios.defaults.params = {
  key: 'AIzaSyCRFI_dZqdUgbia23ytk0ieVoSex3J7HCY',
};

// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRFI_dZqdUgbia23ytk0ieVoSex3J7HCY
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCRFI_dZqdUgbia23ytk0ieVoSex3J7HCY

const signUp = data => {
  axios
    .post('accounts:signUp', data)
    .then(({ data }) => {
      axios.defaults.baseURL =
        'https://careful-ensign-297412-default-rtdb.firebaseio.com';
      axios.defaults.params = {
        auth: data.idToken,
      };
      return data;
    })
    .catch(e => e);
};

const signIn = data => {
  axios
    .post('accounts:signInWithPassword', data)
    .then(({ data }) => {
      axios.defaults.baseURL =
        'https://careful-ensign-297412-default-rtdb.firebaseio.com';
      axios.defaults.params = {
        auth: data.idToken,
      };
      return data;
    })
    .catch(e => e);
};

const addTransaction = ({ transaction, userId, transactionType }) => {
  axios
    .post(`users/${userId}/transactions/${transactionType}.json`, transaction)
    .then(({ data }) => {
      return { ...transaction, id: data.name };
    });
};

const getTransactions = ({ userId }) => {
  axios
    .post(`users/${userId}/transactions.json`)
    .then(({ data }) => {
      const { costs, incomes } = data;
      const transformDataToArr = data =>
        Object.entries(data).map(([id, data]) => ({ id, ...data }));
      const costsToArr = transformDataToArr(costs);
      const incomesToArr = transformDataToArr(incomes);
      return { incomes: incomesToArr, costs: costsToArr };
    })
    .catch(e => e);
};

export { signIn, signUp, addTransaction, getTransactions };
