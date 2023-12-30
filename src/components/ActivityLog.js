import ActivityItem from './ActivityItem';
import activityService from '../services/activityService';

function ActivityLog({ filteredActivities, setActivities }) {
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
