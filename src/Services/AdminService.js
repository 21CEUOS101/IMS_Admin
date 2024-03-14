/*
 * @file AdminService.js
 * @author Ashish H. Prajapati (prajapatiashish40567@gmail.com)
 * @brief Service file to handle all the admin related services
 *
 * @details This file is the service file to handle all the admin related services. It includes all the services related to the admin.
 *          It includes services to get admin by id, get all admins, create admin, update admin and delete admin.
 *          It also includes service to get recent sales.
 *
 * @version 0.1
 * @date 14th March 2024
 *
 * @history 14th March 2021 Finalized the file for version 0.1
 */

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
