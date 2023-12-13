import './css/App.css';
// import React, { useState, useEffect } from 'react';
// import WeeklyProgressChart from './marwas-components/WeeklyProgressChart';
// import WeeklyGoals from './marwas-components/WeeklyGoals';
// import GoalList from './marwas-components/GoalList';
import AppMarwa from './marwas-components/AppMarwa'

// const MockApiUrl = 'https://655d2efa9f1e1093c5991797.mockapi.io/Marwa/ProgressVisualizer'


function App() {
//   //GET
//   const [goal, setNewGoal] = useState([]);
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(MockApiUrl);
//         const data = await response.json();
//         setNewGoal(data);
//         console.log(data, "goal");
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     fetchData()
//   }, []);

//   //POST
//   const handleWeeklyGoals = async (newGoalWeek) => {
//     try {
//       const response = await fetch(MockApiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newGoalWeek),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add goal');
//       }

//       const data = await response.json();
//       setNewGoal([...goal, data]);
//     } catch (error) {
//       console.error('Error adding goal:', error);
//     }
//   };

//   //DELETE
//   const handleDeleteGoal = async (goalId) => {
//     try {
//       const response = await fetch(`${MockApiUrl}/${goalId}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete book');
//       }
//       setNewGoal(goal.filter((goal) => goal.id !== goalId));
//     } catch (error) {
//       console.error('Error deleting goal:', error);
//     }
//   };



  return (
    <div className="App">
      {/* <h1>Progress Dash</h1> */}
      {/* <WeeklyProgressChart /> */}
      {/* <h1>Weekly Fitness Goal</h1> */}
      < AppMarwa/>
      {/* <WeeklyGoals className="WeeklyGoals" /> */}
      {/* onGoal={handleWeeklyGoals}  */}
      {/* <GoalList className="GoalList" goal={goal} onDeleteGoal={handleDeleteGoal} /> */}
    </div>
  );
}





export default App;
