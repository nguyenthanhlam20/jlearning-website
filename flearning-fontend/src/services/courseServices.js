import { API } from "../constants";
import axios from "axios";

const courseServices = {
  getCourses: async () => {
    // console.log(user);
    const response = await axios.get(API.MANAGE_COURSE + "/get");
    return response.data;
  },
  getCourseById: async (course) => {
    // console.log(user);
    const response = await axios.post(API.MANAGE_COURSE + "/get/by-id", course);
    return response.data;
  },

  insertCourse: async (course) => {
    const response = await axios.post(API.MANAGE_COURSE + "/insert", course);
    return response.data;
  },
  updateCourse: async (course) => {
    const response = await axios.post(API.MANAGE_COURSE + "/update", course);
    return response.data;
  }

};

export default courseServices;
