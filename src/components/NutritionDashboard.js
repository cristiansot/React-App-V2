import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddNutritionForm from './AddNutritionForm';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import MyCalendar from './Calendar';
import '../css/nutritionDashboard.css';

const url = 'https://654d199b77200d6ba859fcf7.mockapi.io/nutrition';

function NutritionDashboard() {
  const [nutrition, setNutrition] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Add this line

  useEffect(() => {
    getNutrition();
  }, []);

  function getNutrition() {
    Axios.get(url)
      .then((response) => {
        setNutrition(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addNutrition(newNutrition) {
    Axios.post(url, newNutrition)
      .then((response) => {
        setNutrition([...nutrition, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const data = nutrition.map((item) => ({
    name: item.date,
    totalGramsIngested: item.total.totalPortion,
    totalCalories: item.total.totalCalories,
    totalProtein: item.total.totalProtein,
    totalFat: item.total.totalFat,
    totalCarbohydrates: item.total.totalCarbohydrates,
  }));

  return (
    <div className='mainContent'>
      <h1>Nutrition Log</h1>
      <BarChart width={1250} height={300} data={data}>
        <XAxis dataKey="name" stroke="#CCC" />
        <YAxis stroke="#CCC"/>
        <Tooltip contentStyle={{ backgroundColor: 'rgba(52, 51, 68, 0.9)', border: '0' }} />
        <Legend />
        
        <CartesianGrid stroke="#7b7b7b" strokeDasharray="4 7" />
        <Bar dataKey="totalGramsIngested" fill="#af3b9f" barSize={15} />
        <Bar dataKey="totalCalories" fill="#ff3c6e" barSize={15} />
        <Bar dataKey="totalProtein" fill="#ffd016" barSize={15} />
        <Bar dataKey="totalFat" fill="#019fdf" barSize={15} />
        <Bar dataKey="totalCarbohydrates" fill="#bcf6a3" barSize={15} />
      </BarChart>

      {/* {nutrition.map((item, index) => (
        <div key={index} className='dataContent'>
          <p>Date: {item.date}</p>
          <p>Total Grams Ingested: {item.total.totalPortion}</p>
          <p>Total Calories: {item.total.totalCalories}</p>
          <p>Total Protein: {item.total.totalProtein}</p>
          <p>Total Fat: {item.total.totalFat}</p>
          <p>Total Carbohydrates: {item.total.totalCarbohydrates}</p>
        </div>
      ))} */}
      <div className='modules'>
        <AddNutritionForm addNutrition={addNutrition} />
        <MyCalendar onDateChange={setSelectedDate} />
      </div>
      
    </div>
  );
}

export default NutritionDashboard;
