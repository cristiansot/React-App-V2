import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/NavBar.css';
import {
  faCarrot,
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

      <div className="activity-log-nav nav-item">
        <Link to="/activity-log" className="nav-item">
          <FontAwesomeIcon icon={faHeartPulse} />
        </Link>
      </div>

      <div className="nutrition-log-nav">
        <Link to="/nutrition-log" className="nav-item">
          <FontAwesomeIcon icon={faCarrot} />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
