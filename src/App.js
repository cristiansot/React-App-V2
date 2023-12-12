import './css/App.css';
import { useState, useEffect } from 'react';
import ActivityLog from './components/ActivityLog';
import ActivityForm from './components/ActivityForm';
import UserInfo from './components/UserInfo';
import UserInfoForm from './components/UserInfoForm';
import activityService from './services/activityService';
import { v4 as uuidv4 } from 'uuid';

function App() {
  //----------------User Info States and Functions------------------//

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

  //------------------Activity States and Functions------------//

  // To initialize Activity Log
  useEffect(() => {
    activityService.getActivities().then((data) => setActivities(data || []));
  }, []);

  // State to track User Info
  const [activities, setActivities] = useState([]);

  // State to track User Info Form Input
  const [activityInput, setActivityInput] = useState({
    date: '',
    activity: '',
    duration: '',
    intensity: '',
    caloriesBurned: '',
  });

  // Handle user input (excluding activity and intensity)
  const handleActivityFormChange = (name, value) => {
    setActivityInput((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const activityOptions = [
    { activity: 'Climbing', intensity: 'High' },
    { activity: 'Running', intensity: 'Moderate' },
    { activity: 'Walking', intensity: 'Low' },
    { activity: 'Gentle Yoga', intensity: 'Low' },
    { activity: 'Biking', intensity: 'Moderate' },
    { activity: 'Power Yoga', intensity: 'Moderate' },
    { activity: 'Swimming', intensity: 'High' },
    { activity: 'Hiking', intensity: 'High' },
  ];

  // State to track selected activity and intensity
  const [selectedActivity, setSelectedActivity] = useState({
    activity: '',
    intensity: '',
  });

  // Handle change in activiactivity dropdown selection
  const handleActivityTypeChange = (selectedActivity) => {
    setSelectedActivity(selectedActivity);
    console.log(selectedActivity);
  };

  // Handle activity submission
  const handleActivitySubmit = (e) => {
    e.preventDefault();
    console.log(activityInput);
    // Addiactivity & intensity to object based on selectedActivity
    const newActivity = {
      ...activityInput,
      id: uuidv4(),
      intensity: selectedActivity.intensity,
      activity: selectedActivity.activity,
    };
    console.log(newActivity);
    activityService.postActivity(newActivity).then(() => {
      activityService.getActivities().then((data) => setActivities(data));
      console.log(newActivity);
      // Clear activityInput and selectedActivities
      setActivityInput({
        date: '',
        activity: '',
        intensity: '',
        duration: '',
        caloriesBurned: '',
      });
      setSelectedActivity({
        activity: '',
        intensity: '',
      });
    });
  };

  // Handle delete activity
  const handleDeleteActivity = (e, id) => {
    e.preventDefault();
    console.log(id);

    activityService.deleteActivity(id).then(() => {
      activityService.getActivities().then((data) => setActivities(data));
    });
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
        onFormChange={handleActivityFormChange}
        onFormSubmit={handleActivitySubmit}
        activityOptions={activityOptions}
        selectedActivity={selectedActivity}
        onActivityTypeChange={handleActivityTypeChange}
      />

      <ActivityLog
        activities={activities}
        onDeleteActivity={handleDeleteActivity}
      />
    </div>
  );
}

export default App;
