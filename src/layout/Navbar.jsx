import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../layout/Navbar.css";
import api from "../interceptors/axiosInterceptor";
import BASE_URL from "../Config";

const Navbar = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const [showChats, setShowChats] = useState(false);
  const [chats, setChats] = useState([
    { sender: "Alice", message: "Hi, are you available for a quick call?" },
    { sender: "Bob", message: "Let's finalize the report today." },
  ]);

  const navigate = useNavigate();

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowChats(false); // Hide chat if open
  };

  const toggleChats = () => {
    setShowChats(!showChats);
    setShowNotifications(false); // Hide notifications if open
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get(`remainder`);
        console.log(response.data); // verify the data
        setNotifications(response.data); // correct: storing data in state
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotifications();
  }, []);


  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const role = localStorage.getItem("login");
  const handleChat = () => {
    if (role == "student") {
      navigate("/chat/1")
    }
    else {
      navigate("/chatList")
    }
  }
  return (
    <nav className="navbar shadow-lg" style={{ position: "fixed", backgroundColor: "white", color: "black", width: "100%" }}>
      <div className="container-fluid nav-conter">
        <div className="nav-content">
          <div className="nav-bran">
            <img
              src="/img/logo.png"
              alt="Logo"
              height={"90px"}
              width={"140px"}
              style={{ marginTop: "-16px" }}
            />
            <div className="nav-taggle-icon text-white" onClick={toggleSidebar}>
              <a href="#">
                <i className="fa fa-bars" aria-hidden="true" style={{ color: "black" }}></i>
              </a>
            </div>
          </div>

          <div className="nav-main-icon">
            {/* Notification Section */}
            <div className="notification-icon">
              <a
                className="bell-icon"
                href="#"
                style={{ color: "black" }}
                onClick={toggleNotifications}
              >
                <i className="fa-regular fa-bell"></i>
                {notifications.length > 0 && (
                  <span className="notification-badge">{notifications.length}</span>
                )}
              </a>
              {showNotifications && (
                <div className="notification-dropdown" style={{ marginRight: "-50px", marginTop: "20px" }}>
                  <div className="notification-header">
                    <h6>Notifications</h6>
                    <button className="clear-all" onClick={() => setNotifications([])}>
                      Clear All
                    </button>
                  </div>
                  <ul className="notification-list">
                    {notifications.map((item) => (
                      <>

                        <li className="notification-item">
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                              {item.title}
                            </div>
                            <div>
                              <span><strong>Due Date:</strong>  <br/>{item.due_date}</span>
                            </div>
                          </div>
                        </li>

                      </>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Chat Section */}
            <div className="chat-icon-section" style={{ marginBottom: "10px" }}>
              {/* <a
                className="chat-icon"
                href="#"
                style={{ color: "black" }}
                onClick={toggleChats}
              > */}
              <button style={{ backgroundColor: "#fff", color: "#000", height: '10px', width: '', marginBottom: "10px" }}

                onClick={handleChat}
              ><i className="fa-regular fa-message"></i></button>

              {/* {chats.length > 0 && (
                  <span className="chat-badge">{chats.length}</span>
                )}
              </a> */}
              {/* {showChats && (
                <div className="chat-dropdown" style={{ marginRight: "-50px", marginTop: "20px",backgroundColor:"#fff" }}>
                  <div className="notification-header">
                    <h6>Chats</h6>
                    <button className="clear-all" onClick={() => setChats([])}>
                      Clear All
                    </button>
                  </div>
                  <ul className="chat-list">
                    {chats.map((chat, index) => (
                      <li key={index} className="chat-item"  >
                       <button style={{color:'#000' , backgroundColor:'#fff'}} onClick={()=>{navigate("/chat")}}><strong>{chat.sender}</strong>: {chat.message}</button> 
                      </li>
                    ))}
                  </ul>
                </div>
              )} */}
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown profile-elemen">
              <div
                className="me-2 fw-bold p-1 rounded-4 profile d-flex align-items-center"
                style={{ cursor: "pointer" }}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="profile-element">
                  <div className="avatar online">
                    <i className="fa-solid user-icon fa-circle-user" style={{ color: "black" }}></i>
                    <span className="text-dark ms-2"></span>
                  </div>
                </div>
              </div>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                <li><Link className="dropdown-item" to="/change-password">Change Password</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
