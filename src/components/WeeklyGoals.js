// -------------IMPORT STATEMENTS------------//
import '../css/Progress.css'
import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { format, startOfWeek, endOfWeek, isSameDay } from "date-fns";
import Select from "react-select";
import activityOptions from '../data/ActivityOptions';
import myAPIKey from '../services/config';
const GoalAPI = `https://${myAPIKey}.mockapi.io/weeklygoal`;
const MockApiUrl = `https://${myAPIKey}.mockapi.io/activities`;
// ----------------------------------------------//


// -------------State Initializations------------//
function WeeklyGoals({ currentWeek, activityProgressApiData }) {
  const [durationGoal, setDurationGoal] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState({});
  const [weeklyGoals, setWeeklyGoals] = useState([]);
  const [weeklyGoalsChartData, setWeeklyGoalsChartData] = useState([]);
  // ----------------------------------------------//


  // -------------Options Mapping ------------//
  // updated the options to pull the data from Novita's activityOptions component so its dynamic
  const options = activityOptions.map((option) => ({
    value: option.activity,
    label: option.activity,
  }));
  // -----------------------------------------//


  // -------------Funtion To Calculate Data For Multiple Pie Charts ------------//
  const calculateWeeklyPieChart = () => {
    let weeklyTotals = {
      weeklyGoal: {},
      progress: {}
    };

    // Looping through each entry in the WEEKLY GOALS API array
    weeklyGoals.forEach((weeklyGoal) => {
      const activityDate = new Date(weeklyGoal.date)
      const weekStart = startOfWeek(activityDate);
      const doesWeekStartMatchCurrentWeek = isSameDay(weekStart, currentWeek);

      if (doesWeekStartMatchCurrentWeek) {
        const matchingWeeklyGoalsActivity = activityOptions.find(option => option.activity === weeklyGoal.activity); // added this line to so we can find the corresponding activity object
        if (matchingWeeklyGoalsActivity) {  // Update the weekly goal total for the matched activity
          if (weeklyTotals.weeklyGoal[weeklyGoal.activity] === undefined) {
            weeklyTotals.weeklyGoal[weeklyGoal.activity] = 0;
          }
          weeklyTotals.weeklyGoal[matchingWeeklyGoalsActivity.activity] += weeklyGoal.duration;
        }
      }
    });

    // Looping through each entry in the ACTIVITY LOG API array
    activityProgressApiData.forEach((activity) => {
      const activityDate = new Date(activity.date);
      const weekStart = startOfWeek(activityDate);
      const doesWeekStartMatchCurrentWeek = isSameDay(weekStart, currentWeek);

      if (doesWeekStartMatchCurrentWeek) {
        const matchingActivityProgressFromApiData = activityOptions.find(option => option.activity === activity.activity);  // same concept as line 40
        if (matchingActivityProgressFromApiData) {  // Update the progress total for the matched activity
          if (weeklyTotals.progress[matchingActivityProgressFromApiData.activity] === undefined) {
            weeklyTotals.progress[matchingActivityProgressFromApiData.activity] = 0;
          }
          weeklyTotals.progress[matchingActivityProgressFromApiData.activity] += activity.duration;
        }
      }
    });

    const multiplePieCharts = [];
    for (const activity in weeklyTotals.weeklyGoal) {
      const pieChartTotals = [["Task", "Value"]];
      pieChartTotals.push([`${activity} Goal`, weeklyTotals.weeklyGoal[activity]]);
      if (weeklyTotals.progress != undefined && weeklyTotals.progress[activity] != undefined) {
        pieChartTotals.push([`${activity} Progress`, weeklyTotals.progress[activity]]);
      }
      const dataForPieCharts = {
        chartTitle: `${activity} Goals`,
        data: pieChartTotals
      };
      multiplePieCharts.push(dataForPieCharts)
      console.log(`${activity}: ${weeklyTotals.weeklyGoal[activity]}`);
    }

    console.log(multiplePieCharts)
    return multiplePieCharts;
  };
  // -------------------------------------------------------------------------//


  // -------------Event Handlers ------------//
  const handleInput = (e) => {
    setDurationGoal(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const goal = {
      date: currentWeek,
      activity: selectedActivity.label,
      duration: durationGoal,
    };
    handleWeeklyGoals(goal);
  };

  const handleChange = (selectedOption) => {
    setSelectedActivity(selectedOption);
    console.log("handleChange", selectedOption);
  };
  // -----------------------------------------//



  // -------------Fetching Data From API ------------//
  const fetchData = async () => {
    try {
      const response = await fetch(GoalAPI);
      const data = await response.json();
      setWeeklyGoals(data);
      console.log("Goal api Data Collectd:", data);
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };
  // -----------------------------------------//




  // -------------useEffect Hooks ------------//

  //1st hook
  useEffect(() => {
    fetchData();//moved the const fetchData outside of this useEffect so that i can call the fetchData in the "post", that way when the use saves their goal, the charts automatically populate
    // removed dependency array to only fetch data once
  }, []);


  //2nd hook
  useEffect(() => {
    if (weeklyGoals.length > 0) { // if array it empty, it wont update the chart
      const updatedChartInfo = calculateWeeklyPieChart();
      console.log("updated chart info", JSON.stringify(updatedChartInfo))
      setWeeklyGoalsChartData(updatedChartInfo);
    } else {
      console.log("Weekly Goals Data still loading")
    }
  }, [weeklyGoals, currentWeek]);
  // -----------------------------------------//





  // -------------POST Request ------------//
  const handleWeeklyGoals = async (durationGoalWeek) => {
    try {
      const response = await fetch(GoalAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(durationGoalWeek),
      });

      if (!response.ok) {
        throw new Error("Failed to add goal");
      }
      const data = await response.json();
      fetchData();
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };
  // -----------------------------------------//




  // ----------Styling For DropDown Menu-------//
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#8271e5',
    }),
  };
  // ------------------------------------------//





  // ------------Rendering Function-----------//
  return (
    <div className="container-wrapper">
      <div className="WeeklyGoals">
        <div className="weekly-goals-container">

          <div className="custom-select"  >
            <p> Select An Activity</p>
            <Select options={options} onChange={handleChange} styles={customStyles} />
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="Duration">Duration</label>
            <input id="Duration" type="number" value={durationGoal} onChange={handleInput} />
            <br />
            <button type="submit">Save Your Goal</button>
          </form>
        </div>
      </div>

      <div className="weekly-goals-container">

        {weeklyGoalsChartData.map((pieChartData) => (
          <div key={pieChartData.chartTitle}>
            <Chart
              chartType="PieChart"
              data={pieChartData.data}
              options={{
                title: pieChartData.chartTitle,
                legend: 'top',
                chartArea: { width: '65%' },
                pieHole: 0.3,
                is3D: false,
                backgroundColor: '#f5f7fa',
                slices: {
                  0: { color: '#3498db', textStyle: { color: '#333', fontSize: 15, bold: true } },
                  1: { color: '#f1c40f', textStyle: { color: '#333', fontSize: 15, bold: true } },
                },
                tooltip: {
                  showColorCode: true,
                },
                titleTextStyle: { color: '#f68a3c', fontSize: 20, bold: false },
              }}
            />
          </div>

        ))}
      </div>
    </div>
  );
}
// ------------------------------------------------//

export default WeeklyGoals;
