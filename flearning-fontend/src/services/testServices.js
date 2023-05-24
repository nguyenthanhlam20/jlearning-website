import { API } from "../constants";
import axios from "axios";

 const testServices = {
  updateTest: async (test) => {
    const response = await axios.post(API.MANAGE_FEEDBACK + "/update", test);
    return response.data;
  },
  insertTest: async (test) => {
    const response = await axios.post(API.MANAGE_FEEDBACK + "/insert", test);
    return response.data;
  },
  getTests: async () => {
    const response = await axios.get(API.MANAGE_FEEDBACK + "/get");
    return response.data;
  },
 
};

export default testServices;
