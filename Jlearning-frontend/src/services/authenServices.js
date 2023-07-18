import axios from "axios";
import { API } from "../constants";

/**
 * Authenticates a user by signing in.
 * @route POST /auth/signin
 * @param {object} user.body.required - User object with username and password
 * @returns {object} 200 - Response object with authentication token
 * @returns {object} 401 - Unauthorized
 */
const signin = async (user) => {
  const response = await axios.post(API.AUTHEN.SIGN_IN, user);
  console.log(response);
  return response.data;
};

/**
 * Registers a new user by signing up.
 * @route POST /auth/signup
 * @param {object} user.body.required - User object with username, password, and email
 * @returns {object} 200 - Response object with user details
 * @returns {object} 400 - Bad request
 */
const signup = async (user) => {
  const response = await axios.post(API.AUTHEN.SIGN_UP, user);
  return response.data;
};

/**
 * Sends a forgot password email to the provided email address.
 * @route POST /mail/send/forgot-password
 * @param {string} email.body.required - Email address
 * @returns {object} 200 - Response object confirming email sent
 * @returns {object} 400 - Bad request
 */
const forgotPassword = async (email) => {
  const response = await axios.post(API.MAIL + "/forgot-password", email);
  return response.data;
};

/**
 * Changes the password for a user.
 * @route POST /auth/change-password
 * @param {object} user.body.required - User object with username, old password, and new password
 * @returns {object} 200 - Response object confirming password changed
 * @returns {object} 401 - Unauthorized
 */
const changePassword = async (user) => {
  const response = await axios.post(API.AUTHEN.CHANGE_PASSWORD, user);
  return response.data;
};

export default {
  signin,
  signup,
  forgotPassword,
  changePassword,
};
