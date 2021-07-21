import { createAction } from '@reduxjs/toolkit';

export const setPeriod = createAction('analitics/setCategoriesList');
export const resetPeriod = createAction('analitics/resetPeriod');

export const setCategoriesList = createAction('analitics/setCategoriesList');
export const resetCategoriesList = createAction(
  'analitics/resetCategoriesList',
);

export const setCatData = createAction('analitics/setCatData');
export const resetCatData = createAction('analitics/resetCatData');

export const setDateOfPeriod = createAction('analitics/setDateOfPeriod');
export const resetDateOfPeriod = createAction('analitics/resetDateOfPeriod');
