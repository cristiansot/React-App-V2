import './css/App.css';
import ActivityDashboard from './components/ActivityDashboard';
import NutritionDashboard from './components/NutritionDashboard';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activity-log" element={<ActivityDashboard />} />
        <Route path="/nutrition-log" element={<NutritionDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
