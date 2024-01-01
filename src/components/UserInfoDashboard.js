import '../css/UserInfo.css';
import { useState } from 'react';
import UserInfo from './UserInfo';
import UserInfoForm from './UserInfoForm';
import userInfoService from '../services/userInfoService';

function UserInfoDashboard({ userInfo, updateUserInfo }) {
  // State to track User Info
  // const [userInfo, setUserInfo] = useState();

  // State to track User Info Form Input
  const [userInput, setUserInput] = useState({
    name: '',
    weight: '',
    height: '',
  });

  // State to control the visibility of the form
  const [userFormVisible, setuserFormVisible] = useState(true);

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    const newUser = userInput;
    userInfoService.postUserInfo(newUser).then((updatedUserInfo) => {
      updateUserInfo(updatedUserInfo);
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
