import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { FaUsers, FaRegFileAlt } from "react-icons/fa"; // FontAwesome
import { BsFillPersonLinesFill } from "react-icons/bs"; // Bootstrap

const Sidebar = ({ login, collapsed, menuItemClick, toggleSidebar }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null); // Tracks the open submenu
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Updated Login State:", login);
    if (!login) {
      navigate("/login"); // Agar login nahi hai toh login page par bhejo
    }
  }, [login, navigate]);

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu((prev) => (prev === menuName ? null : menuName));
  };

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Function to check if any of the submenu items are active
  const isSubmenuActive = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar">
        <ul className="menu">
          {/* Dashboard Section */}
          {login === "admin" && (
            <li
              className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/dashboard");
                  //  menuItemClick();
                  // toggleSidebar();
                }}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa-solid fa-cubes"
                ></i>
                <span className="menu-text">Dashboard</span>
              </div>
            </li>
          )}
          {login == "counselor" && (
            <li
              className={`menu-item ${isActive("/councelor") ? "active" : ""}`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/councelor");
                  // menuItemClick();
                  // toggleSidebar();
                }}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa-solid fa-cubes"
                ></i>
                <span className="menu-text">Dashboard</span>
              </div>
            </li>
          )}
          {login == "student" && (
            <li
              className={`menu-item ${
                isActive("/studentProfile") ? "active" : ""
              }`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/studentProfile");
                  // menuItemClick();
                  // toggleSidebar();
                }}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa-solid fa-cubes"
                ></i>
                <span className="menu-text">Dashboard</span>
              </div>
            </li>
          )}
          {/* Lead & Inquiry Management */}
          {login == "admin" ? (
            <li
              className={`menu-item ${
                isSubmenuActive([
                  "/LeadInquiryManagement",
                  "/inquiry",
                  "/lead",
                  "/deal",
                  // "/dashboard",
                  "/contract",
                  "/quotes",
                  "/analytics",
                  "/adminstatus",
                ])
                  ? "active"
                  : ""
              }`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => {
                  toggleSubmenu("leadInquiry");
                  // toggleSidebar();
                }}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa-solid fa-file-contract"
                ></i>
                <span className="menu-text">Leads & Inquiries</span>
                <i
                  className={`fa-solid fa-chevron-${
                    openSubmenu === "leadInquiry" ? "up" : "down"
                  } submenu-arrow`}
                ></i>
              </div>

              {openSubmenu === "leadInquiry" && (
                <ul className={`submenu `}>
                  {/* <li
                  className={`menu-item submenu-item ${
                    isActive("/dashboard") ? "active" : ""
                  }`}
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </li> */}
                  {/* <li
                    className={`menu-item submenu-item ${
                      isActive("/contract") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/contract");
                      menuItemClick();
                    }}
                  >
                    Contact
                  </li> */}
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/inquiry") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/inquiry");
                      menuItemClick();
                    }}
                  >
                    Inquiry
                  </li>
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/lead") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/lead");
                      menuItemClick();
                    }}
                  >
                    Lead
                  </li>
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/adminstatus") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/adminstatus");
                      menuItemClick();
                    }}
                  >
                    Admin Status
                  </li>
                  {/* <li
                  className={`menu-item submenu-item ${
                    isActive("/quotes") ? "active" : ""
                  }`}
                  onClick={() => navigate("/quotes")}
                >
                  Quotes
                </li>
                <li
                  className={`menu-item submenu-item ${
                    isActive("/analytics") ? "active" : ""
                  }`}
                  onClick={() => navigate("/analytics")}
                >
                  Analytics
                </li> */}
                </ul>
              )}
            </li>
          ) : (
            ""
          )}

          {login == "counselor" ? (
            <li
              className={`menu-item ${
                isSubmenuActive([
                  "/LeadInquiryManagement",
                  "/inquiry",
                  "//leadCouncelor",
                  "/deal",
                  // "/dashboard",
                  "/contract",
                  "/quotes",
                  "/analytics",
                  "/status",
                ])
                  ? "active"
                  : ""
              }`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => toggleSubmenu("leadInquiry")}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa-solid fa-file-contract"
                ></i>
                <span className="menu-text">Leads & Inquiries</span>
                <i
                  className={`fa-solid fa-chevron-${
                    openSubmenu === "leadInquiry" ? "up" : "down"
                  } submenu-arrow`}
                ></i>
              </div>

              {openSubmenu === "leadInquiry" && (
                <ul className={`submenu `}>
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/inquiry") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/inquiry");
                      menuItemClick();
                    }}
                  >
                    Inquiry
                  </li>
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/leadCouncelor") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/leadCouncelor");
                      menuItemClick();
                    }}
                  >
                    Lead
                  </li>
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/status") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/status");
                      menuItemClick();
                    }}
                  >
                    Status
                  </li>
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/councelorTask") ? "active" : ""
                    }`}
                    onClick={() => navigate("/councelorTask")}
                  >
                    Task
                  </li>
                  {/* <li
                    className={`menu-item submenu-item ${
                      isActive("/deal") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/deal");
                      menuItemClick();
                    }}
                  >
                    Deal
                  </li> */}
                  {/* <li
                  className={`menu-item submenu-item ${
                    isActive("/quotes") ? "active" : ""
                  }`}
                  onClick={() => navigate("/quotes")}
                >
                  Quotes
                </li>
                <li
                  className={`menu-item submenu-item ${
                    isActive("/analytics") ? "active" : ""
                  }`}
                  onClick={() => navigate("/analytics")}
                >
                  Analytics
                </li> */}
                </ul>
              )}
            </li>
          ) : (
            ""
          )}

          {/* Student Management */}
          {login == "admin" ? (
            <li
              className={`menu-item ${
                isSubmenuActive([
                  "/studentDetails",
                  "/admission",
                  "/communication",
                ])
                  ? "active"
                  : ""
              }`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => toggleSubmenu("student")}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa fa-graduation-cap"
                  aria-hidden="true"
                ></i>
                <span className="menu-text text-nowrap">
                  Student Management
                </span>
                <i
                  className={`fa-solid fa-chevron-${
                    openSubmenu === "student" ? "up" : "down"
                  } submenu-arrow`}
                ></i>
              </div>

              {openSubmenu === "student" && (
                <ul className={`submenu `}>
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/studentDetails") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/studentDetails");
                      menuItemClick();
                    }}
                  >
                    Student Details
                  </li>
                  {/* <li
                    className={`menu-item submenu-item ${
                      isActive("/admission") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/admission");
                      menuItemClick();
                    }}
                  >
                    Student Admission
                  </li> */}
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/communication") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/communication");
                      menuItemClick();
                    }}
                  >
                    Communication
                  </li>
                </ul>
              )}
            </li>
          ) : (
            ""
          )}
          {login == "counselor" ? (
            <li
              className={`menu-item ${
                isSubmenuActive([
                  "/studentDetails",
                  "/admission",
                  "/communication",
                ])
                  ? "active"
                  : ""
              }`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => toggleSubmenu("student")}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa fa-graduation-cap"
                  aria-hidden="true"
                ></i>
                <span className="menu-text text-nowrap">
                  Student Management
                </span>
                <i
                  className={`fa-solid fa-chevron-${
                    openSubmenu === "student" ? "up" : "down"
                  } submenu-arrow`}
                ></i>
              </div>

              {openSubmenu === "student" && (
                <ul className={`submenu `}>
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/studentDetails") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/studentDetails");
                      menuItemClick();
                    }}
                  >
                    Student Details
                  </li>
                  {/* <li
                    className={`menu-item submenu-item ${
                      isActive("/admission") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/admission");
                      menuItemClick();
                    }}
                  >
                    Student Admission
                  </li> */}
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/communication") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/communication");
                      menuItemClick();
                    }}
                  >
                    Communication
                  </li>
                </ul>
              )}
            </li>
          ) : (
            ""
          )}
          {login == "student" ? (
            <li
              className={`menu-item ${
                isSubmenuActive([
                  "/MainStudentDetails",
                  "/admission",
                  "/Searchprograms",
                  "/ContactSupport",
                ])
                  ? "active"
                  : ""
              }`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => toggleSubmenu("student")}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa fa-graduation-cap"
                  aria-hidden="true"
                ></i>
                <span className="menu-text text-nowrap">
                  Student Management
                </span>
                <i
                  className={`fa-solid fa-chevron-${
                    openSubmenu === "student" ? "up" : "down"
                  } submenu-arrow`}
                ></i>
              </div>

              {openSubmenu === "student" && (
                <ul className={`submenu `}>
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/MainStudentDetails") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/MainStudentDetails");
                      menuItemClick();
                    }}
                  >
                    Student Details
                  </li>

                  <li
                    className={`menu-item submenu-item ${
                      isActive("/Searchprograms") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/Searchprograms");
                      menuItemClick();
                    }}
                  >
                    Student Programs
                  </li>

                  <li
                    className={`menu-item submenu-item ${
                      isActive("/ContactSupport") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/ContactSupport");
                      menuItemClick();
                    }}
                  >
                    Communication
                  </li>
                </ul>
              )}
            </li>
          ) : (
            ""
          )}

          {/*  Application & Admission Tracking */}
          {login == "admin" ? (
            <li
              className={`menu-item ${
                isSubmenuActive([
                  "/tracker",
                  "/PaymentInvoiceManagement",
                  "/university",
                  "/applications",
                ])
                  ? "active"
                  : ""
              }`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => toggleSubmenu("application")}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa fa-user"
                  aria-hidden="true"
                ></i>
                <span className="menu-text text-nowrap">Applications</span>
                <i
                  className={`fa-solid fa-chevron-${
                    openSubmenu === "application" ? "up" : "down"
                  } submenu-arrow`}
                ></i>
              </div>

              {openSubmenu === "application" && (
                <ul className={`submenu `}>
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/PaymentInvoiceManagement") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/PaymentInvoiceManagement");
                      menuItemClick();
                    }}
                  >
                    Course & University
                  </li>
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/tracker") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/tracker");
                      menuItemClick();
                    }}
                  >
                    Application Tracker
                  </li>

                  {/* <li
                    className={`menu-item submenu-item ${
                      isActive("/university") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/university");
                      menuItemClick();
                    }}
                  >
                    University Details
                  </li> */}
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/applications") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/applications");
                      menuItemClick();
                    }}
                  >
                    Admission Decision
                  </li>
                </ul>
              )}
            </li>
          ) : (
            ""
          )}

          {login == "student" ? (
            <li
              className={`menu-item ${
                isActive("/myapplication") ? "active" : ""
              }`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/myapplication");
                  // menuItemClick();
                }}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa-solid fa-university "
                ></i>
                <span className="menu-text">Application Managment</span>
              </div>
            </li>
          ) : (
            ""
          )}

          {/* Task Management */}
          {login == "admin" ? (
            <li
              className={`menu-item ${
                isSubmenuActive(["/addcounselor", "/tasks", "/tasksreminder"])
                  ? "active"
                  : ""
              }`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => toggleSubmenu("tasks")}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa-solid fa-calendar-check"
                ></i>
                <span className="menu-text text-nowrap">Task Management</span>
                <i
                  className={`fa-solid fa-chevron-${
                    openSubmenu === "tasks" ? "up" : "down"
                  } submenu-arrow`}
                ></i>
              </div>

              {openSubmenu === "tasks" && (
                <ul className={`submenu `}>
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/addcounselor") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/addcounselor");
                      menuItemClick();
                    }}
                  >
                    Counselor
                  </li>
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/tasks") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/tasks");
                      menuItemClick();
                    }}
                  >
                    Tasks
                  </li>
                  <li
                    className={`menu-item submenu-item ${
                      isActive("/tasksreminder") ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate("/tasksreminder");
                      menuItemClick();
                    }}
                  >
                    Reminder
                  </li>
                </ul>
              )}
            </li>
          ) : (
            ""
          )}

          {login == "student" ? (
            <li
              className={`menu-item ${
                isActive("/studenttasks") ? "active" : ""
              }`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/studenttasks");
                  // menuItemClick();
                }}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa-solid fa-university "
                ></i>
                <span className="menu-text">Task Management</span>
              </div>
            </li>
          ) : (
            ""
          )}

          {/* Roles Permissions */}
          {login == "admin" ? (
            <li
              className={`menu-item ${
                isActive("/RolesManagement") ? "active" : ""
              }`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/RolesManagement");
                  // menuItemClick();
                }}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa-solid fa-bolt"
                ></i>
                <span className="menu-text"> Roles Permissions</span>
              </div>
            </li>
          ) : (
            ""
          )}

          {/* Reporting & Analytics */}
          {login == "admin" ? (
            <li
              className={`menu-item ${
                isActive("/CourseUniversityDatabase") ? "active" : ""
              }`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/CourseUniversityDatabase");
                  // menuItemClick();
                }}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa-solid fa-receipt"
                ></i>
                <span className="menu-text"> Reports & Analytics</span>
              </div>
            </li>
          ) : (
            ""
          )}

          {/* Payments & Invoices */}
          {login == "admin" ? (
            <li
              className={`menu-item ${
                isActive("/ReportingAnalytics") ? "active" : ""
              }`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/ReportingAnalytics");
                  // menuItemClick();
                }}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa-solid fa-chart-line "
                ></i>
                <span className="menu-text">Payments & Invoices</span>
              </div>
            </li>
          ) : (
            ""
          )}

          {login == "student" ? (
            <li className={`menu-item ${isActive("/payment") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/payment");
                  // menuItemClick();
                }}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa-solid fa-chart-line "
                ></i>
                <span className="menu-text">Payments & Invoices</span>
              </div>
            </li>
          ) : (
            ""
          )}

          {/* Course & University*/}
          {/* {login == "admin" ? (
            <li
              className={`menu-item ${
                isActive("/PaymentInvoiceManagement") ? "active" : ""
              }`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/PaymentInvoiceManagement");
                  // menuItemClick();
                }}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa-solid fa-university "
                ></i>
                <span className="menu-text">Course & University</span>
              </div>
            </li>
          ) : (
            ""
          )} */}
          {login == "student" ? (
            <li
              className={`menu-item ${
                isActive("/UniversityCards") ? "active" : ""
              }`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/UniversityCards");
                  // menuItemClick();
                }}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa-solid fa-university "
                ></i>
                <span className="menu-text">Course & University</span>
              </div>
            </li>
          ) : (
            ""
          )}
          {login == "counselor" ? (
            <li
              className={`menu-item ${
                isActive("/UniversityCards") ? "active" : ""
              }`}
            >
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/UniversityCards");
                  // menuItemClick();
                }}
              >
                <i
                  onClick={() => toggleSidebar()}
                  className="fa-solid fa-university "
                ></i>
                <span className="menu-text">Course & University</span>
              </div>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
