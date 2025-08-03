import axios from 'axios';
import { store } from '../store';
import { setAccessToken, logout } from '../features/auth/authSlice';

const BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Important for cookies
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add authorization header to all requests if token exists
axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const accessToken = state.auth.accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle refresh token on 401 errors
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
     console.log("ye kuch chala");
     
        // If error is 401 and we haven't tried to refresh token yet
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

                // Attempt to refresh the token
                console.log("got 401");
                
                const response = await axios.post(
                    `${BASE_URL}/user/refreshAccessToken`,
                    {},
                    { withCredentials: true }
                );

                const { accessToken } = response.data.data;

                // Update Redux state with new token
                store.dispatch(setAccessToken(accessToken));

                // Retry the original request with new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            // } catch (refreshError) {
            //     // If refresh token fails, logout user
            //     store.dispatch(logout());
            //     return Promise.reject(refreshError);
            // }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
