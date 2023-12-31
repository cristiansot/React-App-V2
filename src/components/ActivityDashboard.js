import '../css/Activity.css';
import { useState, useEffect } from 'react';
import ActivityLog from './ActivityLog';
import ActivityForm from './ActivityForm';
import activityService from '../services/activityService';
import ReusableModalButton from './ReusableModalButton';
import calcCaloriesBurned from '../utils/caloriesBurnedUtils';
import userInfoService from '../services/userInfoService';
import activityOptions from '../data/ActivityOptions';
import ActivityDateFilter from './ActivityDateFilter';
import getStandardizedDate from '../utils/getStandardizedDate';

function ActivityDashboard({ userInfo }) {
  // To initialize Activity Log
  useEffect(() => {
    activityService.getActivities().then((data) => setActivities(data || []));
  }, []);

  // State to track activities logged
  const [activities, setActivities] = useState([]);

  // State to track Activity Form Input
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

  console.log(activityOptions);
  // Sorting activity options alphabetically
  const sortedActivityOptions = [...activityOptions].sort((a, b) =>
    a.activity.localeCompare(b.activity)
  );
  console.log(sortedActivityOptions);

  // State to track selected activity and intensity
  const [selectedActivity, setSelectedActivity] = useState({
    activity: '',
    intensity: '',
    MET: '',
  });

  // Handle change in activiactivity dropdown selection
  const handleActivityTypeChange = (selectedActivity) => {
    setSelectedActivity(selectedActivity);
  };

  //------------------------Get User Weight Info for Calories Burned Calculation----------------------//

  const [userWeight, setUserWeight] = useState();
  console.log(userWeight);

  useEffect(() => {
    // Make a request to the user info API to get the user's weight
    userInfoService.getUserInfo().then((userInfo) => {
      const currentUserInfo = userInfo[userInfo.length - 1];
      console.log(userInfo);
      if (currentUserInfo && currentUserInfo.weight) {
        setUserWeight(currentUserInfo.weight);
      }
    });
  }, [userInfo]);

  // Handle activity submission
  const handleActivitySubmit = (e) => {
    e.preventDefault();
    console.log(activityInput);
    console.log(userWeight);
    // Addiactivity & intensity to object based on selectedActivity
    const newActivity = {
      // id: uuidv4(),
      ...activityInput,
      ...selectedActivity,
      caloriesBurned: calcCaloriesBurned(
        selectedActivity,
        activityInput,
        userWeight
      ),
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
      closeModal(); // Close modal after submission
    });
  };

  //------------------------Modal Window------------------------//

  // State to track modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle click outside the modal to close it
  const handleClickOutsideModal = (e) => {
    if (isModalOpen && e.target.classList.contains('overlay')) {
      closeModal();
    }
  };

  useEffect(() => {
    // Attach event listener when the component is inserted
    document.addEventListener('click', handleClickOutsideModal);

    // Detach event listener when the component is remove
    return () => {
      document.removeEventListener('click', handleClickOutsideModal);
    };
  });

  // State to track Selected Date
  const [selectedDate, setSelectedDate] = useState();

  // To filter activities
  const filteredActivities = activities.filter(
    (activity) => activity.date === getStandardizedDate(selectedDate)
  );

  // To handle day click on the DayPicker
  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="activity-dashboard">
      <h2>Activity Log</h2>
      <div className="activity-log-container">
        <div className="activity-content">
          <ActivityDateFilter
            selectedDate={selectedDate}
            onDayClick={handleDayClick}
          />
          <ActivityLog
            filteredActivities={filteredActivities}
            setActivities={setActivities}
            selectedDate={selectedDate}
          />
        </div>
      </div>

      <ReusableModalButton
        buttonText="Add Activity"
        onModalButtonClick={openModal}
      />

      {isModalOpen && (
        <div className="overlay">
          <div className="activity-form-modal">
            <ActivityForm
              activityInput={activityInput}
              onFormChange={handleActivityFormChange}
              onFormSubmit={handleActivitySubmit}
              activityOptions={sortedActivityOptions}
              selectedActivity={selectedActivity}
              onActivityTypeChange={handleActivityTypeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityDashboard;
