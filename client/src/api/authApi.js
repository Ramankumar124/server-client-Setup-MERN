import axiosInstance from './axiosInstance';

export const authApi = {
    login: async (credentials) => {
        const response = await axiosInstance.post('/user/login', credentials);
        return response.data;
    },

    register: async (userData) => {
        const response = await axiosInstance.post('/user/register', userData);
        return response.data;
    },

    logout: async () => {
        await axiosInstance.post('/user/logout');
    },

    refreshToken: async () => {
        const response = await axiosInstance.post('/user/refreshAccesstoken');
        return response.data.data;
    },

    getUserProfile: async () => {
        const response = await axiosInstance.get('/user/profile');
        return response.data.data;
    },
};

export default authApi;
