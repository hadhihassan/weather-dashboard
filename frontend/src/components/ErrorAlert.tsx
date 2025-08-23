import React from 'react';
import { useDispatch } from 'react-redux';
import { clearError } from '../redux/slices/weatherSlice';
import { BiX } from 'react-icons/bi';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearError());
  };

  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative mb-6">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={handleClose}
          className="text-red-700 hover:text-red-900 text-lg font-bold"
        >
          <BiX/>
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;