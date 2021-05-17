import ReactDatePicker from "react-datepicker";
import Button from "../share/Button";
import 'react-datepicker/dist/react-datepicker.css';
import css from './DatesPaginator.module.css';
import iconsPath from '../../assets/icons/sprite.svg';


const icons = {
  chevronL: { path: iconsPath, id: 'icon-cheveron-left' },
  chevronR: { path: iconsPath, id: 'icon-cheveron-right' },
};

const DatesPaginator = ({title, date, handleChangeDate}) => {
  return (
    <div className={css.dateContatiner}>
      <Button icon={icons.chevronL} className={css.btnChevron} />
      <label className={css.labelDate}>
        <span>{title}</span>
        <ReactDatePicker
          className={css.visuallyhidden}
          selected={date}
          onChange={handleChangeDate}
        />
      </label>
      <Button icon={icons.chevronR} className={css.btnChevron} />
    </div>
  );
};

export default DatesPaginator;
