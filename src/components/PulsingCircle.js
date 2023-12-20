import React, { useState, useEffect, useMemo } from 'react';
import "./css/PulsingCircle.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faHeartbeat, 
  faRunning, 
  faDumbbell,
  faUtensils,
  faUserMd,
  faStethoscope,
  faCarrot,
  faMedkit, 
  faPills, 
  faHospital, 
  faThermometer, 
  faBriefcaseMedical, 
  faVirus, 
  faVirusSlash, 
} from '@fortawesome/free-solid-svg-icons';
import './PulsingCircle.css';

const PulsingCircle = () => {
  const [pulse, setPulse] = useState(false);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  const healthIcons = useMemo(() => [
    faHeart, 
    faHeartbeat, 
    faRunning, 
    faDumbbell,
    faUtensils,
    faUserMd,
    faStethoscope,
    faCarrot,
    faMedkit, 
    faPills, 
    faHospital, 
    faThermometer, 
    faBriefcaseMedical, 
    faVirus, 
    faVirusSlash, 
  ], []);

  const togglePulse = () => {
    setPulse((prevPulse) => !prevPulse);
  };

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      togglePulse();
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % healthIcons.length);
    }, 1000);

    // Clean up interval on component unmount
    return () => {
      clearInterval(pulseInterval);
    };
  }, [healthIcons]);

  return (
    <div className="container">
      <h1>One Stop Nutrition!</h1>
      <div className={`pulsing-circle ${pulse ? 'pulse' : ''}`}>
        <FontAwesomeIcon icon={healthIcons[currentIconIndex]} className="health-icon" />
      </div>
    </div>
  );
};

export default PulsingCircle;