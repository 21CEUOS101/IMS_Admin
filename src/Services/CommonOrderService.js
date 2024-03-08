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