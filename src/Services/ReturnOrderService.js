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

export const getReturnOrderById = async (id) => {
  const data = await Axios.get(`${url}/api/return-order/${id}`, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

export const getReturnOrders = async () => {
  const data = await Axios.get(`${url}/api/return-order`, config).then((response) => {
    return response.data;
  });

  return data;
};

export const createReturnOrder = async (returnOrder) => {
  const data = await Axios.post(`${url}/api/return-order`, returnOrder, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

export const updateReturnOrder = async (returnOrder, id) => {
  const data = await Axios.post(`${url}/api/return-order/${id}`, returnOrder, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

export const deleteReturnOrder = async (id) => {
  const data = await Axios.delete(`${url}/api/return-order/${id}`, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

export const getReturnOrderByCustomerId = async (id) => {
  const data = await Axios.get(`${url}/api/customer/${id}/return-orders`, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

// get all return orders by warehouse id
export const getReturnOrderByWarehouseId = async (id) => {
  const data = await Axios.get(`${url}/api/warehouse/${id}/return-orders`, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};