import './css/App.css';
import ProgressVisualizerDashboard from './components/ProgressVisualizerDashboard'
import ActivityDashboard from './components/ActivityDashboard';
import UserInfoDashboard from './components/UserInfoDashboard';
import NutritionDashboard from './components/NutritionDashboard';


function App() {

  return (
    <div className="App">
      <ProgressVisualizerDashboard/>
      <UserInfoDashboard />
      <ActivityDashboard />
      <NutritionDashboard />
    </div>
  );
}


export default App;
