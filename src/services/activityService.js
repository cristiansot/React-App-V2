import axios from 'axios';
import myAPIKey from './config';

// Activity API Calls

const APIKey = myAPIKey;
const APIurl = `https://${APIKey}.mockapi.io/activities`;

const getActivities = async () => {
  try {
    const request = axios.get(APIurl);
    const response = await request;
    return response.data;
  } catch (error) {
    throw error;
  }
};

const postActivity = async (newActivity) => {
  console.log(newActivity);
  try {
    const request = axios.post(APIurl, newActivity);
    const response = await request;
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteActivity = async (id) => {
  console.log(id);
  try {
    const request = axios.delete(`${APIurl}/${id}`);
    const response = await request;
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const activityAPIModule = { getActivities, postActivity, deleteActivity };
export default activityAPIModule;
