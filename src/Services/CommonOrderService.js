/*
 * @file CommonOrderService.js
 * @author Ashish H. Prajapati (prajapatiashish40567@gmail.com)
 * @brief Service file to handle all the common order related services
 *        It includes services to get common order by id.
 *
 * @details This file is the service file to handle all the common order related services.
 *           It includes all the services related to the common order.
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

export const getCommonOrderById = async (type , id) => {
    const data = await Axios.get(`${url}/api/${type}/${id}`, config).then(
        (response) => {
        return response.data;
        }
    );
    
    return data;
};