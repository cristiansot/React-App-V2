import '../css/App.css';
import ActivityLog from './ActivityLog';
import ActivityForm from './ActivityForm';
import UserInfo from './UserInfo';
import UserInfoForm from './UserInfoForm';

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
