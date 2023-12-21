import '../css/App.css';
import bikingImage from '../images/biking.jpg';
import chartingImage from '../images/charting.jpg';
import nutritionImage from '../images/nutrition.jpg';

import '../css/Activity.css';
import UserInfoDashboard from './UserInfoDashboard';
import ActivityHomeItem from './ActivityHomeItem';

function Home() {
  return (
    <div className="Home">
      {/* <UserInfoDashboard /> */}

      <div className="ImageContainer">

        <div>
          <img src={bikingImage} alt="Biking" />
          <p className="ImageText" style={{ fontWeight: 'bold' }}>Track your activities and monitor your nutrition intake</p>
        </div>

        <div>
          <img src={chartingImage} alt="Charting" />
          <p className="ImageText" style={{ fontWeight: 'bold' }}>Gain nutrition insights and plan your meals for smarter and healthier choices</p>
        </div>

        <div>
          <img src={nutritionImage} alt="Nutrition" />
          <p className="ImageText" style={{ fontWeight: 'bold' }}>Set goals and cultivate healthy habits to enhance your well-being</p>
        </div>

      </div>
      <UserInfoDashboard />
      <ActivityHomeItem />
    </div>
  );
}

export default Home;
