import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { format, startOfWeek, endOfWeek, isSameDay } from "date-fns";
import Select from "react-select";
import myAPIKey from '../services/config';
const GoalAPI = `https://${myAPIKey}.mockapi.io/weeklygoal`;

function WeeklyGoals({ currentWeek }) {
  const [durationGoal, setDurationGoal] = useState("");
  const [selectedActivity, setSelectedActivity] = useState({});
  const [weeklyGoals, setWeeklyGoals] = useState([]);
  const [weeklyGoalsChartData, setWeeklyGoalsChartData] = useState([]);

  const options = [
    { value: "Running", label: "Running" },
    { value: "Biking", label: "Biking" },
    { value: "Climbing", label: "Climbing" },
    { value: "Hiking", label: "Hiking" },
    { value: "Swimming", label: "Swimming" },
  ];


  const calculateWeeklyGoalsChartData = (apiData, currentWeek) => {
    const weeklyTotals = {}; // total mins done per activity
    console.log("calc weekly goals chat")
    apiData.forEach((activity) => {

      //date format

      const activityDate = new Date (activity.date)

      const weekStart = startOfWeek(activityDate);
      const doesWeekStartMatchCurrentWeek = isSameDay(weekStart, currentWeek);
      if (doesWeekStartMatchCurrentWeek) {
        const weekEnd = endOfWeek(activityDate);
        const weekRange = `${format(weekStart, "MMM d")} - ${format(
          weekEnd,
          "MMM d"
        )}`;
        weeklyTotals[weekRange] = weeklyTotals[weekRange] || {
          Running: 0,
          Biking: 0,
          Climbing: 0,
          Hiking: 0,
          Swimming: 0,
        };
        weeklyTotals[weekRange][activity.activity] += activity.duration;
      }
    });

    //updated chart info which will show up when button is clicked
    const updatedChartInfo = Object.entries(weeklyTotals).map(
      ([weekRange, activities]) => [
        weekRange,
        activities.Running,
        activities.Biking,
        activities.Climbing,
        activities.Hiking,
        activities.Swimming,
      ]
    );
    return [
      ["Week Range", "Running", "Biking", "Climbing", "Hiking", "Swimming"],
      ...updatedChartInfo,
    ];
  };




  const handleInput = (e) => {
    setDurationGoal(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const goal = {
      date: currentWeek,
      activity: selectedActivity.label,
      duration: durationGoal,
    };
    handleWeeklyGoals(goal);
    if (durationGoal.trim()) {
    }
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
        const updatedChartInfo = calculateWeeklyGoalsChartData(data, currentWeek);
        console.log("updated chart info", updatedChartInfo)
        setWeeklyGoalsChartData(updatedChartInfo);
        console.log("Goal api Data Collectd:", data);
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };
    fetchData();
  }, [currentWeek]);


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
      ///setdurationGoal([...goal, data]);
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  return (
    <div>
      <h1>Weekly Fitness Goal </h1>
      <h2>
        {format(startOfWeek(currentWeek), "MMM d")} -{" "}
        {format(endOfWeek(currentWeek), "MMM d")}
      </h2>

      <Select options={options} onChange={handleChange} />

      <form className="WeeklyGoals" onSubmit={handleSubmit}>
      <label htmlFor="Duration" >Duration</label>
        <input id="Duration" type="number" value={durationGoal} onChange={handleInput} />
        <br/>
        <button type="submit">Save Your Goal</button>
      </form>

      <Chart
        chartType="ComboChart"
        data={weeklyGoalsChartData}
        options={{
          title: "Weekly Progress Chart",
          legend: "top",
          chartArea: { width: "70%" },
          vAxis: { title: "Duration (minutes)" },
          hAxis: { title: "Week" },
          seriesType: "bars",
          series: { 5: { type: "line" } },
        }}
        width="100%"
        height="400px"
      />
    </div>
  );
}

export default WeeklyGoals;
