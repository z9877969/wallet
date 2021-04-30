import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

const CustomDatePicker = ({ }) => {
  return (
    <div className="container">
      <ReactDatePicker
        // selected={date}
        // onChange={date => setDate(date)}
        dateFormat="dd-MM-yy"
        className="date"
      />
    </div>
  );
};

export default CustomDatePicker;
