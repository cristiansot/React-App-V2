import '../css/App.css';
import bikingImage from '../images/biking.jpg';
import chartingImage from '../images/charting.jpg';
import nutritionImage from '../images/nutrition.jpg';
import '../css/Activity.css';

function Home() {
  return (
    <div className="Home">
      <div className="ImageContainer">
        <div className="home-item">
          <img src={bikingImage} alt="Biking" />
          <p className="ImageText" style={{ fontWeight: 'bold' }}>
            Track your activities and monitor your nutrition intake
          </p>
        </div>

        <div className="home-item">
          <img src={nutritionImage} alt="Nutrition" />
          <p className="ImageText" style={{ fontWeight: 'bold' }}>
            Gain nutrition insights and plan your meals for smarter and
            healthier choices
          </p>
        </div>

        <div className="home-item">
          <img src={chartingImage} alt="Charting" />
          <p className="ImageText" style={{ fontWeight: 'bold' }}>
            Set goals and cultivate healthy habits to enhance your well-being
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
