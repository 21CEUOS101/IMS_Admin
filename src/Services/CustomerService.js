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

export const getCustomerById = async (id) => {
        
    const data = await Axios.get(`${url}/api/customer/${id}`, config).then((response) => {
        return response.data;
    });
    
    return {...data, role : "customer"};
}

export const getCustomers = async () => {
            
    const data = await Axios.get(`${url}/api/customer`, config).then((response) => {
        return response.data;
    });
    
    return data;
}
    
export const createCustomer = async (customer) => {
            
    try {
        const data = await Axios.post(`${url}/api/customer`, customer, config).then((response) => {
            return response.data;
        });
        
        return {...data, role : "customer" , success : true};
    }
    catch (error) {
        return {...error.response.data, success : false};
    }
}

export const updateCustomer = async (customer , id) => {
                
    try {
        const data = await Axios.post(`${url}/api/customer/${id}`, customer, config).then((response) => {
            return response.data;
        });
        
        return {...data, role : "customer" , success : true};
    }
    catch (error) {
        return {...error.response.data, success : false};
    }
}

export const deleteCustomer = async (id) => {

    try {
        const data = await Axios.delete(`${url}/api/customer/${id}`, config).then((response) => {
            return response.data;
        });
        
        return {...data, success : true};
    }
    catch (error) {
        return {...error.response.data, success : false};
    }
}