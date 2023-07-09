import { API } from "../constants";
import axios from "axios";

 const chapterServices = {
  updateChapter: async (chapter) => {
    console.log("update-chapter", chapter);
    const response = await axios.put(API.MANAGE_CHAPTER + "/update", chapter);
    return response.data;
  },
  insertChapter: async (chapter) => {
    console.log("insert-chapter", chapter);
    const response = await axios.post(API.MANAGE_CHAPTER + "/insert", chapter);
    return response.data;
  },
  deleteChapter: async (chapter) => {
    console.log("delete-chapter", chapter);
    const response = await axios.post(API.MANAGE_CHAPTER + "/delete", chapter);
    return response.data;
  },
};

export default chapterServices;
