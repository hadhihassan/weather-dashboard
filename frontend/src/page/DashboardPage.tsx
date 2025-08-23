// src/pages/DashboardPage.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { checkAuth } from "../redux/slices/authSlice";
import { loadAddedFullWeathers } from "../redux/slices/weatherSlice";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import WeatherGrid from "../components/WeatherGrid";
import ForecastList from "../components/ForecastList";
import ErrorAlert from "../components/ErrorAlert";
import { Toaster } from "sonner";

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading: authLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const { currentWeather, forecasts, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadAddedFullWeathers());
    }
  }, [isAuthenticated, dispatch]);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <Toaster position="top-right" richColors /> 
      <div className="container mx-auto px-4 py-8">
        <SearchBar />

        {error && <ErrorAlert message={error} />}

        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        <WeatherGrid weatherData={Object.values(currentWeather)} />

        {Object.values(forecasts).map((forecast) => (
          <ForecastList key={forecast.city} forecast={forecast} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
