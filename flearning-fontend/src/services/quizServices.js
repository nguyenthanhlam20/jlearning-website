import { API } from "../constants";
import axios from "axios";

 const quizServices = {
  updateQuiz: async (quiz) => {
    const response = await axios.post(API.MANAGE_FEEDBACK + "/update", quiz);
    return response.data;
  },
  insertQuiz: async (quiz) => {
    const response = await axios.post(API.MANAGE_FEEDBACK + "/insert", quiz);
    return response.data;
  },
  getQuizes: async () => {
    const response = await axios.get(API.MANAGE_FEEDBACK + "/get");
    return response.data;
  },
 
};

export default quizServices;
