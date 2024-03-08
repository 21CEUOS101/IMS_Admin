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

export const getSupplierById = async (id) => {

    const data = await Axios.get(`${url}/api/supplier/${id}`, config).then((response) => {
        return response.data;
    });
    
    return {...data, role : "supplier"};
}

export const getSuppliers = async () => {
        
    const data = await Axios.get(`${url}/api/supplier`, config).then((response) => {
        console.log(response);
        return response.data;
    });
    
    return data;
}

export const createSupplier = async (supplier) => {
        
    try {
        const data = await Axios.post(`${url}/api/supplier`, supplier, config).then((response) => {
            return response.data;
        });
        
        return {...data, role : "supplier" , success : true};
    }
    catch (error) {
        return {...error.response.data, success : false};
    }
}

export const updateSupplier = async (supplier , id) => {
            
    try {
        const data = await Axios.post(`${url}/api/supplier/${id}`, supplier, config).then((response) => {
            return response.data;
        });
        
        return { ...data, role: "supplier", success: true };
    }
    catch (error) {
        return { ...error.response.data, success: false };
    }
}

export const deleteSupplier = async (id) => {

    try {
        const data = await Axios.delete(`${url}/api/supplier/${id}`, config).then((response) => {
            return response.data;
        });
        
        return { ...data, success: true};
    }
    catch (error) {
        return { ...error.response.data, success: false };
    }
}