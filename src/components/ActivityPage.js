import ActivityDashboard from './ActivityDashboard';
import ProgressVisualizerDashboard from './ProgressVisualizerDashboard';
import '../css/Activity.css';

function ActivityPage() {
  return (
    <div className="ActivityPage">
      <ActivityDashboard />
      <ProgressVisualizerDashboard />
    </div>
  );
}

export default ActivityPage;
