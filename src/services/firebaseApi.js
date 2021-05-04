import { apiOpts } from './classApiOpts';
import help from '../utils/helpers';

const signUp = data => {
  const { setAuth, post, path, setUserId } = apiOpts;
  setAuth();
  return post(path.signUp, { ...data, returnSecureToken: true })
    .then(({ data }) => {
      const { idToken } = data;
      setUserId(idToken);
      return data;
    })
    .catch(e => {
      throw e;
    });
};

const signIn = data => {
  const { setAuth, post, path, setUserId } = apiOpts;
  setAuth();
  return post(path.signIn, { ...data, returnSecureToken: true })
    .then(({ data }) => {
      const { idToken } = data;
      setUserId(idToken);
      return data;
    })
    .catch(e => {
      throw e;
    });
};

const refreshTokenApi = REFRESH_TOKEN => {
  apiOpts.setRefresh(REFRESH_TOKEN);
  return apiOpts
    .post()
    .then(({ data: { access_token, refresh_token } }) => ({
      idToken: access_token,
      refreshToken: refresh_token,
    }))
    .catch(e => {
      throw e;
    });
};

const getTransactionsApi = token => {
  const { setDB, get, path } = apiOpts;
  setDB(token);

  return get(path.transactions())
    .then(({ data }) => {
      const { costs, incomes } = data;
      const costsToArr = help.turnDataListToArr(costs || []);
      const incomesToArr = help.turnDataListToArr(incomes || []);
      return { incomes: incomesToArr, costs: costsToArr };
    })
    .catch(e => {
      throw e;
    });
};

const addTransaction = ({ data, transactionType: type }) => {
  const { post, path } = apiOpts;
  return post(path.transactions(type), data)
    .then(({ data: { name: id } }) => {
      return { ...data, id };
    })
    .catch(e => {
      throw e;
    });
};

const editTransaction = ({ data, transactionType: type, id }) => {
  const { patch, path } = apiOpts;
  return patch(path.transactions(type, id), data)
    .then(({ data }) => {
      return { ...data, id };
    })
    .catch(e => {
      throw e;
    });
};

const getCategoriesApi = token => {
  const { setDB, get, path } = apiOpts;
  setDB(token);

  return get(path.categories())
    .then(({ data }) => {
      if (data === null) return { incomes: [], costs: [] };
      const { costs, incomes } = data;
      const costsToArr = costs ? help.turnDataListToArr(costs) : [];
      const incomesToArr = incomes ? help.turnDataListToArr(incomes) : [];
      return { incomes: incomesToArr, costs: costsToArr };
    })
    .catch(e => {
      throw e;
    });
};

const addCategory = ({ data, transactionType: type }) => {
  const { post, path } = apiOpts;
  return post(path.categories(type), data)
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
