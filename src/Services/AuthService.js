import Axios from "axios";
import { url } from "./index";

export const Login = async ({ username, password }) => {
  const userData = {
    username: username,
    password: password,
  };

  // Clear local storage
  localStorage.removeItem("jwt");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  localStorage.removeItem("id");
  localStorage.removeItem("password");

  try {
    const data = await Axios.post(`${url}/auth/login`, userData).then(
      (response) => {
        if(response.data === "Credentials Invalid !!") return { message : response?.data, success: false };

        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("email", response.data.username);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("password", userData.password);
        return { message : response?.data, success: true };
      }
    );
    return data;
  } catch (e) {
    return { message : "Something went Wrong !" , success: false };
  }
};

export const Logout = async () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  localStorage.removeItem("id");
  localStorage.removeItem("password");
  window.location.reload();
};

// change password
export const change_Password = async (data) => {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  try {
    const response = await Axios.post(`${url}/auth/change-password`, data, config);
    return response.data;
  } catch (e) {
    return { success: false };
  }
};
