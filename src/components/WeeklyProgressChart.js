import '../css/Progress.css';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { format, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import activityOptions from '../data/ActivityOptions';
//*****************************************************************************************************/

function WeeklyProgressChart({ currentWeek, originalApiData }) {
  const [originalChartDataInfo, setNewChartDataInfo] = useState([]);

  useEffect(() => {
    const updatedChartInfo = calculateOriginalChartDataInfo(
      originalApiData,
      currentWeek
    );
    setNewChartDataInfo(updatedChartInfo); // setting the new chart based on the recieved data and current week
  }, [originalApiData, currentWeek]);

  const calculateOriginalChartDataInfo = (apiData, currentWeek) => {
    const weeklyTotals = {}; // total mins done per activity
    apiData.forEach((activity) => {
      const activityDate = new Date(activity.date);

      const weekStart = startOfWeek(activityDate);
      const doesWeekStartMatchCurrentWeek = isSameDay(weekStart, currentWeek);
      if (doesWeekStartMatchCurrentWeek) {
        const weekEnd = endOfWeek(activityDate);
        const weekRange = `${format(weekStart, 'MMM d')} - ${format(
          weekEnd,
          'MMM d'
        )}`;
        weeklyTotals[weekRange] =
          weeklyTotals[weekRange] ||
          Object.fromEntries(
            activityOptions.map((option) => [option.activity, 0])
          );
        weeklyTotals[weekRange][activity.activity] += activity.duration;
      }
    });

    const updatedChartInfo = Object.entries(weeklyTotals).map(
      ([weekRange, activities]) => {
        const chartData = [weekRange];

        activityOptions.forEach((option) => {
          // added this code to dynamically map activities based on Novita's activityOptions object. I was manually entering it in before.
          const { activity } = option;
          chartData.push(activities[activity] || 0); // Push the duration for the current activity from the weeklyTotals object to chartData
        });
        return chartData;
      }
    );

    return [
      ['Week Range', ...activityOptions.map((option) => option.activity)],
      ...updatedChartInfo,
    ];
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
              series: { 5: { type: 'line' } },
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
