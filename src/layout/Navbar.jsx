import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import "../layout/Navbar.css"

const Navbar = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false); // State to manage notification dropdown visibility
  const [notifications, setNotifications] = useState([
    "New message from John",
    "Your application has been approved",
    "Reminder: Meeting at 3 PM",
  ]); // Sample notifications

  const navigate = useNavigate();
  // Toggle notification dropdown
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  const logout = () => {
      localStorage.clear()    
    navigate("/"); // This should redirect
  };
  return (
    <>
      <nav
        className="navbar shadow-lg"
        style={{
          position: "fixed",
          backgroundColor: "white",
          color: "black",
          width: "100%",
        }}
      >
        <div className="container-fluid nav-conter" >
          <div className="nav-content">
            <div className="nav-bran">
              <img
                src="/img/logo.png"
                alt="Logo"
                height={"90px"}
                width={"140px"}
                style={{ marginTop: "-16px" }}
              />
              <div
                className="nav-taggle-icon text-white"
                onClick={toggleSidebar}
              >
                <a href="#">
                  <i
                    className="fa fa-bars"
                    aria-hidden="true"
                    style={{ color: "black" }}
                  ></i>
                </a>
              </div>
            </div>
            <div className="nav-main-icon ">
              {/* Notification Bell Icon */}
              <div className="notification-icon">
                <a
                  className="bell-icon"
                  href="#"
                  style={{ color: "black" }}
                  onClick={toggleNotifications}
                >
                  <i className="fa-regular fa-bell"></i>
                  {notifications.length > 0 && (
                    <span className="notification-badge">
                      {notifications.length}
                    </span>
                  )}
                </a>
                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="notification-dropdown" style={{ marginRight: "-50px", marginTop: "20px" }}>
                    <div className="notification-header">
                      <h6>Notifications</h6>
                      <button
                        className="clear-all"
                        onClick={() => setNotifications([])}
                      >
                        Clear All
                      </button>
                    </div>
                    <ul className="notification-list">
                      {notifications.map((notification, index) => (
                        <li key={index} className="notification-item">
                          {notification}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
                      <i
                        className="fa-solid user-icon fa-circle-user"
                        style={{ color: "black" }}
                      ></i>
                      <span className="text-dark ms-2"></span>
                    </div>
                  </div>
                </div>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                     Profile
                    </Link>
                  </li>
               
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <li>
                      <button className="dropdown-item" onClick={logout}>
                        Logout
                      </button>
                    </li>

                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;