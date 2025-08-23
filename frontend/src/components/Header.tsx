import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-blue-600 mr-2">🌤️</div>
          <h1 className="text-2xl font-bold text-gray-800">
            Weather Dashboard
          </h1>
        </div>

        <div className="flex items-center">
          <span className="text-gray-600 mr-4">
            Welcome, <span className="underline font-semibold">{user?.username}</span>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
