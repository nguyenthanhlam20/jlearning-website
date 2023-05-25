import { API } from "../constants";
import axios from "axios";

 const authenServices = {
  signin: async (user) => {
    // console.log(user);
    const response = await axios.post(API.AUTHEN.SIGN_IN, user, {
      headers: {
        authorization: "Bearer " + user.token,
      },
    });

    // console.log(response);
    return response.data;
  },
  signup: async (user) => {
    const response = await axios.post(API.AUTHEN.SIGN_UP, user);
    return response.data;
  },
  forgotPassword: async (email) => {
    const response = await axios.post(API.AUTHEN.FORGOT_PASSWORD, email);
    return response.data;
  },
  changePassword: async (user) => {
    // console.log(user);
    const response = await axios.post(API.AUTHEN.CHANGE_PASSWORD, user);
    return response.data;
  },
};

export default authenServices;
