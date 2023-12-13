import WeeklyProgressChart from './WeeklyProgressChart';
import WeeklyGoals from './WeeklyGoals';
import { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
const MockApiUrl = 'https://654d199b77200d6ba859fcf7.mockapi.io/mockdata';

function App() {

  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));  // state to hold the current displayed week
  const [originalApiData, setOriginalApiData] = useState([]);// needed a new state to hold all the apidata inorder to pass it into the buttons

  useEffect(() => {
    const getChartData = async () => {
      console.log('getting activity log info for week:', currentWeek);
      try {
        const response = await fetch(MockApiUrl);
        const data = await response.json();
        setOriginalApiData(data) // put api data into new state
        console.log("setOriginalApiData:", data)
      } catch (error) {
        console.error('error getting activity log info:', error);
      }
    };
    getChartData();
  }, [currentWeek]);



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
    <div className="App">
      <h1>Progress Dash</h1>
      <div>
        <button onClick={handleLastWeek}> Last Week </button>
        <span> {format(startOfWeek(currentWeek), 'MMM d')} - {format(endOfWeek(currentWeek), 'MMM d')} </span>
        <button onClick={handleNextWeek}> Next Week </button>
      </div>
      
      <WeeklyProgressChart currentWeek={currentWeek} originalApiData={originalApiData} />
      <WeeklyGoals className="WeeklyGoals" currentWeek={currentWeek} originalApiData={originalApiData}/>
     
    </div>
  );
}





export default App;
