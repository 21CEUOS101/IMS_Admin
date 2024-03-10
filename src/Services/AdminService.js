import Axios from "axios";
import { url } from "./index.js";

const token = localStorage.getItem("jwt");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getAdminById = async (id) => {

  if(!token) return { success: false, message: "Token not found" };

  const data = await Axios.get(`${url}/api/admin/${id}`, config).then(
    (response) => {
      return response.data;
    }
  );
  return { ...data, role: "admin" , success : true };
};

export const getAdmins = async () => {
  const data = await Axios.get(`${url}/api/admin`, config).then((response) => {
    return response.data;
  });

  return data;
};

export const createAdmin = async (admin) => {
  const data = await Axios.post(`${url}/api/admin`, admin, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

export const updateAdmin = async (admin, id) => {
  try {
    const data = await Axios.post(`${url}/api/admin/${id}`, admin, config).then(
      (response) => {
        return response.data;
      }
    );

    return { ...data, role: "admin", success: true };
  } catch (error) {
    return { ...error.response.data, success: false };
  }
};

export const deleteAdmin = async (id) => {
  const data = await Axios.delete(`${url}/api/admin/${id}`, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

// get recent sales
export const getRecentSales = async () => {

  if(!token) return { success: false, message: "Token not found" };

  const data = await Axios.get(`${url}/api/admin/analytics/recent-sales`, config).then(
    (response) => {
      return response.data;
    }
  );

  return { data : data , success: true };
};
