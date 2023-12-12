import React, { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../css/calendar.css'

//calendar library component --> https://react-day-picker.js.org
function MyCalendar() {
  const [selected, setSelected] = useState([]);

  let footer = <p>Pick a day to view a history log</p>;
  if (selected.length > 0) {
    footer = <p>You picked {format(selected[0], 'PP')}.</p>;
  }

  return (
    <DayPicker
      id='backgroundDayPicker'
      mode="single"
      selected={selected}
      onSelect={(date) => setSelected([date])}
      footer={footer}
    />
  );
}

export default MyCalendar;



