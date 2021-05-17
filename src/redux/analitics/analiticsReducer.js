import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  resetCatData,
  resetPeriod,
  setCatData,
  setPeriod,
} from './analiticsAction';
import dataOf from '../../utils/helpers/classDataByPeriod';
import options from '../../assets/options/selectPeriods';

const iS = {
  period: options.ru[0].value,
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
