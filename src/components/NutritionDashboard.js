import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddNutritionForm from './AddNutritionForm';
import '../css/nutritionDashboard.css'

const url = 'https://654d199b77200d6ba859fcf7.mockapi.io/nutrition';

function NutritionDashboard() {
  const [nutrition, setNutrition] = useState([]);

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

  return (
    <div className='mainContent'>
      {nutrition.map((item, index) => (
        <div key={index} className='dataContent'>
          <p>Date: {item.date}</p>
          <p>Total Grams Ingested: {item.total.totalPortion}</p>
          <p>Total Calories: {item.total.totalCalories}</p>
          <p>Total Protein: {item.total.totalProtein}</p>
          <p>Total Fat: {item.total.totalFat}</p>
          <p>Total Carbohydrates: {item.total.totalCarbohydrates}</p>
        </div>
      ))}
      <div>
        <AddNutritionForm addNutrition={addNutrition} />
      </div>
    </div>
  );
}

export default NutritionDashboard;