import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/NavBar.css';
import {
  faChartLine,
  faCarrot,
  faPlateWheat,
  faHeartPulse,
  faHouseCrack,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="home-nav">
        <Link to="/" className="nav-item">
          <FontAwesomeIcon icon={faHouseCrack} />
        </Link>
      </div>
      <br/>
      <div className="activity-log-nav nav-item">
        <Link to="/activity-log" className="nav-item">
          <FontAwesomeIcon icon={faHeartPulse} />
        </Link>
      </div>
      <br/>
      {/* <div className="progress-tracker-nav">
        <Link to="/progress-tracker" className="nav-item">
          <FontAwesomeIcon icon={faChartLine} />
        </Link>
      </div> */}
      <br/>
      <div className="nutrition-log-nav">
        <Link to="/nutrition-log" className="nav-item">
          <FontAwesomeIcon icon={faCarrot} />
        </Link>
      </div>
      <br/>
      {/* <div className="meal-planner-nav">
        <Link to="/meal-plan" className="nav-item">
          <FontAwesomeIcon icon={faPlateWheat} />
        </Link>
      </div> */}
    </nav>
  );
}

export default NavBar;
