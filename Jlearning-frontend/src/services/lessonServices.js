import { API } from "../constants";
import axios from "axios";

 const lessonServices = {
  updateLesson: async (lesson) => {
    console.log("update-lesson", lesson);
    const response = await axios.post(API.MANAGE_LESSON + "/update", lesson);
    return response.data;
  },
  insertLesson: async (lesson) => {
    console.log("insert-lesson", lesson);
    const response = await axios.post(API.MANAGE_LESSON + "/insert", lesson);
    return response.data;
  },
  insertLessonDone: async (lesson) => {
    console.log("insert-lesson-done", lesson);
    const response = await axios.post(API.MANAGE_LESSON + "/insert/lesson-done", lesson);
    return response.data;
  },
  deleteLesson: async (lesson) => {
    console.log("delete-lesson", lesson);
    const response = await axios.post(API.MANAGE_LESSON + "/delete", lesson);
    return response.data;
  },

  getLessonsDone: async (user) => {
    // console.log("get-lessons-done-input", user);
    const response = await axios.post(API.MANAGE_LESSON + "/get/lesson-done", user);
    // console.log("get-lessons-done-response", response);
    return response.data;
  },
 
};

export default lessonServices;
