import jwt_decode from "jwt-decode";
export const decryptToken = (token) => {
  // console.log("token is being decoded", token);
  return jwt_decode(token);
  // console.log("decoded value", decoded);
};
