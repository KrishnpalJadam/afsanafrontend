 import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../Config";
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaLock } from "react-icons/fa";
import { IoChevronBackCircleSharp } from "react-icons/io5";
const Login = ({ setLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}auth/login`, formData);
      const { token, user } = response.data;
      const role = user.role;

      if (role && token) {
        setLogin(role);
        localStorage.setItem("login", role);
        localStorage.setItem("authToken", token);
        console.log(user);
        localStorage.setItem("user_id",user.id);

        Swal.fire({
          title: 'Success!',
          text: 'You have logged in successfully.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });

        setTimeout(() => {
          if (role === "admin") {
            navigate("/dashboard");
          } else if (role === "student") {
            navigate("/UniversityCards");
          } else if (role === "counselor") {
            navigate("/councelor");
          }
        }, 300);
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main style={{
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#b4ccf0",
      alignItems: "center",
      justifyContent: "center",
     
    }}>
      <div style={{
        backgroundColor: "#fff",
        width: "90%",
        maxWidth: "1000px",
        display: "flex",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
      }}>
        {/* Left Image Section */}
        <div style={{
          flex: 1,
          backgroundColor: "#eef3fc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px"
        }}>
          <img
            src="https://abcschool.institute.org.in/assets/images/student-login-2.svg"
            alt="Student"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        {/* Right Form Section */}
        <div style={{
          flex: 1,
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
         
          <h2 style={{ color: "#1d4ed8", marginBottom: "10px" }}>Student Recruitment</h2>
          <p style={{ marginBottom: "20px", color: "#555" }}>Enter your details to login to your account</p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "15px", position: "relative" }}>
              <FaUser style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#888"
              }} />
              <input
                type="email"
                name="email"
                placeholder="Enter your username/email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 10px 10px 40px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  outline: "none"
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "20px", position: "relative" }}>
              <FaLock style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#888"
              }} />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 10px 10px 40px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  outline: "none"
                }}
                required
              />
            </div>

            <button type="submit" style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "#1d4ed8",
              color: "#fff",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer"
            }}>
              Login In
            </button>
          </form>

          <div style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "14px",
            color: "#666"
          }}>
           
         
            {/* <p style={{ marginTop: "15px" }}>
              Don’t have an account? <a href="#" style={{ color: "#1d4ed8" }}>Sign up Now</a>
            </p> */}
            <Link to="/"  style={{
              width: "35%",
              padding: "8px",
              borderRadius: "8px",
              backgroundColor: "#1d4ed8",
              color: "#fff",
              border: "none",
          
              cursor: "pointer"
            }}> 
        <IoChevronBackCircleSharp /> Back To Home
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer />
    </main>
  );
};

export default Login;
