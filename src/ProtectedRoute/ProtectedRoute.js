import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      toast.error('Please login to access this page', {
        position: "top-center", 
      });
      navigate('/login', { replace: true }); 
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return children; 
};

export default ProtectedRoute;