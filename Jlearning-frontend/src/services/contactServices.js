import { API } from "../constants";
import axios from "axios";

const contactServices = {
  updateContact: async (contact) => {
    console.log("update-contact", contact);
    const response = await axios.post(API.MAIL + "/send", contact);
    return response.data;
  },
  insertContact: async (contact) => {
    console.log("insert-contact", contact);
    const response = await axios.post(API.MANAGE_CONTACT + "/insert", contact);
    return response.data;
  },
  getContacts: async () => {
    const response = await axios.get(API.MANAGE_CONTACT + "/get");
    console.log("get-contacts", response);
    return response.data;
  },

};

export default contactServices;
