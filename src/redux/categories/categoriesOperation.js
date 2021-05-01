import axios from 'axios';
import { addCategory, getCategoriesApi } from '../../services/firebaseApi';
import {
  addCostsCatError,
  addCostsCatRequest,
  addCostsCatSuccess,
  addIncomesCatError,
  addIncomesCatRequest,
  addIncomesCatSuccess,
  getCostsCatError,
  getCostsCatRequest,
  getCostsCatSuccess,
  getIncomesCatError,
  getIncomesCatRequest,
  getIncomesCatSuccess,
  isCategoriesNull,
} from './categoriesAction';

export const getCategories = () => (dispatch, getState) => {
  const { localId: userId } = getState().auth.user;
  dispatch(getIncomesCatRequest());

  // axios
  //   .get('/incomes-cat')
  getCategoriesApi({ userId })
    .then(({ incomes, costs }) => {
      console.log('incomes :>> ', incomes);
      dispatch(getIncomesCatSuccess(incomes));
      !incomes.length && dispatch(isCategoriesNull('incomes'));
      dispatch(getCostsCatSuccess(costs));
      !costs.length && dispatch(isCategoriesNull('costs'));
    })
    .catch(err => {
      console.log("error");
      dispatch(
        getIncomesCatError({ message: err.message, status: err.status }),
      )
    }
    );
};

// export const getCostsCat = () => dispatch => {
//   dispatch(getCostsCatRequest());

//   axios
//     .get('/costs-cat')
//     .then(({ data }) => {
//       dispatch(getCostsCatSuccess(data));
//       !data.length && dispatch(isCategoriesNull('costs'));
//     })
//     .catch(err => dispatch(getCostsCatError(err.message)));
// };

export const addIncomesCat = data => (dispatch, getState) => {
  const { localId, idToken } = getState().auth.user;
  dispatch(addIncomesCatRequest());

  addCategory({
    data,
    localId,
    transactionType: 'incomes',
    idToken,
  })
    .then(data => dispatch(addIncomesCatSuccess(data)))
    .catch(err =>
      dispatch(
        addIncomesCatError({ message: err.message, status: err.status }),
      ),
    );
};

export const addCostsCat = data => (dispatch, getState) => {
  const { localId, idToken } = getState().auth.user;
  dispatch(addCostsCatRequest());

  addCategory({
    data,
    localId,
    transactionType: 'incomes',
    idToken,
  })
    .then(data => dispatch(addCostsCatSuccess(data)))
    .catch(err =>
      dispatch(addCostsCatError({ message: err.message, status: err.status })),
    );
};
