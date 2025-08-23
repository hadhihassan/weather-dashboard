import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { WeatherData, ForecastData } from "../../types/weather";
import type { ApiErrorResponse } from "./authSlice";
import { fetchAddedFullWeathers, fetchFullWeather } from "../../services/api";
import { AxiosError } from "axios";

interface WeatherState {
    currentWeather: Record<string, WeatherData>;
    forecasts: Record<string, ForecastData>;
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    currentWeather: {},
    forecasts: {},
    loading: false,
    error: null,
};

export const loadFullWeather = createAsyncThunk(
    "weather/loadFullWeather",
    async (city: string, { rejectWithValue }) => {
        try {
            const { currentWeather, forecast } = await fetchFullWeather(city);
            return { currentWeather, forecast };
        } catch (err) {
            const error = err as AxiosError<ApiErrorResponse>;
            return rejectWithValue(error.response?.data?.message || "Failed to fetch weather");
        }
    }
);

export const loadAddedFullWeathers = createAsyncThunk(
    "weather/loadAddedFullWeathers",
    async (_, { rejectWithValue }) => {
        try {
            return await fetchAddedFullWeathers();
        } catch (err) {
            const error = err as AxiosError<ApiErrorResponse>;
            return rejectWithValue(error.response?.data?.message || "Failed to fetch added weathers");
        }
    }
);

export const removeFavoriteCity = createAsyncThunk(
    'auth/removeFavoriteCity',
    async (city: string, { rejectWithValue }) => {
        try {
            const data = removeCity(city); // Call the API to remove the city
            return data;
        } catch (error) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            return rejectWithValue(axiosError.response?.data?.message || 'Failed to remove favorite city');
        }
    }
);

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        removeCity: (state, action: PayloadAction<string>) => {
            const city = action.payload.toLowerCase();
            delete state.currentWeather[city];
            delete state.forecasts[city];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFullWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadFullWeather.fulfilled, (state, action) => {
                state.loading = false;
                const { currentWeather, forecast } = action.payload;

                const normalizedCity = currentWeather.city.toLowerCase();
                state.currentWeather[normalizedCity] = currentWeather;
                state.forecasts[normalizedCity] = forecast;
            })
            .addCase(loadFullWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(loadAddedFullWeathers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadAddedFullWeathers.fulfilled, (state, action) => {
                state.loading = false;
                action.payload.forEach(
                    (entry: { currentWeather: WeatherData; forecast: ForecastData }) => {
                        const normalizedCity = entry.currentWeather.city.toLowerCase();
                        state.currentWeather[normalizedCity] = entry.currentWeather;
                        state.forecasts[normalizedCity] = entry.forecast;
                    }
                );
            })
            .addCase(loadAddedFullWeathers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError, removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
