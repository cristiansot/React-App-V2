import ReactModal from 'react-modal';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../css/calendar.css';

function MyCalendar({ getNutrition, nutrition }) {
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDayInfo, setSelectedDayInfo] = useState(null);

  /* The `useEffect` hook is used to perform side effects in a functional component.
  In this case, it is used to call the `getNutrition` function when the component mounts
  or when the `getNutrition` function changes. */
  useEffect(() => {
    getNutrition();
  }, [getNutrition]);

  /* The function `handleDayClick` is used to handle the click event on a day in a calendar
  and perform certain actions based on the selected date.
  @param date - The `date` parameter represents the selected date when the `handleDayClick` function */
  const handleDayClick = (date, { selected, selectedDisabled }) => {
    if (selectedDisabled) {
      return;
    }

    setSelected(date);

    const selectedInfo = nutrition.find((item) => item.date === format(date, 'yyyy-MM-dd'));

    setShowModal(true);
    setSelectedDayInfo(selectedInfo);
  };

  /* The function handleCloseModal sets the value of showModal to false. */
  const handleCloseModal = () => {
    setShowModal(false);
  };

  /* The code block is defining the `footer` variable. It is initially set to a paragraph element
  with the class name 'pick' and the text "Pick a day to view a history log". */
  let footer = <p className='pick'>Pick a day to view a history log</p>;
  if (selected.length > 0) {
    footer = <p className='picked'>You picked {format(selected[0], 'PP')}.</p>;
  }
  
/* I used this component for the calendar --> https://www.npmjs.com/package/react-day-picker */
  return (
    <div>
      <DayPicker
        id='backgroundDayPicker'
        mode="single"
        selected={selected}
        onSelect={handleDayClick}
        footer={footer}
      />

      <ReactModal
        isOpen={showModal}
        contentLabel="Selected Day Information"
        onRequestClose={handleCloseModal}
      >
        <div className='foodContent'>
          <h2>Nutrition day log</h2>
          <p>Date: {selectedDayInfo?.date}</p>
          <p>Cereal Name: {selectedDayInfo?.cerealName}</p>
          <p>Vegetable Name: {selectedDayInfo?.vegetableName}</p>
          <p>Fruit Name: {selectedDayInfo?.fruitName}</p>
          <p>Dairy Name: {selectedDayInfo?.dairyName}</p>
          <p>Meat Name: {selectedDayInfo?.meatName}</p>
          <p>Oil Name: {selectedDayInfo?.oilName}</p>
          <p>Sugar Name: {selectedDayInfo?.sugarName}</p>
        </div>
      </ReactModal>
    </div>
  );
}

export default MyCalendar;
