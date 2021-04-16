import { createStore } from 'redux';
import rootReducer from './rootReducer';

// const rootReducer = (state = {arr: []}, action) => state;


export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
