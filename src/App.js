import React from 'react';
import './css/App.css';
import ProgressVisualizerDashboard from './components/ProgressVisualizerDashboard'
import ActivityDashboard from './components/ActivityDashboard';
import NutritionDashboard from './components/NutritionDashboard';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import MealPlannerComponent from './components/MealPlannerComponent';

function App() {

  return (
    <div className="App">
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity-log" element={<ActivityDashboard />} />
          <Route path="/nutrition-log" element={<NutritionDashboard />} />
          <Route path="/progress-tracker" element={<ProgressVisualizerDashboard />} />
          <Route path="/meal-plan" element={<MealPlannerComponent />} />
        </Routes>
      </div>
    </div>
  );
};


export default App;