import { API } from "../constants";
import axios from "axios";

 const userServices = {
  updateInfo: async(user) => {
    const response = await axios.post(API.MANAGE_USER + "/update", user);
    return response.data;
  },

};

export default userServices;
