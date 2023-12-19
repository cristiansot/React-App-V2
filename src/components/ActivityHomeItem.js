import { useEffect, useState } from 'react';
import activityService from '../services/activityService';
import ActivityItem from './ActivityItem';
import getStandardizedDate from '../utils/getStandardizedDate';

function ActivityHomeItem() {
  const [todayActivities, setTodayActivities] = useState([]);

  useEffect(() => {
    // Fetch today's activities using activityService
    activityService.getActivities().then((activities) => {
      const today = getStandardizedDate();
      console.log(today);
      const todayActivities = activities.filter(
        (activity) => activity.date === today
      );
      setTodayActivities(todayActivities);
    });
  }, []);

  return (
    <div className="activity-home-item">
      <h2>Today's Activity</h2>
      {todayActivities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

export default ActivityHomeItem;
