import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../Config";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}auth/forgotPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.success || data.message) {
        alert(data.message || 'Reset link sent successfully!');
      } else {
        alert('Reset link sent (no message from server)');
      }
    } catch (error) {
      alert('Error sending reset link. Please try again.');
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" ,borderRadius: "12px"}}>
        <h4 className="text-center mb-4 fw-bold">Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Send Reset Link
            </button>
            <button
              type="button"
              className="btn btn-link text-center"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
