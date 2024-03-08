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

export const getRSOById = async (id) => {
  const data = await Axios.get(`${url}/api/return-supply-order/${id}`, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

export const getRSOs = async () => {
  const data = await Axios.get(`${url}/api/return-supply-order`, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

export const createRSO = async (rso) => {
  const data = await Axios.post(`${url}/api/return-supply-order`, rso, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

export const updateRSO = async (rso, id) => {
  const data = await Axios.put(`${url}/api/return-supply-order/${id}`, rso, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

export const deleteRSO = async (id) => {
  const data = await Axios.delete(`${url}/api/return-supply-order/${id}`, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

export const getRSOBySupplierId = async (id) => {
  const data = await Axios.get(`${url}/api/supplier/${id}/return-supply-order`, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};
