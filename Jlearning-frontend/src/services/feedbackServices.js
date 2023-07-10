import { API } from "../constants";
import axios from "axios";

 const feedbackServices = {
  updateFeedback: async (feedback) => {
    console.log("update-feedback", feedback);
    const response = await axios.put(API.MANAGE_FEEDBACK + "/update", feedback);
    return response.data;
  },
  insertFeedback: async (feedback) => {
    console.log("insert-feedback", feedback);
    const response = await axios.post(API.MANAGE_FEEDBACK + "/insert", feedback);
    return response.data;
  },
  getFeedbackById: async (feedback) => {
    console.log("get-feedback-by-id: ", feedback);
    const response = await axios.post(API.MANAGE_FEEDBACK + "/get/by-id", feedback);
    console.log("get-feedback-by-id-response: ", response);
    return response.data;
  },
  getFeedbacks: async () => {
    const response = await axios.get(API.MANAGE_FEEDBACK + "/get");
    console.log("get-feedbacks", response);
    return response.data;
  },
 
};

export default feedbackServices;
