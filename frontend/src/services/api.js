import axios from 'axios';
import { getToken } from './auth';

const API_URL = 'http://localhost:5001';

const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${getToken()}` }
});

// Profils
export const getMyProfile = async () => {
    try {
        const verifyRes = await axios.get('http://localhost:5003/auth/verify', getAuthHeaders());
        const { userId } = verifyRes.data;
        const response = await axios.get(`${API_URL}/profiles/me`, {
            params: { userId },
            ...getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        return { profile: null };
    }
};

export const createProfile = async (fullName, imageUrl) => {
    try {
        const response = await axios.post(
            `${API_URL}/profiles`,
            { FullName: fullName, ImageUrl: imageUrl },
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateProfile = async (fullName, imageUrl) => {
    try {
        const response = await axios.put(
            `${API_URL}/profiles/me`,
            { fullName, imageUrl },
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const searchProfiles = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/profiles`, {
            params: { q: query },
            ...getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        return { results: [] };
    }
};

// Connexions
export const getConnections = async (status) => {
    try {
        const response = await axios.get(`${API_URL}/connections`, {
            params: { status },
            ...getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        return { results: [] };
    }
};

export const sendConnectionRequest = async (receiverId) => {
    try {
        const response = await axios.post(
            `${API_URL}/connections`,
            { receiverId },
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const respondToConnection = async (connectionId, status) => {
    try {
        const response = await axios.put(
            `${API_URL}/connections/${connectionId}`,
            { status },
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
