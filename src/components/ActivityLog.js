import ActivityItem from './ActivityItem';

function ActivityLog({ activities }) {
  return activities.map((activity) => {
    return <ActivityItem activity={activity} />;
  });
}

export default ActivityLog;
