import React, { useState } from 'react';

function WeeklyGoals({onGoal}) {
  const [newGoal, setNewGoal] = useState('');


  const handleInput = (e) => {
    setNewGoal(e.target.value);
    // note to self: e.target.value is saying whatever the user typed in the input field is going to be stored inside setNewGoal
    // note: so whats happening here is we're updating the function that allows the current state to be updated to the new goal 
    // note: this makes it re-render
  };

  const handleSubmit = (e) => {//button click
    e.preventDefault(); // stops the page from refreshing

    if (newGoal.trim()) {
        //trim is checking making sure the user types something in and is not an empty string.
        //when user clicks the button, without .trim, i get Error: newBookName is not a function
        //when user clicks the button without typing anything in the iput, with .trim, i get Error: Cannot read properties of undefined (reading 'trim')
        onGoal({ title: newGoal }); // prop in app.js
      setNewGoal('');//clearing input after re-render
    }
  };

  return (
    <form className="WeeklyGoals" onSubmit={handleSubmit}>
        <input type="text" value={newGoal} onChange={handleInput} />
      <button type="submit">Save Your Goal</button>
    </form>
  );
};

export default WeeklyGoals





