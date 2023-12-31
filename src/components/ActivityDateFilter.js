import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import '../css/Activity.css';

function ActivityDateFilter({ selectedDate, onDayClick }) {
  let footer = (
    <p className="pick">
      Click on a date to see activities logged for that day.
    </p>
  );
  let date;
  if (selectedDate) {
    date = format(selectedDate, 'PPPP');
    footer = <p></p>;
  } else {
    date = format(new Date(), 'PPPP');
  }

  return (
    <div className="DateFilter">
      <div className="selected-date">{date}</div>
      <DayPicker
        showOutsideDays
        fixedWeeks
        className="activity-calendar"
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          onDayClick(date);
        }}
        footer={footer}
      />
    </div>
  );
}

export default ActivityDateFilter;
