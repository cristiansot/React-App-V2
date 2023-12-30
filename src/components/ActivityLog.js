import ActivityItem from './ActivityItem';
import { useEffect, useState } from 'react';
import getStandardizedDate from '../utils/getStandardizedDate';
import activityService from '../services/activityService';

function ActivityLog({ filteredActivities, setActivities }) {
  // // Date Filter //
  // const [filteredActivities, setFilteredActivities] = useState([]);

  // useEffect(() => {
  //   handleDayClick(selectedDate);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [activities, selectedDate]);

  // const handleDayClick = (selectedDate) => {
  //   console.log('Selected Date:', selectedDate);
  //   // e.preventDefault();
  //   // To get Today's date in ISO format 'YYYY-MM-DD'
  //   const today = getStandardizedDate();
  //   // If no selected date show today's activity
  //   if (!selectedDate) {
  //     setFilteredActivities(
  //       activities.filter((activity) => activity.date === today)
  //     );
  //   } else {
  //     // If there's a selected date, filter by date
  //     setFilteredActivities(
  //       activities.filter(
  //         (activity) => activity.date === getStandardizedDate(selectedDate)
  //       )
  //     );
  //     console.log(getStandardizedDate(selectedDate));
  //   }
  //   console.log(filteredActivities);
  //   return today;
  // };

  // Handle delete activity
  const handleDeleteActivity = (e, id) => {
    e.preventDefault();
    console.log(id);

    activityService.deleteActivity(id).then(() => {
      activityService.getActivities().then((data) => setActivities(data));
    });
  };

  return (
    <div className="activity-log">
      <div className="activity-scroll">
        {filteredActivities.map((activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            onDeleteActivity={handleDeleteActivity}
          />
        ))}
      </div>
    </div>
  );
}

export default ActivityLog;
