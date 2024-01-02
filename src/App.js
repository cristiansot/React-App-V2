import React from 'react';
import './css/App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserInfoDashboard from './components/UserInfoDashboard';
import ActivityPage from './components/ActivityPage';
import NutritionPage from './components/NutritionPage';
import { useState } from 'react';

function App() {
  // State to track User Info
  const [userInfo, setUserInfo] = useState();

  const updateUserInfo = (newUserInfo) => {
    setUserInfo(newUserInfo);
  };

  return (
    <div className="App">
      <header>
        <UserInfoDashboard
          userInfo={userInfo}
          updateUserInfo={updateUserInfo}
        />
        <NavBar />
        <div className="app-name">
          <h1>FitFlow</h1>
          <h2>Health and Fitness Tracker</h2>
        </div>
      </header>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/activity-log"
            element={<ActivityPage userInfo={userInfo} />}
          />
          <Route
            path="/nutrition-log"
            element={<NutritionPage userInfo={userInfo} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
