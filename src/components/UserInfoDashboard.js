import '../css/UserInfo.css';
import { useState, useEffect } from 'react';
import UserInfo from './UserInfo';
import UserInfoForm from './UserInfoForm';
import userInfoService from '../services/userInfoService';
import { v4 as uuidv4 } from 'uuid';

function UserInfoDashboard() {
  // State to track User Info
  const [userInfo, setUserInfo] = useState();

  // State to track User Info Form Input
  const [userInput, setUserInput] = useState({
    name: '',
    weight: '',
    height: '',
  });

  // State to control the visibility of the form
  const [userFormVisible, setuserFormVisible] = useState(true);

  // // State to manage loading state while fetching new data
  // const [loading, setLoading] = useState(false);

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    const newUser = userInput;
    console.log(newUser);
    // Show loading state while fetching new data
    // setLoading(true);
    userInfoService.postUserInfo(newUser).then((updatedUserInfo) => {
      // setLoading(false);
      console.log('Updated User Info:', updatedUserInfo);
      setUserInfo(updatedUserInfo);
    });
    setuserFormVisible(false);
  };

  const handleUserInfoChange = (name, value) => {
    setUserInput((prevValue) => ({ ...prevValue, [name]: value }));
  };

  return (
    <div className="user-info-dashboard">
      {!userFormVisible && <UserInfo userInfo={userInfo} />}

      {userFormVisible && (
        <UserInfoForm
          userInput={userInput}
          onFormChange={handleUserInfoChange}
          onFormSubmit={handleUserInfoSubmit}
        />
      )}
    </div>
  );
}

export default UserInfoDashboard;
