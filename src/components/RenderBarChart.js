// RenderBarChart.js
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import NutritionTipsCarousel from './NutritionTipsCarousel';
import MotivationalWordsCloud from './MotivationalWordsCloud'; 
import '../css/RenderBarChart.css';

// Custom component for a triangle-shaped bar in the BarChart
const TriangleBar = ({ x, y, width, height, fill }) => (
  <path d={`M${x},${y + height} L${x + width / 3},${y} L${x + width},${y + height} Z`} fill={fill} />
);

// Sample data for daily calorie intake and burnt calories
const calorieData = [
  { day: 'Monday', intake: 2500, burnt: 2000 },
  { day: 'Tuesday', intake: 2300, burnt: 1800 },
  { day: 'Wednesday', intake: 2600, burnt: 2100 },
  { day: 'Thursday', intake: 2400, burnt: 1900 },
  { day: 'Friday', intake: 2800, burnt: 2200 },
  { day: 'Saturday', intake: 2700, burnt: 2000 },
  { day: 'Sunday', intake: 2200, burnt: 1800 },
];

// Sample data for nutrition tips
const tipsData = [
  { id: 1, tip: 'Tip 1: Maintain a balance between calorie intake and expenditure.' },
  { id: 2, tip: 'Tip 2: Stay active and engage in regular physical activities.' },
  { id: 3, tip: 'Tip 3: Choose nutrient-dense foods for a healthier diet.' },
  { id: 4, tip: 'Tip 4: Monitor your calorie intake to achieve your fitness goals.' },
  { id: 5, tip: 'Tip 5: Stay hydrated to support your metabolism.' },
];

// Functional component for rendering a bar chart and nutrition tips
const RenderBarChart = () => {
  // State for controlling the visibility of nutrition tips
  const [showTips, setShowTips] = useState(false);

  // Function to toggle the visibility of nutrition tips
  const toggleTips = () => {
    setShowTips((prevState) => !prevState);
  };

  return (
    <div className="bar-chart-container">
      <MotivationalWordsCloud /> {/* Display MotivationalWordsCloud at the top */}
      
      <h2 className="chart-title">Daily Calorie Chart</h2>
      <BarChart width={900} height={400} data={calorieData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Bar for calorie intake with custom triangle shape */}
        <Bar
          dataKey="intake"
          fill="#800080"
          shape={<TriangleBar />}
          name="Calorie Intake"
          className="chart-bar"
        />
        {/* Bar for burnt calories with custom triangle shape */}
        <Bar
          dataKey="burnt"
          fill="#4169E1"
          shape={<TriangleBar />}
          name="Calories Burnt"
          className="chart-bar"
        />
      </BarChart>

      <div className="button-container">
        {/* Button to toggle visibility of nutrition tips */}
        <button className="show-hide-button" onClick={toggleTips}>
          {showTips ? 'Hide Nutrition Tips' : 'Show Nutrition Tips'}
        </button>
      </div>

      {/* Display NutritionTipsCarousel only if showTips is true */}
      {showTips && <NutritionTipsCarousel data={tipsData} />}
    </div>
  );
};

export default RenderBarChart;
