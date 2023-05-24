import { API } from "../constants";
import axios from "axios";

 const contactServices = {
  updateContact: async (contact) => {
    // console.log(user);
    const response = await axios.post(API.MANAGE_CONTACT + "/update", contact);
    return response.data;
  },
  insertContact: async (contact) => {
    // console.log(user);
    const response = await axios.post(API.MANAGE_CONTACT + "/insert", contact);
    return response.data;
  },
  getContacts: async () => {
    // console.log(user);
    const response = await axios.get(API.MANAGE_CONTACT + "/get");
    return response.data;
  },
 
};

export default contactServices;
