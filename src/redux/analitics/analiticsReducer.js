import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  resetCatData,
  resetPeriod,
  setCatData,
  setPeriod,
} from './analiticsAction';
import dataOf from '../../utils/helpers/classDataByPeriod';

const iS = {
  period: '',
  catData: {},
};

const period = createReducer(iS.period, {
  [setPeriod]: (_, { payload }) => payload,
  [resetPeriod]: () => iS.period,
});

const catData = createReducer(iS.catData, {
  [setCatData]: (_, { payload }) => dataOf.getCategoriesDataList(payload),
  [resetCatData]: () => iS.catData,
});

export default combineReducers({
  period,
  catData,
});
