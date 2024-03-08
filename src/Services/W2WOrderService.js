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

export const getW2WOrderById = async (id) => {

    const data = await Axios.get(`${url}/api/w2worder/${id}`, config).then((response) => {
        return response.data;
    });
    
    return data;
}

export const getW2WOrders = async () => {
    
    const data = await Axios.get(`${url}/api/w2worder`, config).then((response) => {
        return response.data;
    });
    
    return data;
}

export const createW2WOrder = async (w2worder) => {
    
    const data = await Axios.post(`${url}/api/w2worder`, w2worder, config).then((response) => {
        return response.data;
    });
    
    return data;
}

export const updateW2WOrder = async (w2worder , id) => {
    
    const data = await Axios.post(`${url}/api/w2worder/${id}`, w2worder, config).then((response) => {
        return response.data;
    });
    
    return data;
}

export const deleteW2WOrder = async (id) => {

    const data = await Axios.delete(`${url}/api/w2worder/${id}`, config).then((response) => {
        return response.data;
    });
    
    return data;
}

// get all w2w orders by warehouse id
export const getW2WOrderByWarehouseId = async (id) => {
    const data = await Axios.get(`${url}/api/warehouse/${id}/w2worder`, config).then((response) => {
        return response.data;
    });

    return data;
};