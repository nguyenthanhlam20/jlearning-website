import { API } from "../constants";
import axios from "axios";

const dashboardServices = {
  getData: async () => {
    // console.log(user);
    const response = await axios.get(API.DASHBOARD + "/get");
    return response.data;
  },
};

export default dashboardServices;
