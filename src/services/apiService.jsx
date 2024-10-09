import axios from 'axios';
import { setToken } from '../utils/tokenUtils';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
        if (response.data.token) {
            setToken(response.data.token);
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const register = async (userData) => {
    try {
        const formData = new FormData();
        
        // Ajouter chaque champ au FormData
        Object.keys(userData).forEach(key => {
            if (key === 'photo' && userData[key] instanceof File) {
                formData.append('photo', userData[key]);
            } else if (userData[key] !== undefined && userData[key] !== '') {
                formData.append(key, userData[key]);
            }
        });

        const response = await axios.post(`${API_BASE_URL}/users/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        if (response.data.token) {
            setToken(response.data.token);
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};