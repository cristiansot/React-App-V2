import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import '../css/Activity.css';

function ActivityDateFilter({ onDayClick }) {
  const [selectedDate, setSelectedDate] = useState();

  let footer = (
    <p className="pick">
      Click on a date to see activities logged for that day.
    </p>
  );
  let date;
  if (selectedDate) {
    date = format(selectedDate, 'PPPP');
    footer = <p></p>;
    console.log(date);
  } else {
    date = format(new Date(), 'PPPP');
  }

  console.log(date);

  return (
    <div className="DateFilter">
      <div className="selected-date">{date}</div>
      <DayPicker
        showOutsideDays
        fixedWeeks
        className="activity-calendar"
        mode="single"
        selectedDate={selectedDate}
        onSelect={(date) => {
          setSelectedDate(date);
          onDayClick(date);
        }}
        footer={footer}
      />
    </div>
  );
}

export default ActivityDateFilter;