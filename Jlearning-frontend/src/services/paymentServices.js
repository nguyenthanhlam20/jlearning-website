import { API } from "../constants";
import axios from "axios";

 const paymentServices = {
  createPayment: async (payment) => {
    console.log("create-payment: ", payment);
    const response = await axios.post(API.MANAGE_PAYMENT + "/create", payment);
    return response.data;
  },
  insertPayment: async (payment) => {
    console.log("insert-payment: ", payment);
    const response = await axios.post(API.MANAGE_PAYMENT + "/insert", payment);
    return response.data;
  },
  getPaymentsByUser: async (payment) => {
    const response = await axios.post(API.MANAGE_PAYMENT + "/get/by-user", payment);
    return response.data;
  },
  getAllPayments: async () => {
    const response = await axios.get(API.MANAGE_PAYMENT + "/get");
    return response.data;
  },
 
};

export default paymentServices;
