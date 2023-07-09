import { API } from "../constants";
import axios from "axios";

const supportServices = {
  updateSupport: async (support) => {
    console.log("update-support", support);
    const response = await axios.post(API.MANAGE_SUPPORT + "/update", support);
    return response.data;
  },
  insertSupport: async (support) => {
    console.log("insert-support", support);
    const response = await axios.post(API.MANAGE_SUPPORT + "/insert", support);
    return response.data;
  },
  deleteSupport: async (support) => {
    console.log("delete-support", support);
    const response = await axios.post(API.MANAGE_SUPPORT + "/delete", support);
    return response.data;
  },
  getSupports: async () => {
    const response = await axios.get(API.MANAGE_SUPPORT + "/get");
    console.log("get-supports", response);
    return response.data;
  },

};

export default supportServices;
