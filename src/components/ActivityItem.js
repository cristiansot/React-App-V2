function ActivityItem({ activity }) {
  return (
    <div className="activity-item">
      <p>Activity: {activity && activity.type}</p>
      <p>Duration : {activity && activity.duration} </p>
      <p>Intensity: {activity && activity.intensity}</p>
      <p>Calories Burned: {activity && activity.calories}</p>
    </div>
  );
}

export default ActivityItem;
