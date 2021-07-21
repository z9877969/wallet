import ReactDatePicker from 'react-datepicker';
import Button from '../share/Button';
import 'react-datepicker/dist/react-datepicker.css';
import css from './DatesPaginator.module.css';
import iconsPath from '../../assets/icons/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getPeriod } from '../../redux/analitics/analiticsSelector';
import dataByPeriod from '../../utils/helpers/classDataByPeriod';
import { useEffect, useState } from 'react';

import moment from 'moment';
import { setDateOfPeriod } from '../../redux/analitics/analiticsAction';

const icons = {
  chevronL: { path: iconsPath, id: 'icon-cheveron-left' },
  chevronR: { path: iconsPath, id: 'icon-cheveron-right' },
};

const DatesPaginator = () => {
  const dispatch = useDispatch();
  const period = useSelector(getPeriod);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(dataByPeriod.updatingDate);

  const handleChangeDate = date => setSelectedDate(date);

  const handleUpdatingPeriod = direct => {
    const { direction } = dataByPeriod;
    direct === 'left' && dataByPeriod.setUpdatingDate(period, direction.LEFT);
    direct === 'right' && dataByPeriod.setUpdatingDate(period, direction.RIGHT);
    setDate(dataByPeriod.updatingDate);
    dispatch(setDateOfPeriod(dataByPeriod.updatingDate));
  };

  useEffect(() => {
    setSelectedDate(moment(date)._d);
  }, [date]);

  return (
    <div className={css.dateContatiner}>
      <Button
        icon={icons.chevronL}
        className={css.btnChevron}
        cbOnClick={handleUpdatingPeriod}
        cbArgs={['left']}
      />
      <label className={css.labelDate}>
        <span>{dataByPeriod.getDateOfPeriodStr({ date, period })}</span>
        <ReactDatePicker
          className={css.visuallyhidden}
          closeOnScroll={true}
          selected={selectedDate}
          onChange={handleChangeDate}
        />
      </label>
      <Button
        icon={icons.chevronR}
        className={css.btnChevron}
        cbOnClick={handleUpdatingPeriod}
        cbArgs={['right']}
      />
    </div>
  );
};

export default DatesPaginator;
