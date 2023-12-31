import ActivityItem from './ActivityItem';
import activityService from '../services/activityService';

function ActivityLog({ filteredActivities, setActivities }) {
  // Handle delete activity
  const handleDeleteActivity = (e, id) => {
    e.preventDefault();
    activityService.deleteActivity(id).then(() => {
      activityService.getActivities().then((data) => setActivities(data));
    });
  };

  return (
    <div className="activity-log">
      <div className="activity-scroll">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              onDeleteActivity={handleDeleteActivity}
            />
          ))
        ) : (
          <div className="no-activity-message">
            <p>No activity logged for this day.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityLog;
