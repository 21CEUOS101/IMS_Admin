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
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("email", response.data.username);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("password", userData.password);
        return { ...response.data, success: true };
      }
    );
    return data;
  } catch (e) {
    return { success: false };
  }
};
