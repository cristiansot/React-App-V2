import '../css/App.css';
import '../css/Activity.css';
import UserInfoDashboard from './UserInfoDashboard';
import ActivityHomeItem from './ActivityHomeItem';

function Home() {
  return (
    <div className="Home">
      <UserInfoDashboard />
      <ActivityHomeItem />
    </div>
  );
}

export default Home;
