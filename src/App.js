import './css/App.css';
import { useState } from 'react';
import ActivityLog from './components/ActivityLog';
import ActivityForm from './components/ActivityForm';
import UserInfo from './components/UserInfo';
import UserInfoForm from './components/UserInfoForm';

function App() {
  //-------User Info State and Functions-------//

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

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    console.log(userInput);
    setUserInfo(userInput);
    setuserFormVisible(false);
  };

  const handleUserInfoChange = (name, value) => {
    setUserInput((prevValue) => ({ ...prevValue, [name]: value }));
  };
  console.log(userInput);

  return (
    <div className="App">
      {!userFormVisible && <UserInfo userInfo={userInfo} />}

      {userFormVisible && (
        <UserInfoForm
          userInput={userInput}
          onFormChange={handleUserInfoChange}
          onFormSubmit={handleUserInfoSubmit}
        />
      )}

      <ActivityLog />
      <ActivityForm />
    </div>
  );
}

export default App;
