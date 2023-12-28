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
      <ul>
        <li className="home-nav" title="Homepage">
          <Link to="/" className="nav-item">
            <FontAwesomeIcon icon={faHouseCrack} />
          </Link>
        </li>

        <li className="activity-log-nav" title="Activity Log">
          <Link to="/activity-log" className="nav-item">
            <FontAwesomeIcon icon={faHeartPulse} />
          </Link>
        </li>

        <li className="nutrition-log-nav" title="Nutrition Log">
          <Link to="/nutrition-log" className="nav-item">
            <FontAwesomeIcon icon={faCarrot} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
