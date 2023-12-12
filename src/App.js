import './css/App.css';
import ActivityDashboard from './components/ActivityDashboard';
import UserInfoDashboard from './components/UserInfoDashboard';

function App() {
  return (
    <div className="App">
      <UserInfoDashboard />
      <ActivityDashboard />
    </div>
  );
}

export default App;
