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

export const getWarehouseById = async (id) => {
    
        const data = await Axios.get(`${url}/api/warehouse/${id}`, config).then((response) => {
            return response.data;
        });
        
        return data;
}
    
export const getWarehouses = async () => {
    
        const data = await Axios.get(`${url}/api/warehouse`, config).then((response) => {
            return response.data;
        });
        
        return data;
}

export const createWarehouse = async (warehouse) => {
    
        const data = await Axios.post(`${url}/api/warehouse`, warehouse, config).then((response) => {
            return response.data;
        });
        
        return data;
}

export const updateWarehouse = async (warehouse , id) => {
    
        const data = await Axios.post(`${url}/api/warehouse/${id}`, warehouse, config).then((response) => {
            return response.data;
        });
        
        return data;
}

export const deleteWarehouse = async (id) => {

        const data = await Axios.delete(`${url}/api/warehouse/${id}`, config).then((response) => {
            return response.data;
        });
        
        return data;
}
