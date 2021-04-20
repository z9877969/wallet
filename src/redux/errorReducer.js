import { createReducer } from '@reduxjs/toolkit';
import {
    addCostsError,
    addIncomesError,
    getCostsError,
    getIncomesError,
} from './transactions/transactionsAction';

const errorReducer = createReducer(null, {
    [addIncomesError]: (_, {payload}) => payload,
    [addCostsError]: (_, {payload}) => payload,
    [getIncomesError]: (_, {payload}) => payload,
    [getCostsError]: (_, {payload}) => payload,
})

export default errorReducer;
