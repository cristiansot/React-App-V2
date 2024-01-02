// MealPlannerComponent.js
import React, { useState, useEffect } from 'react';
import { myapikey } from '../services/config';
import '../css/MealPlannerComponent.css';

// Functional component for Meal Planner
const MealPlannerComponent = () => {
  // State variables
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch meals data from Spoonacular API when the component mounts
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        // Retrieve API key from external config file
        const apiKey = myapikey;

        // Fetch meal data from Spoonacular API
        const response = await fetch(
          `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&apiKey=${apiKey}`
        );

        // Check if the response is successful; otherwise, throw an error
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        // Parse the response into JSON format and update state
        const data = await response.json();
        setMeals(data.meals);
      } catch (error) {
        // Handle errors by setting an error message in the state
        setError('Error fetching data');
      } finally {
        // Set loading to false after fetching data (success or error)
        setLoading(false);
      }
    };

    // Invoke the fetchMeals function when the component mounts
    fetchMeals();
  }, []);

  // Display loading message while data is being fetched
  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  // Display error message if there is an error fetching data
  if (error) {
    return <p className="error">{error}</p>;
  }

  // Display the meal planner UI if data is successfully fetched
  return (
    <div className="meal-planner">
      <h2 className="title">Daily Meal Plan</h2>

      {/* Render the list of meals */}
      <ul className="meal-list">
        {meals.map((meal) => (
          <li key={meal.id} className="meal-item">
            <h3>{meal.title}</h3>
            <p>Ready in {meal.readyInMinutes} minutes</p>
            <p>Servings: {meal.servings}</p>

            {/* Display meal image */}
            <img
              src={`https://spoonacular.com/recipeImages/${meal.id}-312x150.${meal.imageType}`}
              alt={meal.title}
              className="meal-image"
            />

            {/* Provide a link to view the recipe on Spoonacular */}
            <a
              href={meal.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="view-recipe-link"
            >
              View Recipe
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the MealPlannerComponent as the default export
export default MealPlannerComponent;
