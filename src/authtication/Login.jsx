// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaUserShield, FaUserTie, FaUserGraduate } from "react-icons/fa";

// const Login = ({
//   login,
//   setLogin,
//   handleAdmin,
//   handleStudent,
//   handleCounselor,
// }) => {
//   const [showSignUp, setShowSignUp] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const toggleForm = () => {
//     setShowSignUp(!showSignUp);
//   };

//   const handleRoleSelect = (role) => {
//     let userEmail = "";
//     let userPassword = "";

//     if (role === "admin") {
//       userEmail = "admin@example.com";
//       userPassword = "admin123";
//     } else if (role === "student") {
//       userEmail = "student@example.com";
//       userPassword = "student123";
//     } else if (role === "counselor") {
//       userEmail = "counselor@example.com";
//       userPassword = "counselor123";
//     }

//     setEmail(userEmail);
//     setPassword(userPassword);

//     localStorage.setItem("login", role);
//     setLogin(role);

//     console.log("Login state updated:", role);
//     console.log("LocalStorage updated:", localStorage.getItem("login"));

//     // Delay navigation to ensure state updates
//     setTimeout(() => {
//       navigate(
//         role === "admin"
//           ? "/dashboard"
//           : role === "student"
//           ? "/UniversityCards"
//           : "/councelor"
//       );
//     }, 300);
//   };

//   const handleLogin = (e) => {
//     e.preventDefault(); // Prevent form submission

//     if (!email || !password) {
//       alert("Please enter email and password.");
//       return;
//     }

//     let role = "";
//     if (email === "admin@example.com" && password === "admin123") {
//       role = "admin";
//     } else if (email === "student@example.com" && password === "student123") {
//       role = "student";
//     } else if (
//       email === "counselor@example.com" &&
//       password === "counselor123"
//     ) {
//       role = "counselor";
//     } else {
//       alert("Invalid credentials!");
//       return;
//     }

//     setLogin(role);
//     localStorage.setItem("login", role);

//     console.log("Login state updated:", role);
//     console.log("LocalStorage updated:", localStorage.getItem("login"));

//     setTimeout(() => {
//       navigate(
//         role === "admin"
//           ? "/dashboard"
//           : role === "student"
//           ? "/UniversityCards"
//           : "/counselor"
//       );
//     }, 300);
//   };

//   return (
//     <main className="login-main">
//       <div className="login-container">
//         <h1 className="fw-bold text-center mb-4">STUDENT RECRUITMENT</h1>
//         {/* <h4 className="text-center mb-4">
//           {showSignUp ? "Sign Up" : "Welcome!"}
//         </h4> */}

//         {!showSignUp ? (
//           // Login Form
//           <form onSubmit={handleLogin}>
//             <div className="mb-3">
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Email Address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100">
//               Login
//             </button>
//           </form>
//         ) : (
//           // Signup Form
//           <form>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Full Name"
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Email Address"
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="Create Password"
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="Confirm Password"
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-success w-100">
//               Sign Up
//             </button>
//           </form>
//         )}

//         {/* Role Selection */}
//         <div className="mt-4 text-center">
//           <h6>Select Role:</h6>
//           <div className="buttons d-flex justify-content-center gap-3 flex-wrap">
//             <button
//               className="btn btn-outline-primary"
//               onClick={() => handleRoleSelect("admin")}
//             >
//               <FaUserShield size={20} className="me-2" /> Admin
//             </button>
//             <button
//               className="btn btn-outline-success"
//               onClick={() => handleRoleSelect("student")}
//             >
//               <FaUserGraduate size={20} className="me-2" /> Student
//             </button>
//             <button
//               className="btn btn-outline-warning"
//               onClick={() => handleRoleSelect("counselor")}
//             >
//               <FaUserTie size={20} className="me-2" /> Counselor
//             </button>
//           </div>
//         </div>

//         {/* Toggle between Login & Signup */}
//         <div className="mt-4 text-center">
//           <p>
//             {showSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
//             <span
//               className="text-primary cursor-pointer"
//               onClick={toggleForm}
//               style={{ cursor: "pointer" }}
//             >
//               {showSignUp ? "Login" : "Sign Up"}
//             </span>
//           </p>
//         </div>

   
//       </div>
//     </main>
//   );
// };

// export default Login;






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
            navigate("/counselor");
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
