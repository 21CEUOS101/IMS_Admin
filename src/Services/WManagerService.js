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

export const getWManagerById = async (id) => {

    const data = await Axios.get(`${url}/api/wmanager/${id}`, config).then((response) => {
        return response.data;
    });
    
    return {...data, role : "wmanager"};
}

export const getWMans = async () => {
        
    const data = await Axios.get(`${url}/api/wmanager`, config).then((response) => {
        return response.data;
    });
    
    return data;
}

export const createWManager = async (wmanager) => {
        
    try {
        const data = await Axios.post(`${url}/api/wmanager`, wmanager, config).then((response) => {
            return response.data;
        });
        
        return {...data, role : "wmanager" , success : true};
    }
    catch (error) {
        return {...error.response.data, success : false};
    }
}

export const updateWManager = async (wmanager , id) => {
            
    try {
        const data = await Axios.post(`${url}/api/wmanager/${id}`, wmanager, config).then((response) => {
            return response.data;
        });
        return {...data, role : "wmanager" , success : true};
    }
    catch (error) {
        return {...error.response.data, success : false};
    }
}

export const deleteWManager = async (id) => {

    try {
        const data = await Axios.delete(`${url}/api/wmanager/${id}`, config).then((response) => {
            return response.data;
        });
        
        return {...data, success : true};
    }
    catch (error) {
        return {...error.response.data, success : false};
    }
}