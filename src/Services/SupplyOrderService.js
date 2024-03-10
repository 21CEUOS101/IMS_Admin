import Axios from 'axios';
import { url } from './index.js';

const token = localStorage.getItem('jwt');
const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    withCredentials: true,
};

export const getSupplyOrderById = async (id) => {

    const data = await Axios.get(`${url}/api/supply-order/${id}`, config).then((response) => {
        return response.data;
    });

    return data;
}

export const getSupplyOrders = async () => {
    const data = await Axios.get(`${url}/api/supply-order`, config).then((response) => {
        return response.data;
    });

    return data;
}

export const createSupplyOrder = async (supplyOrder) => {
    const data = await Axios.post(`${url}/api/supply-order`, supplyOrder, config).then((response) => {
        return response.data;
    });

    return data;
}

export const updateSupplyOrder = async (supplyOrder, id) => {
    const data = await Axios.post(`${url}/api/supply-order/${id}`, supplyOrder, config).then((response) => {
        return response.data;
    });

    return data;
}

export const deleteSupplyOrder = async (id) => {
    const data = await Axios.delete(`${url}/api/supply-order/${id}`, config).then((response) => {
        return response.data;
    });

    return data;
};

export const getSupplyOrderBySupplierId = async (id) => {
    const data = await Axios.get(`${url}/api/supplier/${id}/supply-orders`, config).then((response) => {
        console.log(response);
        return response.data;
    });

    return data;
};