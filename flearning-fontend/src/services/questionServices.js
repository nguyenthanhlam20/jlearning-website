import { API } from "../constants";
import axios from "axios";

 const questionServices = {
  updateQuestion: async (question) => {
    const response = await axios.post(API.MANAGE_QUESTION + "/update", question);
    return response.data;
  },
  insertQuestion: async (question) => {
    const response = await axios.post(API.MANAGE_QUESTION + "/insert", question);
    return response.data;
  },
  deleteQuestion: async (question) => {
    const response = await axios.post(API.MANAGE_QUESTION + "/delete", question);
    return response.data;
  },
  getQuestions: async () => {
    const response = await axios.get(API.MANAGE_QUESTION + "/get");
    return response.data;
  },
 
};

export default questionServices;
