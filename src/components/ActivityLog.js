import ActivityItem from './ActivityItem';

function ActivityLog({ activities, onDeleteActivity }) {
  return activities.map((activity) => {
    return (
      <ActivityItem
        key={activity.id}
        activity={activity}
        onDeleteActivity={onDeleteActivity}
      />
    );
  });
}

export default ActivityLog;
