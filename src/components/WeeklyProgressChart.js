import '../css/Progress.css'
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { format, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import activityOptions from '../data/ActivityOptions';
//*****************************************************************************************************/


function WeeklyProgressChart({ currentWeek, originalApiData }) {

  const [originalChartDataInfo, setNewChartDataInfo] = useState([]);

  useEffect(() => {
    const updatedChartInfo = calculateOriginalChartDataInfo(originalApiData, currentWeek);
    setNewChartDataInfo(updatedChartInfo);// setting the new chart based on the recieved data and current week
  }, [originalApiData]);

  const calculateOriginalChartDataInfo = (apiData, currentWeek) => {
    const weeklyTotals = {}; // total mins done per activity
    apiData.forEach(activity => {

      const activityDate = new Date(activity.date)

      const weekStart = startOfWeek(activityDate)
      //************** this IF statement solved the issue i was having with the dates not matching the data in the cart 
      const doesWeekStartMatchCurrentWeek = isSameDay(weekStart, currentWeek)
      if (doesWeekStartMatchCurrentWeek) {
        //************** debugging purposes ******************/
        console.log("doesWeekStartMatchCurrentWeek:", doesWeekStartMatchCurrentWeek)
        //************** debugging purposes ******************/
        const weekEnd = endOfWeek(activityDate);
        const weekRange = `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d')}`;
        //************** debugging purposes ******************/
        console.log("weekRange:", weekRange);
        //************** debugging purposes ******************/
        weeklyTotals[weekRange] = weeklyTotals[weekRange] || { Running: 0, Biking: 0, Climbing: 0, Hiking: 0, Swimming: 0 };
        weeklyTotals[weekRange][activity.activity] += activity.duration;

      }
    });
    //************** debugging purposes ******************/
    console.log("week Totals:", weeklyTotals);

  const updatedChartInfo = Object.entries(weeklyTotals).map(([weekRange, activities]) => {
    const chartData = [weekRange];
    activityOptions.forEach(option => { // added this code to dynamically map activities based on Novita's activityOptions object. I was manually entering it in before.
      const { activity } = option;
      chartData.push(activities[activity] || 0); // Push the duration for the current activity from the weeklyTotals object to chartData
    });
    return chartData;
  });

  return [['Week Range', ...activityOptions.map(option => option.activity)], ...updatedChartInfo];
};






  return (
    <div className="container-wrapper">
      
      <div className="weekly-progress-container">

        <div className="chart-container">
          <Chart
            chartType="ComboChart"
            data={originalChartDataInfo}
            options={{
              title: 'Weekly Progress Chart',
              legend: 'top',
              chartArea: { width: '70%' },
              vAxis: { title: 'Duration (minutes)' },
              hAxis: { title: 'Week' },
              seriesType: 'bars',
              series: { 5: { type: 'line' } }
            }}
            width="100%"
            height="400px"
          />
        </div>
      </div>
    </div>
  );
}

export default WeeklyProgressChart;
