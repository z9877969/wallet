import getDataByCategories from './getDataByCategories';
import generateId from './genarateId';
import getPeriodsSumms from './getPeriodsSumms';
import turnDataListToArr from './turnDataListToArr';
import classDataByPeriod from './classDataByPeriod';

const ed = {
  getDataByCategories,
  generateId,
  getPeriodsSumms,
  turnDataListToArr,
  dataByPeriod: classDataByPeriod,
};

export default ed;
