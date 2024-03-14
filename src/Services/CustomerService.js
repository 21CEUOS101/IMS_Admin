/*
 * @file CustomerService.js
 * @author Ashish H. Prajapati (prajapatiashish40567@gmail.com)
 * @brief Service file to handle all the customer related services
 *
 * @details This file is the service file to handle all the customer related services. It includes all the services related to the customer.
 *          It includes services to get customer by id, get all customers, create customer, update customer and delete customer. 
 *
 * @version 0.1
 * @date 14th March 2024
 *
 * @history 14th March 2021 Finalized the file for version 0.1
 */

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