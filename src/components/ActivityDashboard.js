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
  //*------------------------All States-------------------*//

  // State to track activities logged
  const [activities, setActivities] = useState([]);

  // State to track Selected Date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // State to track Activity Form Input
  const [activityInput, setActivityInput] = useState({
    date: '',
    activity: '',
    duration: '',
    intensity: '',
    caloriesBurned: '',
  });

  // State to track selected activity and intensity
  const [selectedActivity, setSelectedActivity] = useState({
    activity: '',
    intensity: '',
    MET: '',
  });

  // State to track userWeight
  const [userWeight, setUserWeight] = useState();

  // State to track modal visibility for Add Activity button
  const [isModalOpen, setIsModalOpen] = useState(false);

  // To initialize activities, getting data from mockAPI
  useEffect(() => {
    activityService.getActivities().then((data) => {
      setActivities(Array.isArray(data) ? data : []);
    });
  }, []);

  //----------------------------Add Activity Form------------------------------------//

  // Sorting activity options alphabetically with sort method which takes compare function as an argument
  const sortedActivityOptions = [...activityOptions].sort((a, b) =>
    a.activity.localeCompare(b.activity)
  );

  // Handle change in activity type dropdown selection
  const handleActivityTypeChange = (selectedActivity) => {
    setSelectedActivity(selectedActivity);
  };

  // Handle user input
  const updateActivityInput = (name, processedValue) => {
    setActivityInput((prevValue) => ({ ...prevValue, [name]: processedValue }));
  };

  //To get User Weight for Calories Burned Calculation, from User Info
  useEffect(() => {
    // Make a request to the user info API to get the user's weight
    userInfoService.getUserInfo().then((userInfo) => {
      const currentUserInfo = userInfo[userInfo.length - 1]; // To get the last user info added
      if (currentUserInfo && currentUserInfo.weight) {
        setUserWeight(currentUserInfo.weight);
      }
    });
  }, [userInfo]);

  // Handle activity submission
  const handleActivitySubmit = (e) => {
    e.preventDefault();
    // Add activity & intensity to object based on selectedActivity
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
    activityService.postActivity(newActivity).then(() => {
      activityService.getActivities().then((data) => setActivities(data));
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

  //--------------Modal Window-----------------//

  // To toggle isModalOpen state
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle click outside the modal window to close it
  const handleClickOutsideModal = (e) => {
    if (isModalOpen && e.target.classList.contains('overlay')) {
      closeModal();
    }
  };

  useEffect(() => {
    // Attach event listener to document when the ActivityDashboard component mounted
    document.addEventListener('click', handleClickOutsideModal);

    // Detach event listener when the ActivityDashboard component unmounted - clean up function
    return () => {
      document.removeEventListener('click', handleClickOutsideModal);
    };
  });

  //--------------------------------Calendar------------------------------------//

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
          />
        </div>
      </div>

      <ReusableModalButton
        buttonText="Add Activity"
        onModalButtonClick={openModal}
      />
      {/* Conditional rendering with Logical && operator */}
      {isModalOpen && (
        <div className="overlay">
          <div className="activity-form-modal">
            <ActivityForm
              activityInput={activityInput}
              onFormChange={updateActivityInput}
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
