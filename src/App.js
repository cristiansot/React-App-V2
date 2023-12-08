import './css/App.css';
import { useState } from 'react';
import ActivityLog from './components/ActivityLog';
import ActivityForm from './components/ActivityForm';
import UserInfo from './components/UserInfo';
import UserInfoForm from './components/UserInfoForm';

function App() {
  //-------User Info State and Functions-------//

  // State to track User Info
  const [userInfo, setUserInfo] = useState();

  // State to track User Info Form Input
  const [userInput, setUserInput] = useState({
    name: '',
    weight: '',
    height: '',
  });

  // State to control the visibility of the form
  const [userFormVisible, setuserFormVisible] = useState(true);

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    console.log(userInput);
    setUserInfo(userInput);
    setuserFormVisible(false);
  };

  const handleUserInfoChange = (name, value) => {
    setUserInput((prevValue) => ({ ...prevValue, [name]: value }));
  };

  //-------Activity State and Functions-------//

  // State to track User Info
  const [activities, setActivities] = useState([]);

  // State to track User Info Form Input
  const [activityInput, setActivityInput] = useState({
    date: '',
    type: '',
    duration: '',
    calories: '',
  });

  const handleActivityChange = (name, value) => {
    setActivityInput((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleActivitySubmit = (e) => {
    e.preventDefault();
    console.log(activityInput);
    const newActivity = [...activities, activityInput];
    setActivities(newActivity);
    console.log(newActivity);
    setActivityInput({ date: '', type: '', duration: '', calories: '' });
  };

  return (
    <div className="App">
      {!userFormVisible && <UserInfo userInfo={userInfo} />}

      {userFormVisible && (
        <UserInfoForm
          userInput={userInput}
          onFormChange={handleUserInfoChange}
          onFormSubmit={handleUserInfoSubmit}
        />
      )}

      <ActivityForm
        activityInput={activityInput}
        onFormChange={handleActivityChange}
        onFormSubmit={handleActivitySubmit}
      />

      <ActivityLog activities={activities} />
    </div>
  );
}

export default App;
