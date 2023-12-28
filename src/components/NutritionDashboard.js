import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddNutritionForm from './AddNutritionForm';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import MyCalendar from './Calendar';
import '../css/nutritionDashboard.css';

const url = 'https://654d199b77200d6ba859fcf7.mockapi.io/nutrition';

/* The code is defining a functional component called `NutritionDashboard`. */
function NutritionDashboard() {
  const [nutrition, setNutrition] = useState([]);
  useState(new Date()); 

/* The `useEffect` hook is used to perform side effects in functional components. In this case, it is
 used to fetch the nutrition data from the API when the component mounts. */
  useEffect(() => {
    getNutrition();
  }, []);
 
 /* The function uses Axios to make an HTTP GET request to a specified URL and then sets the response
data to a variable called "nutrition". */
  function getNutrition() {
    Axios.get(url)
      .then((response) => {
        setNutrition(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

/* The function `addNutrition` sends a POST request to a specified URL with new nutrition data, and
updates the state with the response data if successful, or displays an error message if there is an
error. @param newNutrition - The parameter `newNutrition` is the data that you want to add to the nutrition
list. It could be an object containing information about a nutrition item, such as its name, calories, protein, etc .*/
function addNutrition(newNutrition) {
  Axios.post(url, newNutrition)
    .then((response) => {
      const isNewDate = !nutrition.some(item => item.date === response.data.date);
      if (isNewDate) {
        setNutrition([...nutrition, response.data]);
        // alert('Your meals have been entered successfully');
      } else {
        alert('The date already exists, try another');
      }
    })
    .catch((error) => {
      console.log(error);
      alert('Error occurred while adding nutrition data');
    });
}


 /* The code is creating a new array called `data` by mapping over the `nutrition` array. For each item
 in the `nutrition` array, it creates a new object with properties `name`, `totalGramsIngested`,
 `totalCalories`, `totalProtein`, `totalFat`, and `totalCarbohydrates`. The values for these
 properties are extracted from the corresponding properties in each item of the `nutrition` array. */
  const data = nutrition.map((item) => ({
    name: item.date,
    totalGramsIngested: item.total.totalPortion,
    totalCalories: item.total.totalCalories,
    totalProtein: item.total.totalProtein,
    totalFat: item.total.totalFat,
    totalCarbohydrates: item.total.totalCarbohydrates,
  }));

  /* The `return` statement in the `NutritionDashboard` component is returning JSX code that will be
  rendered as HTML by React. */
  return (
    <div className='mainContent'>
      <h1>Nutrition Log</h1>
      <LineChart className='lineChart' width={1450} height={350} data={data}
        margin={{ top: 2, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#bbb"/>
        <YAxis stroke="#bbb" />
        <Tooltip contentStyle={{ backgroundColor: 'rgba(52, 51, 68, 0.9)', border: '0' }} />
        <Legend />
        <Line type="monotone" dataKey="totalGramsIngested" stroke="#8884d8" />
        <Line type="monotone" dataKey="totalCalories" stroke="#ff3c6e" />
      </LineChart>
      <div className='modules'>
        <AddNutritionForm addNutrition={addNutrition} />
        <MyCalendar getNutrition={getNutrition} nutrition={nutrition} />
      </div>
    </div>
  );
}

export default NutritionDashboard;
