import axios from 'axios';
import jwt_decode from 'jwt-decode';

class ApiOpts {
  #AUTH_KEY = 'AIzaSyCRFI_dZqdUgbia23ytk0ieVoSex3J7HCY';
  #url = {
    AUTH: 'https://identitytoolkit.googleapis.com/v1/',
    DB: 'https://careful-ensign-297412-default-rtdb.firebaseio.com/',
    REFRESH: 'https://securetoken.googleapis.com/v1/token',
  };
  #baseURL = '';
  #path = {
    signIn: 'accounts:signInWithPassword',
    signUp: 'accounts:signUp',
    transactions: (type, id) => {
      if (id) return `/users/${this.userId}/transactions/${type}/${id}.json`;

      return `/users/${this.userId}/transactions${!type ? "" : '/' + type}.json`;
    },
    categories: (type, id) => {
      if (id) return `/users/${this.userId}/categories/${type}/${id}.json`;

      return `/users/${this.userId}/categories${!type ? "" : '/' + type }.json`;
    },
  };
  #userId = '';

  get url() {
    return this.#url;
  }
  get authKey() {
    return this.#AUTH_KEY;
  }
  get baseUrl() {
    return this.#baseURL;
  }
  get path() {
    return this.#path;
  }
  get userId() {
    return this.#userId;
  }

  getUserId = token => {
    return jwt_decode(token).user_id;
  };
  setUserId = token => {
    if (!this.userId) {
      const id = this.getUserId(token);
      this.#userId = id;
    }
  };
  setRequestOptions = (url, params) => {
    axios.defaults.baseURL = url;
    axios.defaults.params = params;
  };
  setAuth = () => {
    const params = { key: this.authKey };
    this.setRequestOptions(this.url.AUTH, params);
  };
  setDB = token => {
    const params = { auth: token };
    this.setRequestOptions(this.url.DB, params);
    this.setUserId(token);
  };
  setRefresh = token => {
    this.setRequestOptions(this.url.REFRESH, {
      key: this.authKey,
      grant_type: 'refresh_token',
      refresh_token: token,
    });
  };
  get = path => {
    return axios(path);
  };
  post = (path = '', data, opts = {}) => {
    return axios.post(path, data, opts || null);
  };
  patch = (path, data, opts = {}) => {
    return axios.patch(path, data, opts);
  };
}

const apiOpts = new ApiOpts();

export { apiOpts };
