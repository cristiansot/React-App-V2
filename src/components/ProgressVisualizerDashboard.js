import '../css/Progress.css';
import WeeklyProgressChart from './WeeklyProgressChart';
import WeeklyGoals from './WeeklyGoals';
import { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { myAPIKey } from '../services/config';
const MockApiUrl = `https://${myAPIKey}.mockapi.io/activities`;

function App() {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date())); // state to hold the current displayed week
  const [originalApiData, setOriginalApiData] = useState([]); // needed a new state to hold all the apidata inorder to pass it into the buttons

  useEffect(() => {
    const getChartData = async () => {
      try {
        const response = await fetch(MockApiUrl);
        const data = await response.json();
        setOriginalApiData(data); // put api data into new state
      } catch (error) {}
    };
    getChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // last week button
  const handleLastWeek = () => {
    const viewNewWeek = new Date(currentWeek);
    viewNewWeek.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(startOfWeek(viewNewWeek)); // viewNewWeek is based on the currentWeek minus 7 days, and resets it to the start of the week
  };

  // next week button
  const handleNextWeek = () => {
    const viewNewWeek = new Date(currentWeek);
    viewNewWeek.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(startOfWeek(viewNewWeek)); // viewNewWeek is based on the currentWeek, plus 7 days, and resets it to the start of the week
  };

  return (
    <div className="ProgressVisualizer">
      <div className="buttons-container">
        <button className="button-text" onClick={handleLastWeek}>
          {' '}
          Last Week{' '}
        </button>
        <span className="date-text">
          {' '}
          {format(startOfWeek(currentWeek), 'MMM d')} -{' '}
          {format(endOfWeek(currentWeek), 'MMM d')}{' '}
        </span>
        <button className="button-text" onClick={handleNextWeek}>
          {' '}
          Next Week{' '}
        </button>
      </div>

      <div className="container-wrapper">
        <div className="weekly-progress-container">
          <h1 style={{ color: '#f68a3c', fontSize: '3rem' }}>
            Progress Dashboard
          </h1>
          <WeeklyProgressChart
            currentWeek={currentWeek}
            originalApiData={originalApiData}
          />
        </div>
        <div className="weekly-goals-container">
          <h1 style={{ color: '#f68a3c', fontSize: '3rem' }}>
            Weekly Fitness Goal
          </h1>
          <WeeklyGoals
            className="WeeklyGoals"
            currentWeek={currentWeek}
            activityProgressApiData={originalApiData}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
