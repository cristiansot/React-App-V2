import axios from 'axios';
import { myAPIKey } from './config';

// User Info API calls

const APIKey = myAPIKey;

const getUserInfo = async () => {
  try {
    const request = axios.get(`https://${APIKey}.mockapi.io/userInfo`);
    const response = await request;
    return response.data;
  } catch (error) {
    throw error;
  }
};

const postUserInfo = async (newUser) => {
  try {
    const request = axios.post(
      `https://${APIKey}.mockapi.io/userInfo`,
      newUser
    );
    const response = await request;
    return response.data;
  } catch (error) {
    throw error;
  }
};

const userInfoAPIModule = { getUserInfo, postUserInfo };
export default userInfoAPIModule;
