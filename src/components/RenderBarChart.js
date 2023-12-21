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
import NutritionTipsCarousel from './NutritionTipsCarousel';
import MotivationalWordsCloud from './MotivationalWordsCloud';
import './RenderBarChart.css'; 
import axios from 'axios';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    const tooltipStyle = {
      background: '#f8f9fa',
      border: '1px solid #ddd',
      padding: '15px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      transition: 'opacity 0.3s ease-in-out',
    };

    return (
      <div className="custom-tooltip" style={tooltipStyle}>
        <p style={{ color: 'black' }}>{`Day: ${data.day}`}</p>
        <p style={{ color: '#FFD700' }}>{`Total Sugar: ${data.totalSugar.toFixed(2)}`}</p>
        <p style={{ color: '#32CD32' }}>{`Total Protein: ${data.totalProtein.toFixed(2)}`}</p>
        <p style={{ color: '#FF6347' }}>{`Total Fat: ${data.totalFat.toFixed(2)}`}</p>
        <p style={{ color: '#4169E1' }}>{`Total Carbohydrates: ${data.totalCarbohydrates.toFixed(2)}`}</p>
      </div>
    );
  }

  return null;
};

const RenderBarChart = () => {
  const [showTips, setShowTips] = useState(false);
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleTips = () => {
    setShowTips((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://654d199b77200d6ba859fcf7.mockapi.io/nutrition');
        setNutritionData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const extractChartData = () => {
    const dateMap = {};

    nutritionData.forEach((entry) => {
      const date = entry.date;
      if (!dateMap[date]) {
        dateMap[date] = {
          day: date,
          totalSugar: 0,
          totalProtein: 0,
          totalFat: 0,
          totalCarbohydrates: 0,
        };
      }

      dateMap[date].totalSugar += parseFloat(entry.total.totalCarbohydrates);
      dateMap[date].totalProtein += parseFloat(entry.total.totalProtein);
      dateMap[date].totalFat += parseFloat(entry.total.totalFat);
      dateMap[date].totalCarbohydrates += parseFloat(entry.total.totalCarbohydrates);
    });

    return Object.values(dateMap);
  };

  return (
    <div className="line-chart-container">
      <MotivationalWordsCloud />
      <h2 className="chart-title">Daily Nutrition Log</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer width="90%" height={400}>
          <LineChart data={extractChartData()}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="totalSugar" stroke="#FFD700" name="Total Sugar" />
            <Line type="monotone" dataKey="totalProtein" stroke="#32CD32" name="Total Protein" />
            <Line type="monotone" dataKey="totalFat" stroke="#FF6347" name="Total Fat" />
            <Line type="monotone" dataKey="totalCarbohydrates" stroke="#4169E1" name="Total Carbohydrates" />
          </LineChart>
        </ResponsiveContainer>
      )}

      <div className="button-container">
        <button className="show-hide-button" onClick={toggleTips}>
          {showTips ? 'Hide Nutrition Tips' : 'Show Nutrition Tips'}
        </button>
      </div>

      {showTips && <NutritionTipsCarousel data={nutritionData} />}
    </div>
  );
};

export default RenderBarChart;
