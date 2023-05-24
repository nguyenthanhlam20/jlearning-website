import { API } from "../constants";
import axios from "axios";

 const feedbackServices = {
  updateFeedback: async (feedback) => {
    const response = await axios.post(API.MANAGE_FEEDBACK + "/update", feedback);
    return response.data;
  },
  insertFeedback: async (feedback) => {
    const response = await axios.post(API.MANAGE_FEEDBACK + "/insert", feedback);
    return response.data;
  },
  getFeedbacks: async () => {
    const response = await axios.get(API.MANAGE_FEEDBACK + "/get");
    return response.data;
  },
 
};

export default feedbackServices;
