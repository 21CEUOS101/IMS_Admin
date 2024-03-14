/*
 * @file DeliveryManService.js
 * @author  Ashish H. Prajapati (prajapatiashish40567@gmail.com)
 * @brief Service file to handle all the deliveryman related services
 *
 * @details This file is the service file to handle all the deliveryman related services. It includes all the services related to the deliveryman.
 *         It includes services to get deliveryman by id, get all deliverymans, create deliveryman, update deliveryman and delete deliveryman.
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
