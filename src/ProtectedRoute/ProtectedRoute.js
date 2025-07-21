import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../Config';


const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        handleLogout();
        return;
      }
      try {
        const res = await fetch(`${BASE_URL}auth/validate-token`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (!data.valid) {
          handleLogout();
        } else {
          setLoading(false);
        }
      } catch (error) {
        handleLogout();
      }
    };

    validateToken();

    const handleStorageChange = (event) => {
      if (event.key === 'authToken' && !event.newValue) {
        navigate('/login', { replace: true });
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem('authEvent', Date.now()); // Cross-tab logout sync
    toast.error('Session expired. Please login again.', { position: "top-center" });
    navigate('/login', { replace: true });
  };

  if (loading) return null; // or a spinner

  return children;
};

export default ProtectedRoute;
