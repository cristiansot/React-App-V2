import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { format, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
const MockApiUrl = 'https://654d199b77200d6ba859fcf7.mockapi.io/mockdata';

//*****************************************************************************************************/


function WeeklyProgressChart({ currentWeek, originalApiData }) {

  const [originalChartDataInfo, setNewChartDataInfo] = useState([]);

  useEffect(() => {
    const updatedChartInfo = calculateOriginalChartDataInfo(originalApiData, currentWeek);
    setNewChartDataInfo(updatedChartInfo);// setting the new chart based on the recieved data and current week
  }, [originalApiData]);

  // useEffect(() => {
  //   const getChartData = async () => {
  //     console.log('getting activity log info for week:', currentWeek);
  //     try {
  //       const response = await fetch(MockApiUrl);
  //       const data = await response.json();
  //       setOriginalApiData(data) // put api data into new state
  //       console.log("setOriginalApiData:", data)

  //       //************** debugging purposes ******************/
  //       console.log("updatedChartInfo:", updatedChartInfo)
  //       //************** debugging purposes ******************/

  //     } catch (error) {
  //       console.error('error getting activity log info:', error);
  //     }
  //   };
  //   getChartData();
  // }, [currentWeek]);



  // Function to calc chart info
  const calculateOriginalChartDataInfo = (apiData, currentWeek) => {
    const weeklyTotals = {}; // total mins done per activity

    apiData.forEach(activity => {

      //************** debugging purposes ******************/
      const dateString = activity.date.toString();
      const activityDate = new Date(`${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6)}`);
      // const activityDate = new Date(activity.date); 
      // when console.log activity.date, it was printing:
      //"activityDate: Wed Dec 31 1969 21:37:11 GMT-0800 (Pacific Standard Time)". 
      // This told me i had an issue with the date formatting:
      //************** debugging purposes ******************/


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
    //************** debugging purposes ******************/


    //************** debugging purposes ******************/
    //i dont need this anymore
    // const week = `${format(startOfWeek(currentWeek), 'MMM d')} - ${format(endOfWeek(currentWeek), 'MMM d')}`;
    // console.log("week:", week);
    // changes the date into a string to show: ex, Dec1-Dec9
    //************** debugging purposes ******************/


    //updated chart info which will show up when button is clicked
    const updatedChartInfo = Object.entries(weeklyTotals).map(([weekRange, activities]) => (
      [weekRange, activities.Running,
        activities.Biking,
        activities.Climbing,
        activities.Hiking,
        activities.Swimming]
    ));
    return [['Week Range', 'Running', 'Biking', 'Climbing', 'Hiking', 'Swimming'], ...updatedChartInfo];
  };


  // // last week button
  // const handleLastWeek = () => {
  //   const viewNewWeek = new Date(currentWeek);
  //   viewNewWeek.setDate(currentWeek.getDate() - 7);
  //   setCurrentWeek(startOfWeek(viewNewWeek)); // viewNewWeek is based on the currentWeek minus 7 days, and resets it to the start of the week
  //   const updatedChartInfo = calculateOriginalChartDataInfo(originalApiData, viewNewWeek);// passing the api data into the button but this time its checking if the date matches
  //   setNewChartDataInfo(updatedChartInfo);// setting the new chart based on the recieved data and current week

  // };


  // // next week button
  // const handleNextWeek = () => {
  //   const viewNewWeek = new Date(currentWeek);
  //   viewNewWeek.setDate(currentWeek.getDate() + 7);
  //   setCurrentWeek(startOfWeek(viewNewWeek)); // viewNewWeek is based on the currentWeek, plus 7 days, and resets it to the start of the week
  //   const updatedChartInfo = calculateOriginalChartDataInfo(originalApiData, viewNewWeek); // passing the api data into the button but this time its checking if the date matches
  //   setNewChartDataInfo(updatedChartInfo);// setting the new chart based on the recieved data and current week
  // };



  return (
    <div>
      {/* <div>
        <button onClick={handleLastWeek}> Last Week </button>
        <span> {format(startOfWeek(currentWeek), 'MMM d')} - {format(endOfWeek(currentWeek), 'MMM d')} </span>
        <button onClick={handleNextWeek}> Next Week </button>
      </div> */}

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
  );
}

export default WeeklyProgressChart;
