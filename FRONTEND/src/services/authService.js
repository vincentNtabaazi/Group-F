// src/services/authService.js
import axios from 'axios';
import toast from "react-hot-toast";

const API_URL = `${process.env.REACT_APP_API_URL}/token/`;


const login = async (data) => {

    try {
        const response = await axios.post(API_URL, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status) {
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            toast('Login Successful.', {style: {backgroundColor: 'green', color: 'white'}})
            return response
        }
    } catch (error) {
        toast('Login Not Successful.', {style: {backgroundColor: 'red', color: 'white'}})
        console.error("Login failed:", error.response?.data || error.message);
    }
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
};

const getAccessToken = () => {
    return localStorage.getItem('token');
};

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/token/refresh/`, { refresh: refreshToken });
        localStorage.setItem('token', response.data.access);
        return response.data.access;
    }
    return null;
};

const authService = {
    login,
    logout,
    getAccessToken,
    refreshAccessToken,
}

export default authService;
