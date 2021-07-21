import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  resetCatData,
  resetDateOfPeriod,
  resetPeriod,
  setCatData,
  setDateOfPeriod,
  setPeriod,
} from './analiticsAction';
import dataOf from '../../utils/helpers/classDataByPeriod';
import options from '../../assets/options/selectPeriods';

const iS = {
  period: options.ru[0].value,
  catData: {},
  date: dataOf.current,
};

const period = createReducer(iS.period, {
  [setPeriod]: (_, { payload }) => payload,
  [resetPeriod]: () => iS.period,
});

const catData = createReducer(iS.catData, {
  [setCatData]: (_, { payload }) => dataOf.getDataListOfCategories(payload),
  [resetCatData]: () => iS.catData,
});

const date = createReducer(iS.date, {
  [setDateOfPeriod]: (_, { payload }) => payload,
  [resetDateOfPeriod]: (_, { payload }) => iS.date,
});

export default combineReducers({
  period,
  date,
  catData,
});
