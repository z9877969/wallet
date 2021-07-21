import { createSelector } from '@reduxjs/toolkit';

export const getTransactionsListId = state => state.transactions.listId;
export const getCatsData = state => state.analitics.catData;
export const getPeriod = state => state.analitics.period;

export const getCatsWithTotal = state =>
  Object.entries(state.analitics.catData).map(([category, { total }]) => ({
    category,
    total,
  }));

export const getCatDataByPeriod = createSelector(
  [getTransactionsListId, getCatsData],
  (cat, catData) => {
    return catData[cat].data;
  },
);
