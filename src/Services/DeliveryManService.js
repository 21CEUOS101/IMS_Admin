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

export const getDeliveryManById = async (id) => {
  const data = await Axios.get(`${url}/api/deliveryman/${id}`, config).then(
    (response) => {
      return response.data;
    }
  );

  return { ...data, role: "deliveryman" };
};

export const getDeliveryMans = async () => {
  const data = await Axios.get(`${url}/api/deliveryman`, config).then(
    (response) => {
      return response.data;
    }
  );

  return data;
};

export const createDeliveryMan = async (deliveryman, id) => {
  try {
    const data = await Axios.post(
      `${url}/api/deliveryman`,
      deliveryman,
      config
    ).then((response) => {
      return response.data;
    });

    return { ...data, role: "deliveryman", success: true };
  } catch (error) {
    return { ...error.response.data, success: false };
  }
};

export const updateDeliveryMan = async (deliveryman, id) => {
  try {
    const data = await Axios.post(
      `${url}/api/deliveryman/${id}`,
      deliveryman,
      config
    ).then((response) => {
      return response.data;
    });

    return { ...data, role: "deliveryman", success: true };
  } catch (error) {
    return { ...error.response.data, success: false };
  }
};

export const deleteDeliveryMan = async (id) => {
  try {
    const data = await Axios.delete(
      `${url}/api/deliveryman/${id}`,
      config
    ).then((response) => {
      return response.data;
    });

    return { ...data, success: true };
  } catch (error) {
    return { ...error.response.data, success: false };
  }
};
