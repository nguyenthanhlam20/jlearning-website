import { API } from "../constants";
import axios from "axios";

 const userServices = {
  updateInfo: async(user) => {

    console.log("update-info: ", user);
    const response = await axios.post(API.MANAGE_ACCOUNT + "/update-info", user);
    return response.data;
  },

};

export default userServices;
