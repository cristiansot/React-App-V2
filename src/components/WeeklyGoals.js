import '../css/Progress.css'
import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { format, startOfWeek, endOfWeek, isSameDay } from "date-fns";
import Select from "react-select";
import activityOptions from '../data/ActivityOptions';
import myAPIKey from '../services/config';
const GoalAPI = `https://${myAPIKey}.mockapi.io/weeklygoal`;
const MockApiUrl = `https://${myAPIKey}.mockapi.io/activities`;

function WeeklyGoals({ currentWeek, activityProgressApiData }) {
  const [durationGoal, setDurationGoal] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState({});
  const [weeklyGoals, setWeeklyGoals] = useState([]);
  const [weeklyGoalsChartData, setWeeklyGoalsChartData] = useState([]);

  // updated the options to pull the data from Novita's activityOptions component so its dynamic
  const options = activityOptions.map((option) => ({
    value: option.activity,
    label: option.activity,
  }));

  const calculateWeeklyPieChart = () => {


    let weeklyTotals = {
      weeklyGoal: {},
      progress: {}
    };


    // Loop through each entry in the weekly goals api array
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
          // weeklyTotals.weeklyGoal[weeklyGoal.activity] += weeklyGoal.duration;
        }
      }
    });



    // Loop through each entry in the activity log api array
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
          // weeklyTotals.progress[activity.activity] += activity.duration;
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


  //GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GoalAPI);
        const data = await response.json();
        setWeeklyGoals(data);
        // const updatedChartInfo = calculateWeeklyGoalsChartData(data, currentWeek);
        // console.log("updated chart info", updatedChartInfo)
        // setWeeklyGoalsChartData(updatedChartInfo);
        console.log("Goal api Data Collectd:", data);
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };
    fetchData();
    // removed dependency array to only fetch data once
  }, []);

  useEffect(() => {

    if (weeklyGoals.length > 0) { // if array it empty, it wont update the chart
      const updatedChartInfo = calculateWeeklyPieChart();
      console.log("updated chart info", JSON.stringify(updatedChartInfo))
      setWeeklyGoalsChartData(updatedChartInfo);
    } else {
      console.log("Weekly Goals Data still loading")
    }
  }, [weeklyGoals, currentWeek]);


  //POST
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
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  return (
    <div>
      <div className="WeeklyGoals" >
        <h1 style={{ color: 'darkblue' }}>Weekly Fitness Goal </h1>
        <h2 style={{ color: 'darkblue' }}>
          {format(startOfWeek(currentWeek), "MMM d")} -{" "}
          {format(endOfWeek(currentWeek), "MMM d")}
        </h2>
        <Select options={options} onChange={handleChange} />

        <form onSubmit={handleSubmit}>
          <label htmlFor="Duration" >Duration</label>
          <input id="Duration" type="number" value={durationGoal} onChange={handleInput} />
          <br />
          <button type="submit">Save Your Goal</button>
        </form>
      </div>


      <div className="container-wrapper">

        <div className="weekly-goals-container">

          {
            weeklyGoalsChartData.map((pieChartData) => {
              return (
                <div key={pieChartData.chartTitle}>
                  <Chart
                    chartType="PieChart"
                    data={pieChartData.data}
                    options={{
                      title: pieChartData.chartTitle,
                      legend: "top",
                      chartArea: { width: "70%" },
                      pieHole: 0.5,
                      is3D: false,
                      backgroundColor: '#8e44ad',
                      slices: {
                        0: { color: '#3498db' },
                        1: { color: '#f1c40f' },
                      },
                      tooltip: {
                        showColorCode: true,
                      },
                      fontSize: 10,
                    }
                    }
                    width="100%"
                    height="150px"
                  />
                </div>
              )

            })
          }

          {/* <Chart
            chartType="PieChart"
            data={weeklyGoalsChartData}
            options={{
              title: "Weekly Progress Chart",
              legend: "top",
              chartArea: { width: "70%" },
              vAxis: { title: "Duration (minutes)" },
              hAxis: { title: "Week" },
              seriesType: "bars",
              series: { 5: { type: "line" } },
              pieHole: 0.4,
              is3D: false,
            }}
            width="100%"
            height="400px"
          /> */}
        </div>
      </div>
    </div>

  );
}

export default WeeklyGoals;
