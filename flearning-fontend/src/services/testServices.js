import { API } from "../constants";
import axios from "axios";

 const testServices = {
  updateTest: async (test) => {
    const response = await axios.post(API.MANAGE_TEST + "/update", test);
    return response.data;
  },
  insertTest: async (test) => {
    const response = await axios.post(API.MANAGE_TEST + "/insert", test);
    return response.data;
  },
  deleteTest: async (test) => {
    const response = await axios.post(API.MANAGE_TEST + "/delete", test);
    return response.data;
  },
  getTestById: async (test) => {
    const response = await axios.post(API.MANAGE_TEST + "/get-byid", test);
    return response.data;
  },
  getTests: async () => {
    const response = await axios.get(API.MANAGE_TEST + "/get");
    return response.data;
  },
 
};

export default testServices;
