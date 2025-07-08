import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaLock } from "react-icons/fa";
import api from "../interceptors/axiosInterceptor";
import { IoChevronBackCircleSharp } from "react-icons/io5";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        role: "student",
      };

      const response = await api.post("auth/createStudent", payload); // Adjust endpoint if needed

      toast.success("Signup successful! You can now login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error?.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#b4ccf0",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          width: "90%",
          maxWidth: "900px",
          display: "flex",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        }}
      >
        {/* Left Image Section */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#eef3fc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <img
            src="https://abcschool.institute.org.in/assets/images/student-login-2.svg"
            alt="Signup Illustration"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        {/* Right Form Section */}
        <div
          style={{
            flex: 1,
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2 style={{ color: "#1d4ed8", marginBottom: "20px" }}>
            Student Register
          </h2>

          <form onSubmit={handleSignup}>
            {/* Full Name */}
            <div style={{ marginBottom: "15px", position: "relative" }}>
              <FaUser
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#888",
                }}
              />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 10px 10px 40px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  outline: "none",
                }}
                required
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "15px", position: "relative" }}>
              <FaUser
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#888",
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 10px 10px 40px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  outline: "none",
                }}
                required
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "25px", position: "relative" }}>
              <FaLock
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#888",
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 10px 10px 40px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  outline: "none",
                }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#1d4ed8",
                color: "#fff",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </form>

          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontSize: "14px",
              color: "#666",
             
            }}
          >
            <Link
              to="/login"
              style={{
                color: "#1d4ed8",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Already have an account? Log in
            </Link>
           <div className="mt-4">
             <Link to="/" style={{
                          width: "35%",
                          padding: "8px",
                          borderRadius: "8px",
                          backgroundColor: "#1d4ed8",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer"
                        }}>
                          <IoChevronBackCircleSharp />  Back To Home
                        </Link>
           </div>
          </div>

          <ToastContainer />
        </div>
        
      </div>
    </main>
  );
};

export default Signup;







// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { FaUser, FaLock } from "react-icons/fa";
// import api from "../interceptors/axiosInterceptor";
// import { IoChevronBackCircleSharp } from "react-icons/io5";
// import { auth, provider, signInWithPopup } from "../interceptors/firebase.js";
// import axios from "axios";
// import BASE_URL from "../Config.js";
// const Signup = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };




//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const token = await result.user.getIdToken(); // Firebase token

//       // Call your backend Google login API
//       const response = await axios.post(`${BASE_URL}auth/student/google-signup`, { token });

//       const { token: authToken, user } = response.data;

//       if (user.role !== "student") {
//         toast.error("Only students are allowed to login from Google!");
//         return;
//       }

//       // Save user info in localStorage
//       setLogin(user.role);
//       localStorage.setItem("login", user.role);
//       localStorage.setItem("role", user.role);
//       localStorage.setItem("authToken", authToken);
//       localStorage.setItem("user_id", user.id);
//       localStorage.setItem("login_detail", JSON.stringify(user));
//       localStorage.setItem("counselor_id", user.counselor_id);
//       localStorage.setItem("student_id", user.student_id);

//       // Fetch permissions
//       const permissionsResponse = await api.get(`permission?role_name=${user.role}`);
//       const userpermissionsResponse = await api.get(`permissions?user_id=${user.id}`);
//       localStorage.setItem("permissions", JSON.stringify(permissionsResponse.data));
//       localStorage.setItem("userpermissions", JSON.stringify(userpermissionsResponse.data));

//       // Show success alert
//       Swal.fire({
//         title: "Success!",
//         text: "Google login successful for Student Portal.",
//         icon: "success",
//         confirmButtonText: "Ok",
//       });

//       // Redirect to Student dashboard
//       setTimeout(() => {
//         navigate("/UniversityCards");
//       }, 300);

