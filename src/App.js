import React from 'react';
import './css/App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserInfoDashboard from './components/UserInfoDashboard';
import ActivityPage from './components/ActivityPage';
import NutritionPage from './components/NutritionPage';

function App() {
  return (
    <div className="App">
      <header>
        <UserInfoDashboard />
        <NavBar />
      </header>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity-log" element={<ActivityPage />} />
          <Route path="/nutrition-log" element={<NutritionPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
