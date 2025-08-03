import { useDispatch, useSelector } from 'react-redux';
import {
    loginUser as login,
    registerUser as register,
    logoutUser,
    fetchUserProfile,
    clearError
} from '../features/auth/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();

    // Selectors
    const user = useSelector(state => state.auth.user);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);

    // Login function
    const loginUser = async (credentials) => {
        const success = await dispatch(login(credentials));
        return success;
    };

    // Register function
    const registerUser = async (userData) => {
        const success = await dispatch(register(userData));
        return success;
    };

    // Logout function
    const logout = async () => {
        await dispatch(logoutUser());
    };

    // Get user profile
    const getUserProfile = async () => {
        await dispatch(fetchUserProfile());
    };

    // Reset error
    const resetError = () => {
        dispatch(clearError());
    };

    return {
        user,
        isAuthenticated,
        loading,
        error,
        loginUser,
        registerUser,
        logout,
        getUserProfile,
        resetError,
    };
};

export default useAuth;
