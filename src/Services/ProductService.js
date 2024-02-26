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

export const getAllProducts = async () => {
  const data = await Axios.get(`${url}/api/product`, config).then(
    (response) => {
      return response.data;
    }
  );
  return data;
};

export const getProductById = async (id) => {
  const data = await Axios.get(`${url}/api/product/${id}`, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

export const createProduct = async (product) => {
  try {
    const data = await Axios.post(`${url}/api/product`, product, config).then(
      (response) => {
        return { ...response.data, success: true };
      }
    );

    return data;
  } catch (e) {
    return { success: false };
  }
};

export const updateProduct = async (id, product) => {
  try {
    const data = await Axios.post(`${url}/api/product/${id}`, product, config).then(
      (response) => {
        return { ...response.data, success: true };
      }
    );

    return data;
  } catch (e) {
    return { success: false };
  }
};
