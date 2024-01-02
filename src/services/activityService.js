import axios from 'axios';
// Import API key from a secure location or environment variable
import { myAPIKey } from './config';

const APIurl = `https://${myAPIKey}.mockapi.io/activities`;

const getActivities = async () => {
  try {
    const response = await axios.get(APIurl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const postActivity = async (newActivity) => {
  try {
    const response = await axios.post(APIurl, newActivity);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteActivity = async (id) => {
  try {
    const response = await axios.delete(`${APIurl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const activityAPIModule = { getActivities, postActivity, deleteActivity };
export default activityAPIModule;
