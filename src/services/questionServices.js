import { API } from "../constants";
import axios from "axios";

 const questionServices = {
  updateQuestion: async (question) => {
    console.log("update-question", question);
    const response = await axios.post(API.MANAGE_QUESTION + "/update", question);
    return response.data;
  },
  insertQuestion: async (question) => {
    console.log("insert-question", question);
    const response = await axios.post(API.MANAGE_QUESTION + "/insert", question);
    return response.data;
  },
  deleteQuestion: async (question) => {
    console.log("delete-question", question);
    const response = await axios.post(API.MANAGE_QUESTION + "/delete", question);
    return response.data;
  },
};

export default questionServices;
