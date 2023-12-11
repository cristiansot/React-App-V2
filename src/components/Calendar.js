// Calendar.js
import Calendar from "react-calendar";
import React, { useState } from 'react';

const MyCalendar = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
    onDateChange(date); // Pass the selected date to the parent component
  };

  return (
    <div>
      <Calendar onChange={onChange} value={date} />
    </div>
  );
};

export default MyCalendar;
