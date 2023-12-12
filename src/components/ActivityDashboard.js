import '../css/Activity.css';
import { useState, useEffect } from 'react';
import ActivityLog from './ActivityLog';
import ActivityForm from './ActivityForm';
import activityService from '../services/activityService';
import { v4 as uuidv4 } from 'uuid';
import ResubaleModalButton from './ReusableModalButton';

function ActivityDashboard() {
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

  // State to track modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      closeModal(); // Close modal after submission
    });
  };

  const today = new Date().toISOString().split('T')[0];
  const todayActivities = activities.filter(
    (activitiy) => activitiy.date === today
  );

  // Handle delete activity
  const handleDeleteActivity = (e, id) => {
    e.preventDefault();
    console.log(id);

    activityService.deleteActivity(id).then(() => {
      activityService.getActivities().then((data) => setActivities(data));
    });
  };

  return (
    <div className="activity-dashboard">
      <h2>Today's Activity</h2>
      <ActivityLog
        activities={todayActivities}
        onDeleteActivity={handleDeleteActivity}
        showDateFilter={false}
      />

      <ResubaleModalButton
        buttonText="Add Activity"
        onModalButtonClick={openModal}
      />

      {isModalOpen && (
        <div className="activity-form-modal">
          <ActivityForm
            activityInput={activityInput}
            onFormChange={handleActivityFormChange}
            onFormSubmit={handleActivitySubmit}
            activityOptions={activityOptions}
            selectedActivity={selectedActivity}
            onActivityTypeChange={handleActivityTypeChange}
          />
        </div>
      )}
    </div>
  );
}

export default ActivityDashboard;
