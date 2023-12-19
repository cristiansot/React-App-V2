import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ActivityItem({ activity, onDeleteActivity }) {
  const imageSource = activity.image
    ? require(`../images/activities/${activity.image}`)
    : null;

  return (
    <div className="activity-item">
      <button
        className="delete-button"
        onClick={(e) => onDeleteActivity(e, activity.id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      {imageSource && <img src={imageSource} alt={activity.activity} />}
      <p>Date: {activity && activity.date}</p>
      <p>Activity: {activity && activity.activity}</p>
      <p>Duration : {activity && activity.duration} </p>
      <p>Intensity: {activity && activity.intensity}</p>
      <p>Calories Burned: {activity && activity.caloriesBurned}</p>
    </div>
  );
}

export default ActivityItem;
