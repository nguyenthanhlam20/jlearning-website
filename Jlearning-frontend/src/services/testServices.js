import { API } from "../constants";
import axios from "axios";

 const testServices = {
  updateTest: async (test) => {
    console.log("update-test", test);
    const response = await axios.post(API.MANAGE_TEST + "/update", test);
    return response.data;
  },
  insertTest: async (test) => {
    console.log("insert-test", test);
    const response = await axios.post(API.MANAGE_TEST + "/insert", test);
    return response.data;
  },
  insertTestDone: async (test) => {
    console.log("insert-test-done", test);
    const response = await axios.post(API.MANAGE_TEST + "/insert/test-done", test);
    return response.data;
  },
  deleteTest: async (test) => {
    console.log("delete-test", test);
    const response = await axios.post(API.MANAGE_TEST + "/delete", test);
    return response.data;
  },
  getTestById: async (test) => {
    console.log("get-test-by-id", test);
    const response = await axios.post(API.MANAGE_TEST + "/get/by-id", test);
    return response.data;
  },
  getTests: async () => {
    const response = await axios.get(API.MANAGE_TEST + "/get");
    console.log("get-tests", response);
    return response.data;
  },
  getTestsDone: async (user) => {
    const response = await axios.post(API.MANAGE_TEST + "/get/test-done", user);
    return response.data;
  },
 
};

export default testServices;
