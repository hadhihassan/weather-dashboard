import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { loadFullWeather } from "../redux/slices/weatherSlice";
import { toast } from "sonner";

const SearchBar: React.FC = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.weather);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!city.trim()) return;

    const normalizedCity = city.trim().toLowerCase();

    dispatch(loadFullWeather(normalizedCity))
      .unwrap()
      .then(() => {
        toast.success(`Weather for ${normalizedCity} loaded`);
      })
    setCity("");
  };

  return (
    <div className="flex justify-center mb-8">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md bg-white shadow-lg rounded-2xl overflow-hidden"
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-medium transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
