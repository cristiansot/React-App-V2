import './css/App.css';
import ActivityLog from './components/ActivityLog';
import ActivityForm from './components/ActivityForm';
import UserInfo from './components/UserInfo';
import UserInfoForm from './components/UserInfoForm';

function App() {
  return (
    <div className="App">
      <UserInfo />
      <UserInfoForm />
      <ActivityLog />
      <ActivityForm />
    </div>
  );
}

export default App;
