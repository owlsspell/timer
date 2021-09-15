import axios from "axios";

export const registerUser = (data) => {
  return axios.post("/user", data).then((response) => response);
};
export const authorizeUser = (data) => {
  return axios
    .get("/user", {
      params: data,
    })
    .then((response) => response);
};
export const getUserInfo = (token) => {
  return axios
    .get("/getUser", {
      params: { token },
    })
    .then((response) => response);
};
export const sendTimeWithMemo = (time, memo, id, date) => {
  console.log(date);
  return axios
    .post("/time", { time, memo, id, date })
    .then((response) => response);
};

export const getUserStatistics = (id) => {
  return axios
    .get("/time", {
      params: { id },
    })
    .then((response) => response);
};

export const sendRange = (dates) => {
  return axios
    .get("/time/dates", { params: dates })
    .then((response) => response);
};
