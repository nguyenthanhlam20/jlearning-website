import { API } from "../constants";
import axios from "axios";

 const chapterServices = {
  updateChapter: async (chapter) => {
    const response = await axios.post(API.MANAGE_CHAPTER + "/update", chapter);
    return response.data;
  },
  insertChapter: async (chapter) => {
    const response = await axios.post(API.MANAGE_CHAPTER + "/insert", chapter);
    return response.data;
  },
  deleteChapter: async (chapter) => {
    const response = await axios.post(API.MANAGE_CHAPTER + "/delete", chapter);
    return response.data;
  },
  getChapters: async () => {
    const response = await axios.get(API.MANAGE_CHAPTER + "/get");
    return response.data;
  },
 
};

export default chapterServices;
