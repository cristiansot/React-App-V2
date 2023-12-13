import '../css/Activity.css';
import { useState, useEffect } from 'react';
import ActivityLog from './ActivityLog';
import ActivityForm from './ActivityForm';
import activityService from '../services/activityService';
import { v4 as uuidv4 } from 'uuid';
import ResubaleModalButton from './ReusableModalButton';
import calcCaloriesBurned from '../utils/caloriesBurnedUtils';

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
    { activity: 'Rock Climbing', intensity: 'High', MET: 7 },
    { activity: 'Running', intensity: 'High', MET: 8 },
    { activity: 'Walking', intensity: 'Low', MET: 3.5 }, // Assuming casual walking
    { activity: 'Gentle Yoga', intensity: 'Low', MET: 2 },
    { activity: 'Biking', intensity: 'Moderate', MET: 6 },
    { activity: 'Power Yoga', intensity: 'Moderate', MET: 4 },
    { activity: 'Swimming', intensity: 'High', MET: 7 },
    { activity: 'Hiking (Moderate)', intensity: 'Moderate', MET: 4.5 },
    { activity: 'Hiking (Challenging)', intensity: 'High', MET: 6.5 },
    { activity: 'Hiking (Difficult)', intensity: 'Very High', MET: 8 },
    { activity: 'Hiking (Extreme)', intensity: 'Very High', MET: 10 },
    { activity: 'Cycling (Leisure)', intensity: 'Low', MET: 4 },
    { activity: 'Elliptical Trainer', intensity: 'Moderate', MET: 5 },
    { activity: 'Strength Training', intensity: 'Moderate', MET: 3 },
    { activity: 'Pilates', intensity: 'Low', MET: 3 },
    { activity: 'Dancing (Aerobic)', intensity: 'Moderate', MET: 5 },
    { activity: 'Rowing (Moderate)', intensity: 'Moderate', MET: 6 },
    { activity: 'Tennis (Singles)', intensity: 'Moderate', MET: 7 },
    { activity: 'Basketball', intensity: 'High', MET: 8 },
    { activity: 'Soccer', intensity: 'High', MET: 10 },
    { activity: 'CrossFit', intensity: 'High', MET: 12 },
    { activity: 'Running (Sprinting)', intensity: 'Very High', MET: 12 },
    { activity: 'Swimming (Competitive)', intensity: 'Very High', MET: 12 },
    {
      activity: 'High-Intensity Interval Training (HIIT)',
      intensity: 'Very High',
      MET: 12,
    },
    { activity: 'Cleaning (Light)', intensity: 'Low', MET: 2 },
    { activity: 'Cleaning (Moderate)', intensity: 'Moderate', MET: 3 },
    { activity: 'Cooking', intensity: 'Low', MET: 2 },
    { activity: 'Dishwashing', intensity: 'Low', MET: 2 },
    { activity: 'Gardening (Light)', intensity: 'Low', MET: 2.5 },
    { activity: 'Gardening (Moderate)', intensity: 'Moderate', MET: 4 },
    { activity: 'Ironing', intensity: 'Low', MET: 2 },
    { activity: 'Mopping', intensity: 'Moderate', MET: 3 },
    { activity: 'Vacuuming', intensity: 'Moderate', MET: 3.5 },
    { activity: 'Walking (Brisk)', intensity: 'Moderate', MET: 4 },
  ];

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

  // Handle activity submission
  const handleActivitySubmit = (e) => {
    e.preventDefault();
    console.log(activityInput);
    // Addiactivity & intensity to object based on selectedActivity
    const newActivity = {
      id: uuidv4(),
      ...activityInput,
      ...selectedActivity,
      caloriesBurned: calcCaloriesBurned(selectedActivity, activityInput),
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

      <h2>Activity History</h2>
      <ActivityLog
        activities={activities}
        onDeleteActivity={handleDeleteActivity}
        showDateFilter={true}
      />
    </div>
  );
}

export default ActivityDashboard;
