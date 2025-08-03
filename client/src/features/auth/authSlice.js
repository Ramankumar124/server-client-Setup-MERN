import { createSlice } from '@reduxjs/toolkit';
import authApi from '../../api/authApi';

// Initial state
const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

// Simple auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Set loading state
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // Set authenticated user
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        // Set error message
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Update access token
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },

        // Clear error
        clearError: (state) => {
            state.error = null;
        },

        // Logout
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
        },
    },
});

// Export actions
export const {
    setLoading,
    setUser,
    setError,
    setAccessToken,
    clearError,
    logout
} = authSlice.actions;

// Thunks - Simple action creators with authApi
export const loginUser = (credentials) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        const response = await authApi.login(credentials);

        dispatch(setUser(response.data));
        return true;
    } catch (error) {
        dispatch(setError(error.response?.data?.message || 'Login failed'));
        return false;
    }
};

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        const response = await authApi.register(userData);

        dispatch(setUser(response.data));
        return true;
    } catch (error) {
        dispatch(setError(error.response?.data?.message || 'Registration failed'));
        return false;
    }
};

export const fetchUserProfile = () => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));

        const { accessToken } = getState().auth;
        const userData = await authApi.getUserProfile();

        dispatch(setUser({ user: userData, accessToken }));
    } catch (error) {
        dispatch(logout());
    }
};

export const refreshToken = () => async (dispatch) => {
    try {
        const data = await authApi.refreshToken();

        dispatch(setAccessToken(data.accessToken));
        return true;
    } catch (error) {
        dispatch(logout());
        return false;
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        await authApi.logout();
    } finally {
        dispatch(logout());
    }
};

export default authSlice.reducer;
