import React, { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import Select from 'react-select';
const MockApiUrl = 'https://654d199b77200d6ba859fcf7.mockapi.io/mockdata';

function WeeklyGoals({ onGoal, currentWeek }) {
  const [newGoal, setNewGoal] = useState('');
  // const [originalApiData, setOriginalApiData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(MockApiUrl);
  //       const data = await response.json();
  //       setOriginalApiData(data);
  //       console.log('API Data Collectd for DropDown:', data);
  //     } catch (error) {
  //       console.error('Error fetching API data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const loadOptions = (searchValue, callback) => {
  //   setTimeout(() => {

  //     if (!originalApiData || !Array.isArray(originalApiData)) {
  //       console.error('Invalid API data:', originalApiData);
  //       callback([]);
  //       return;
  //     }
  //     const filteredOptions = originalApiData
  //       .filter((option) =>
  //         option.activity &&
  //         typeof option.activity === 'string' &&
  //         option.activity.toLowerCase().includes(searchValue.toLowerCase())
  //       )
  //       .map((option) => ({ label: option.activity, value: option.activity }));

  //     callback(filteredOptions);
  //   }, 2000);

  // };


  const options = [
    { value: 'Running', label: 'Running' },
    { value: 'Biking', label: 'Biking' },
    { value: 'Climbing', label: 'Climbing' },
    { value: 'Hiking', label: 'Hiking' },
    { value: 'Swimming', label: 'Swimming' }
  ]





  const handleChange = (selectedOption) => {
    console.log('handleChange', selectedOption);
  };


  const handleInput = (e) => {
    setNewGoal(e.target.value);
  };
  const handleSubmit = (e) => {//button click
    e.preventDefault(); // stops the page from refreshing

    if (newGoal.trim()) {

      onGoal({ title: newGoal }); // prop in app.js
      setNewGoal('');//clearing input after re-render
    }
  };

  return (
    <div>
      <h1>Weekly Fitness Goal  </h1>
      <h2>{format(startOfWeek(currentWeek), 'MMM d')} - {format(endOfWeek(currentWeek), 'MMM d')}</h2>

      <Select
        options={options}
        onChange={handleChange}
      />

      <form className="WeeklyGoals" onSubmit={handleSubmit}>
        <input type="text" value={newGoal} onChange={handleInput} />
        <button type="submit">Save Your Goal</button>
      </form>

    </div>
  )
};

export default WeeklyGoals





