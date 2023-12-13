import './css/App.css';
import ActivityDashboard from './components/ActivityDashboard';
import UserInfoDashboard from './components/UserInfoDashboard';
import NutritionDashboard from './components/NutritionDashboard';


function App() {
  return (
    <div className="App">
      <UserInfoDashboard />
      <ActivityDashboard />
      <NutritionDashboard />
    </div>
  );
}

export default App;
