import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  MessageCircle,
  UserCircle,
  LogOut,
  ChevronDown
} from "lucide-react";
import api from "../interceptors/axiosInterceptor";
import "../layout/Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userName, setUserName] = useState("User");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);


const loginDetail = JSON.parse(localStorage.getItem("login_detail"));

const loginName  = loginDetail?.full_name;



  useEffect(() => {
    const seen = sessionStorage.getItem("notificationsSeen");
    if (!seen) {
      fetchNotifications();
      sessionStorage.setItem("notificationsSeen", "true");
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get(`remainder`);
      setNotifications(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  const handleChat = () => {
    navigate("/chatList");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  return (
    <nav className="navbar  bg-white fixed-top w-100 z-50">
      <div className="container-fluid d-flex justify-content-between align-items-center px-3 py-2">
        {/* Logo + Sidebar Toggle */}
        <div className="d-flex align-items-center gap-3" style={{marginTop: "-20px"}}>
          <img src="/img/logo.png" alt="Logo" height={100} />
          <button
            className="btn btn-light border"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        </div>

        {/* Right Icons */}
        <div className="d-flex align-items-center gap-4" style={{marginTop: "-20px"}} ref={dropdownRef}>
          {/* Notifications */}
          <div className="position-relative">
            <Bell
              size={22}
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ cursor: "pointer" }}
            />
            {notifications.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {notifications.length}
              </span>
            )}
            {showNotifications && (
              <div
                className="bg-white shadow p-3 rounded position-absolute"
                style={{ right: 0, top: "120%", width: "300px", zIndex: 1000 }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong>Notifications</strong>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setNotifications([])}
                  >
                    Clear All
                  </button>
                </div>
                <ul className="list-unstyled mb-0" style={{ maxHeight: "200px", overflowY: "auto" }}>
                  {notifications.length > 0 ? (
                    notifications.map((item, index) => (
                      <li key={index} className="border-bottom py-2">
                        <div><strong>{item.title}</strong></div>
                        <small className="text-muted">Due: {item.due_date}</small>
                      </li>
                    ))
                  ) : (
                    <li className="text-muted text-center py-2">No notifications</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Chat Icon */}
          <MessageCircle size={22} style={{ cursor: "pointer" }} onClick={handleChat} />

          {/* Profile Dropdown */}
          <div className="dropdown">
            <div
              className="d-flex align-items-center gap-2"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <UserCircle size={26} />
              <span className="fw-semibold loginName">{loginName}</span>
              <ChevronDown size={16} />
            </div>
            <ul className="dropdown-menu dropdown-menu-end mt-2 shadow-sm">
              <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
              <li><Link className="dropdown-item" to="/change-password">Change Password</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item text-danger d-flex align-items-center gap-2" onClick={logout}>
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
