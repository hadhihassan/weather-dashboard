import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '../../config/axios';
import { removeCity } from '../../services/api';

interface User {
    id: string;
    username: string;
    email: string;
    favoriteCities: string[];
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export interface ApiErrorResponse {
    message?: string;
}


const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/auth/login', credentials);
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            return user;
        } catch (error) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            return rejectWithValue(axiosError?.response?.data?.message || 'Login failed');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (userData: { username: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/auth/register', userData);
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            return user;
        } catch (error) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            return rejectWithValue(axiosError.response?.data?.message || 'Registration failed');
        }
    }
);

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('No token found');
            }

            const response = await axios.get('/user/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            return rejectWithValue(axiosError.response?.data?.message || 'Authentication failed');
        }
    }
);

export const addFavoriteCity = createAsyncThunk(
    'auth/addFavoriteCity',
    async (city: string, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/user/favorites',
                { city },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data.favoriteCities;
        } catch (error) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            return rejectWithValue(axiosError.response?.data?.message || 'Failed to add favorite city');
        }
    }
);

export const removeFavoriteCity = createAsyncThunk(
    'auth/removeFavoriteCity',
    async (city: string, { rejectWithValue }) => {
        try {
            const response = await removeCity(city);
            return response.favoriteCities;
        } catch (error) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            return rejectWithValue(axiosError.response?.data?.message || 'Failed to remove favorite city');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Check Auth
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload as string;
            })
            // Add Favorite City
            .addCase(addFavoriteCity.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.favoriteCities = action.payload;
                }
            })
            // Remove Favorite City
            .addCase(removeFavoriteCity.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.favoriteCities = action.payload;
                }
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;