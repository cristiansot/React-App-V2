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
      {imageSource && (
        <img
          className="activity-image"
          src={imageSource}
          alt={activity.activity}
        />
      )}
      <div>
        {/* <p>Date: {activity && activity.date}</p> */}
        <p className="activity-name">{activity && activity.activity}</p>
        <p>{activity && activity.duration} minutes </p>
        <p>Intensity: {activity && activity.intensity}</p>
        <p>Calories Burned: {activity && activity.caloriesBurned}</p>
      </div>
    </div>
  );
}

export default ActivityItem;
