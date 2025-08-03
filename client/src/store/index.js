import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types for serializability checks
                ignoredActions: ['auth/login/fulfilled', 'auth/register/fulfilled'],
            },
        }),
});

export default store;
