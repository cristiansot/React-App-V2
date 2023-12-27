import ActivityDashboard from './ActivityDashboard';
import ProgressVisualizerDashboard from './ProgressVisualizerDashboard';
import '../css/Activity.css';

function ActivityPage({ userInfo }) {
  return (
    <div className="ActivityPage">
      <ActivityDashboard userInfo={userInfo} />
      <ProgressVisualizerDashboard />
    </div>
  );
}

export default ActivityPage;
