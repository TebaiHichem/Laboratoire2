import axios from 'axios';

const AUTH_URL = 'http://localhost:5003/auth';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${AUTH_URL}/login`, { email, password });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return { token, user };
    } catch (error) {
        throw error.response.data;
    }
};

export const register = async (email, password) => {
    try {
        const response = await axios.post(`${AUTH_URL}/register`, { email, password });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return { token, user };
    } catch (error) {
        throw error.response.data;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getToken = () => localStorage.getItem('token');

export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => !!getToken();
