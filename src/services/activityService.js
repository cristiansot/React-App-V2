import axios from 'axios';
import myAPIKey from './config';

// Activity API Calls

const APIKey = myAPIKey;

const getActivities = async () => {
  try {
    const request = axios.get(`https://${APIKey}.mockapi.io/activities`);
    const response = await request;
    return response.data;
  } catch (error) {
    throw error;
  }
};

const postActivity = async (newActivity) => {
  try {
    const request = axios.post(
      `https://${APIKey}.mockapi.io/activities`,
      newActivity
    );
    const response = await request;
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const activityAPIModule = { getActivities, postActivity };
export default activityAPIModule;
