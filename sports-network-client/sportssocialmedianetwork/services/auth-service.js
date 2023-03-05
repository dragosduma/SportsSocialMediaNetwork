import axios from "axios";
import Router from "next/router";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const API_URL = "/auth";

const login = (username, password) => {
  return axios
    .post(API_URL + "/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.jwtToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  signOut(auth).then(() => {

  }).catch((error) => {
    console.log(error);
  });
  Router.push("/login");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;
