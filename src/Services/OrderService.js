/*
 * @file [Filename.extension]
 * @author [Your Name] ([Your Email] - optional)
 * @brief A concise description of the file's purpose
 *
 * @details (Optional) Provide more elaborate details about the functionality
 *          implemented in this file. This could include:
 *          - Key algorithms or data structures used
 *          - Assumptions or dependencies
 *          - Non-obvious behaviors
 *
 * @version [Version Number] (e.g., 1.0.0)
 * @date [Creation Date] (e.g., 2024-03-14)
 *
 * @copyright [Copyright Statement] (Optional, but recommended)
 *
 * @history (Optional) List significant changes made to the file, with
 *          versions, dates, and brief descriptions.
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

export const getOrderById = async (id) => {
  const data = await Axios.get(`${url}/api/order/${id}`, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

export const getOrders = async () => {
  const data = await Axios.get(`${url}/api/order`, config).then((response) => {
    return response.data;
  });

  return data;
};

export const createOrder = async (order) => {
  const data = await Axios.post(`${url}/api/order`, order, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

export const updateOrder = async (order, id) => {
  const data = await Axios.put(`${url}/api/order/${id}`, order, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

export const deleteOrder = async (id) => {
  const data = await Axios.delete(`${url}/api/order/${id}`, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

// get all orders of a customer

export const getCustomerOrders = async (id) => {
  const data = await Axios.get(`${url}/api/customer/${id}/orders`, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

// get all orders of a warehouse

export const getWarehouseOrders = async (id) => {
  const data = await Axios.get(
    `${url}/api/warehouse/${id}/orders`,
    config
  ).then((response) => {
    return response.data;
  });

  return data;
};
