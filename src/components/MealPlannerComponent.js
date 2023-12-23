// MealPlannerComponent.js
import React, { useState, useEffect } from 'react';
import myapikey from '../services/configfatima';
import '../css/MealPlannerComponent.css'; // Import your CSS file

// Functional component for displaying a daily meal plan
const MealPlannerComponent = () => {
  // State to manage the list of meals, loading state, and error state
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Effect hook to fetch meals data when the component mounts
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        // Replace 'YOUR_SPOONACULAR_API_KEY' with your actual Spoonacular API key
        const apiKey = myapikey.api;
        const response = await fetch(
          `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&apiKey=${apiKey}`
        );

        // Check if the fetch was successful
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        // Parse the response JSON data and set the meals state
        const data = await response.json();
        setMeals(data.meals);
      } catch (error) {
        // Set the error state if there was an error during the fetch
        setError('Error fetching data');
      } finally {
        // Set loading to false regardless of the fetch result
        setLoading(false);
      }
    };

    // Call the fetchMeals function
    fetchMeals();
  }, []); // The empty dependency array ensures that the effect runs only once on mount

  // Loading state: Display a loading message
  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  // Error state: Display an error message
  if (error) {
    return <p className="error">{error}</p>;
  }

  // Render the meal planner component with the fetched meal data
  return (
    <div className="meal-planner">
      {/* Display the title of the meal planner */}
      <h2 className="title">Daily Meal Plan</h2>

      {/* Display the list of meals */}
      <ul className="meal-list">
        {meals.map((meal) => (
          <li key={meal.id} className="meal-item">
            {/* Display meal details */}
            <h3>{meal.title}</h3>
            <p>Ready in {meal.readyInMinutes} minutes</p>
            <p>Servings: {meal.servings}</p>

            {/* Display the meal image */}
            <img
              src={`https://spoonacular.com/recipeImages/${meal.id}-312x150.${meal.imageType}`}
              alt={meal.title}
              className="meal-image"
            />

            {/* Provide a link to view the recipe */}
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

export default MealPlannerComponent;

