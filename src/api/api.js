import axios from "axios";

export const authorizeUser = (data) => {};
export const registerUser = (data) => {
  return axios.post("/user", data).then((response) => response);
};
