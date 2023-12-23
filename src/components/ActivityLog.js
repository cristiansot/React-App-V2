import ActivityItem from './ActivityItem';
import ActivityDateFilter from './ActivityDateFilter';
import { useEffect, useState } from 'react';
import getStandardizedDate from '../utils/getStandardizedDate';

function ActivityLog({ activities, onDeleteActivity }) {
  // Date Filter //
  const [filteredActivities, setFilteredActivities] = useState([]);

  useEffect(() => {
    handleDayClick();
  }, [activities]);

  const handleDayClick = (selectedDate) => {
    console.log('Selected Date:', selectedDate);
    // e.preventDefault();
    // To get Today's date in ISO format 'YYYY-MM-DD'
    const today = getStandardizedDate();
    // If no selected date show today's activity
    if (!selectedDate) {
      setFilteredActivities(
        activities.filter((activity) => activity.date === today)
      );
    } else {
      // If there's a selected date, filter by date
      setFilteredActivities(
        activities.filter(
          (activity) => activity.date === getStandardizedDate(selectedDate)
        )
      );
      console.log(getStandardizedDate(selectedDate));
    }
    console.log(filteredActivities);
    return today;
  };

  return (
    <div className="activity-log">
      <ActivityDateFilter onDayClick={handleDayClick} />
      <div className="activity-scroll">
        {filteredActivities.map((activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            onDeleteActivity={onDeleteActivity}
          />
        ))}
      </div>
    </div>
  );
}

export default ActivityLog;
