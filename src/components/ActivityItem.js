import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ActivityItem({ activity, onDeleteActivity }) {
  return (
    <div className="activity-item">
      <button
        className="delete-button"
        onClick={(e) => onDeleteActivity(e, activity.id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <p>Activity: {activity && activity.activity}</p>
      <p>Duration : {activity && activity.duration} </p>
      <p>Intensity: {activity && activity.intensity}</p>
      <p>Calories Burned: {activity && activity.caloriesBurned}</p>
    </div>
  );
}

export default ActivityItem;
