// Import modules from React and recharts library
// https://mui.com/x/react-charts/tooltip/
// https://mui.com/x/react-charts/legend/
// https://byby.dev/react-chart-libs

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// Import the MotivationalWordsCloud component and the CSS file for styling
import MotivationalWordsCloud from './MotivationalWordsCloud';
import '../css/RenderBarChart.css';

// Import the axios library for making HTTP requests
import axios from 'axios';

// Custom tooltip component for displaying information on hover
const CustomTooltip = ({ active, payload }) => {
  // Check if tooltip is active and data is available
  if (active && payload && payload.length) {
    // Extract the data from the payload (assuming payload is an array of data points)
    const data = payload[0].payload;

    // Styling for the tooltip
    const tooltipStyle = {
      background: '#f8f9fa', // Background color of the tooltip
      border: '1px solid #ddd', // Border style of the tooltip
      padding: '15px', // Padding inside the tooltip
      fontSize: '16px', // Font size of the tooltip content
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Box shadow for a subtle elevation effect
      borderRadius: '8px', // Border radius for rounded corners
      transition: 'opacity 0.3s ease-in-out', // Smooth transition for opacity changes
    };

    // Render tooltip content with data
    
    // Display information about the specific data properties within the tooltip
    
    // Day information with black color
    const dayInfo = `Day: ${data.day}`;
    
    // Total Sugar information with gold color (#FFD700)
    const totalSugarInfo = `Total Sugar: ${data.totalSugar.toFixed(2)}`;
    
    // Total Protein information with lime green color (#32CD32)
    const totalProteinInfo = `Total Protein: ${data.totalProtein.toFixed(2)}`;
    
    // Total Fat information with tomato color (#FF6347)
    const totalFatInfo = `Total Fat: ${data.totalFat.toFixed(2)}`;
    
    // Total Carbohydrates information with royal blue color (#4169E1)
    const totalCarbInfo = `Total Carbohydrates: ${data.totalCarbohydrates.toFixed(2)}`;

    // Return JSX with the styled tooltip containing data
    return (
      <div className="custom-tooltip" style={tooltipStyle}>
        <p style={{ color: 'black' }}>{dayInfo}</p>
        <p style={{ color: '#FFD700' }}>{totalSugarInfo}</p>
        <p style={{ color: '#32CD32' }}>{totalProteinInfo}</p>
        <p style={{ color: '#FF6347' }}>{totalFatInfo}</p>
        <p style={{ color: '#4169E1' }}>{totalCarbInfo}</p>
      </div>
    );
  }

  // If tooltip is not active or no data available, return null (no tooltip)
  
  return null;
};

// Main component for rendering the line chart
const RenderBarChart = () => {
  // State for storing nutrition data and loading status
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the mock API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an API request to get nutrition data
        const response = await axios.get('https://654d199b77200d6ba859fcf7.mockapi.io/nutrition');
        setNutritionData(response.data);
        setLoading(false);
      } catch (error) {
        // Handle errors during API request
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    // Invoke the fetchData function when the component mounts
    fetchData();
  }, []);

  // Function to transform raw data into the format needed for the chart
  const extractChartData = () => {
    const dateMap = {};

    // Process each entry in the nutrition data
    nutritionData.forEach((entry) => {
      const date = entry.date;
      // If date does not exist in the map, initialize with default values
      if (!dateMap[date]) {
        dateMap[date] = {
          day: date,
          totalSugar: 0,
          totalProtein: 0,
          totalFat: 0,
          totalCarbohydrates: 0,
        };
      }

      // Accumulate values for each nutrient
      dateMap[date].totalSugar += parseFloat(entry.total.totalCarbohydrates);
      dateMap[date].totalProtein += parseFloat(entry.total.totalProtein);
      dateMap[date].totalFat += parseFloat(entry.total.totalFat);
      dateMap[date].totalCarbohydrates += parseFloat(entry.total.totalCarbohydrates);
    });

    // Convert the map values to an array of objects
    return Object.values(dateMap);
  };

  // Render the main component
  return (
    <div className="line-chart-container">
      {/* Component to display motivational words */}
      <MotivationalWordsCloud />
      <h2 className="chart-title">Nutrition Tracker</h2>
      {/* Display loading message while fetching data */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        // Responsive container for the line chart
        <ResponsiveContainer width="90%" height={400}>
          <LineChart data={extractChartData()}>
            {/* X-axis representing days */}
            <XAxis dataKey="day" />
            {/* Y-axis for nutrient values */}
            <YAxis />
            {/* Tooltip for displaying information on hover */}
            <Tooltip content={<CustomTooltip />} />
            {/* Legend with increased size */}
            <Legend wrapperStyle={{ fontSize: '16px' }} />
            {/* Grid lines for better readability */}
            <CartesianGrid strokeDasharray="3 3" />
            {/* Lines representing nutrient values over days */}
            <Line type="monotone" dataKey="totalSugar" stroke="#FFD700" name="Sugars" />
            <Line type="monotone" dataKey="totalProtein" stroke="#32CD32" name="Proteins" />
            <Line type="monotone" dataKey="totalFat" stroke="#FF6347" name="Fats" />
            <Line type="monotone" dataKey="totalCarbohydrates" stroke="#4169E1" name="Carbohydrates" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default RenderBarChart;