//     } catch (error) {
//       console.error("Google Sign-in error:", error);
//       toast.error("Google login failed. Try again.");
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (!formData.fullName || !formData.email || !formData.password) {
//       toast.error("Please fill in all fields.");
//       return;
//     }

//     try {
//       const payload = {
//         email: formData.email,
//         password: formData.password,
//         full_name: formData.fullName,
//         role: "student",
//       };

//       const response = await api.post("auth/createStudent", payload); // Adjust endpoint if needed

//       toast.success("Signup successful! You can now login.");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (error) {
//       console.error("Signup error:", error);
//       toast.error(error?.response?.data?.message || "Signup failed. Please try again.");
//     }
//   };

//   return (
//     <main
//       style={{
//         display: "flex",
//         minHeight: "100vh",
//         backgroundColor: "#b4ccf0",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "20px",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "#fff",
//           width: "90%",
//           maxWidth: "900px",
//           display: "flex",
//           borderRadius: "20px",
//           overflow: "hidden",
//           boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
//         }}
//       >
//         {/* Left Image Section */}
//         <div
//           style={{
//             flex: 1,
//             backgroundColor: "#eef3fc",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: "40px",
//           }}
//         >
//           <img
//             src="https://abcschool.institute.org.in/assets/images/student-login-2.svg"
//             alt="Signup Illustration"
//             style={{ maxWidth: "100%", height: "auto" }}
//           />
//         </div>

//         {/* Right Form Section */}
//         <div
//           style={{
//             flex: 1,
//             padding: "40px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//           }}
//         >
//           <h2 style={{ color: "#1d4ed8", marginBottom: "20px" }}>
//             Student Register
//           </h2>
//           {/* Google Button */}
//           <button
//             onClick={handleGoogleLogin}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: "10px",
//               backgroundColor: "#fff",
//               color: "#444",
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//               padding: "10px",
//               width: "100%",
//               fontWeight: "500",
//               fontSize: "15px",
//               cursor: "pointer",
//               transition: "background 0.3s"
//             }}
//             onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f7f7f7"}
//             onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#fff"}
//           >
//             {/* Google Icon */}
//             <img
//               src="https://developers.google.com/identity/images/g-logo.png"
//               alt="Google"
//               style={{ width: "20px", height: "20px" }}
//             />
//             Continue with Google
//           </button>
//           <div style={{
//             display: "flex",
//             alignItems: "center",
//             margin: "20px 0"
//           }}>
//             <hr style={{ flex: 1, border: "none", height: "1px", backgroundColor: "#ccc" }} />
//             <span style={{ margin: "0 10px", color: "#888", fontSize: "14px" }}>or continue with</span>
//             <hr style={{ flex: 1, border: "none", height: "1px", backgroundColor: "#ccc" }} />
//           </div>
//           <form onSubmit={handleSignup}>
//             {/* Full Name */}
//             <div style={{ marginBottom: "15px", position: "relative" }}>
//               <FaUser
//                 style={{
//                   position: "absolute",
//                   left: "12px",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   color: "#888",
//                 }}
//               />
//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="Full Name"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 style={{
//                   width: "100%",
//                   padding: "10px 10px 10px 40px",
//                   borderRadius: "8px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div style={{ marginBottom: "15px", position: "relative" }}>
//               <FaUser
//                 style={{
//                   position: "absolute",
//                   left: "12px",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   color: "#888",
//                 }}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 style={{
//                   width: "100%",
//                   padding: "10px 10px 10px 40px",
//                   borderRadius: "8px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div style={{ marginBottom: "25px", position: "relative" }}>
//               <FaLock
//                 style={{
//                   position: "absolute",
//                   left: "12px",
//                   top: "50%",
//                   transform: "translateY(-50%)",
//                   color: "#888",
//                 }}
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 style={{
//                   width: "100%",
//                   padding: "10px 10px 10px 40px",
//                   borderRadius: "8px",
//                   border: "1px solid #ccc",
//                   outline: "none",
//                 }}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 borderRadius: "8px",
//                 backgroundColor: "#1d4ed8",
//                 color: "#fff",
//                 border: "none",
//                 fontWeight: "bold",
//                 cursor: "pointer",
//               }}
//             >
//               Sign Up
//             </button>
//           </form>

//           <div
//             style={{
//               marginTop: "20px",
//               textAlign: "center",
//               fontSize: "14px",
//               color: "#666",

//             }}
//           >
//             <Link
//               to="/login"
//               style={{
//                 color: "#1d4ed8",
//                 textDecoration: "none",
//                 fontWeight: "bold",
//               }}
//             >
//               Already have an account? Log in
//             </Link>
//             <div className="mt-4">
//               <Link to="/" style={{
//                 width: "35%",
//                 padding: "8px",
//                 borderRadius: "8px",
//                 backgroundColor: "#1d4ed8",
//                 color: "#fff",
//                 border: "none",
//                 cursor: "pointer"
//               }}>
//                 <IoChevronBackCircleSharp />  Back To Home
//               </Link>
//             </div>
//           </div>

//           <ToastContainer />
//         </div>

//       </div>
//     </main>
//   );
// };

// export default Signup;

