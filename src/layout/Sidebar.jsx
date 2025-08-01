import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { FaUsers, FaRegFileAlt } from "react-icons/fa"; // FontAwesome
import { BsFillPersonLinesFill } from "react-icons/bs"; // Bootstrap
import { hasPermission } from "../authtication/permissionUtils";
import { hasUserPermission } from "../authtication/hasuserpermission";
import { RiMenuFold3Line } from "react-icons/ri";
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  User,
  ClipboardList,
  ShieldCheck,
  BarChart2,
  CreditCard,
  Globe,
  LogOut,
  File
} from "lucide-react";

const Sidebar = ({ login, collapsed, menuItemClick, toggleSidebar }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null); // Tracks the open submenu
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // ✅ New

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
    <div className={`sidebar-container 
      ${collapsed === true ? "collapsed" : ""}
      ${collapsed === "mini" ? "collapsed-desktop" : ""}
    `}>
      {!collapsed ? <div className="d-flex justify-content-between p-2">
        <img
          src="/img/logo.png"
          alt="Logo"
          height={collapsed ? "90px" : "90px"}
          width={collapsed ? "60px" : "140px"}
          style={{ marginTop: "-10px" }}
        />
        <div className="nav-taggle-icon text-white" onClick={toggleSidebar}>
          <a href="#">
            <RiMenuFold3Line style={{ color: "black" }} />
          </a>
        </div>
      </div>
        : <div className="nav-taggle-icon text-white" onClick={toggleSidebar} style={{ marginBottom: "50px", textAlign: 'center' }}>
          <a href="#" style={{ position: "relative", right: "12px", top: "30px" }}>
            <RiMenuFold3Line style={{ color: "black" }} />
          </a>
        </div>
        }
       
      <div className="sidebar">
        <ul className="menu">
          {/* Dashboard Section */}
          {login === "admin" && (
            <li className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                <LayoutDashboard size={18} className="mr-2" />
                <span className="menu-text">Dashboard</span>
              </div>
            </li>
          )}
          {login == "counselor" && (
            <li className={`menu-item ${isActive("/councelor") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/councelor");
                }}
              >
                <LayoutDashboard size={18} className="mr-2" />
                <span className="menu-text">Dashboard</span>
              </div>
            </li>
          )}
          {login == "student" && (
            <li className={`menu-item ${isActive("/dashboardvisa") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/dashboardvisa");
                }}
              >
                <LayoutDashboard size={18} className="mr-2" />
                <span className="menu-text">Dashboard</span>
              </div>
            </li>
          )}
          {login == "processors" && (
            <li className={`menu-item ${isActive("/processorsDashboard") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/processorsDashboard");
                }}
              >
                <LayoutDashboard size={18} className="mr-2" />
                <span className="menu-text">Dashboard</span>
              </div>
            </li>
          )}
           {login == "masteradmin" && (
            <li className={`menu-item ${isActive("/masterDashboard") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/masterDashboard");
                }}
              >
                <LayoutDashboard size={18} className="mr-2" />
                <span className="menu-text">Dashboard</span>
              </div>
            </li>
          )}

          {/* Lead & Inquiry Management */}
          {login == "admin" ? (
            <li className={`menu-item ${isSubmenuActive([
              "/LeadInquiryManagement",
              "/inquiry",
              "/lead",
              "/deal",
              "/contract",
              "/quotes",
              "/analytics",
              "/adminstatus",
            ]) ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  toggleSubmenu("leadInquiry");
                }}
              >
                <FileText size={18} className="mr-2" />
                <span className="menu-text">Leads & Inquiries</span>
                <i className={`fa-solid fa-chevron-${openSubmenu === "leadInquiry" ? "up" : "down"} submenu-arrow`}></i>
              </div>

              {openSubmenu === "leadInquiry" && (
                <ul className={`submenu `}>
                  <li
                    className={`menu-item submenu-item ${isActive("/inquiry") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/inquiry");
                    }}
                  >
                    Inquiry
                  </li>
                  <li
                    className={`menu-item submenu-item ${isActive("/lead") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/lead");
                    }}
                  >
                    Lead
                  </li>
                  <li
                    className={`menu-item submenu-item ${isActive("/adminstatus") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/adminstatus");
                    }}
                  >
                    All Lead
                  </li>
                </ul>
              )}
            </li>
          ) : ""}

          {login == "counselor" ? (
            <li className={`menu-item ${isSubmenuActive([
              "/LeadInquiryManagement",
              "/inquiry",
              "//leadCouncelor",
              "/deal",
              "/contract",
              "/quotes",
              "/analytics",
              "/status",
            ]) ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => toggleSubmenu("leadInquiry")}
              >
                <GraduationCap size={18} className="mr-2" />
                <span className="menu-text">Leads & Inquiries</span>
                <i className={`fa-solid fa-chevron-${openSubmenu === "leadInquiry" ? "up" : "down"} submenu-arrow`}></i>
              </div>

              {openSubmenu === "leadInquiry" && (
                <ul className={`submenu `}>
                  <li
                    className={`menu-item submenu-item ${isActive("/inquiry") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/inquiry");
                    }}
                  >
                    Inquiry
                  </li>

                  {hasPermission("Lead", "view") && <li
                    className={`menu-item submenu-item ${isActive("/leadCouncelor") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/leadCouncelor");
                    }}
                  >
                    Lead
                  </li>}
                </ul>
              )}
            </li>
          ) : ""}

          {/* Student Management */}
          {login == "admin" ? (
            <li className={`menu-item ${isSubmenuActive([
              "/studentDetails",
              "/admission",
              "/chat",
            ]) ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => toggleSubmenu("student")}
              >
                <GraduationCap size={18} className="mr-2" />
                <span className="menu-text text-nowrap">Student Management</span>
                <i className={`fa-solid fa-chevron-${openSubmenu === "student" ? "up" : "down"} submenu-arrow`}></i>
              </div>

              {openSubmenu === "student" && (
                <ul className={`submenu `}>
                  <li
                    className={`menu-item submenu-item ${isActive("/studentDetails") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/studentDetails");
                    }}
                  >
                    Student Details
                  </li>
                  <li
                    className={`menu-item submenu-item ${isActive("/chat") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/chat");
                    }}
                  >
                    Communication
                  </li>
                </ul>
              )}
            </li>
          ) : ""}

          {login == "counselor" ? (
            <li className={`menu-item ${isSubmenuActive([
              "/studentDetails",
              "/admission",
              "/chat",
            ]) ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => toggleSubmenu("student")}
              >
                <GraduationCap size={20} className="mr-2" />
                <span className="menu-text text-nowrap">Student Management</span>
                <i className={`fa-solid fa-chevron-${openSubmenu === "student" ? "up" : "down"} submenu-arrow`}></i>
              </div>

              {openSubmenu === "student" && (
                <ul className={`submenu `}>
                  {hasPermission("Student Details", "view") && <li
                    className={`menu-item submenu-item ${isActive("/counslerStudentTable") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/counslerStudentTable");
                    }}
                  >
                    Student Details
                  </li>}
                  {hasPermission("Communication", "view") && <li
                    className={`menu-item submenu-item ${isActive("/chat") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/chat");
                    }}
                  >
                    Communication
                  </li>}
                </ul>
              )}
            </li>
          ) : ""}

          {login == "student" ? (
            <li className={`menu-item ${isSubmenuActive([
              "/MainStudentDetails",
              "/admission",
              "/Searchprograms",
              "/ContactSupport",
              "/studentDecision", 
            ]) ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => toggleSubmenu("student")}
              >
                <GraduationCap size={18} className="mr-2" />
                <span className="menu-text text-nowrap">Student Management</span>
                <i className={`fa-solid fa-chevron-${openSubmenu === "student" ? "up" : "down"} submenu-arrow`}></i>
              </div>

              {openSubmenu === "student" && (
                <ul className={`submenu `}>
                  {hasPermission("Student Details", "view") && <li
                    className={`menu-item submenu-item ${isActive("/MainStudentDetails") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/MainStudentDetails");
                    }}
                  >
                    Student Details
                  </li>}

                  {hasPermission("Student Programs", "view") && <li
                    className={`menu-item submenu-item ${isActive("/Searchprograms") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/Searchprograms");
                    }}
                  >
                    Apply University
                  </li>}

                  {hasPermission("Communication", "view")&&<li
                    className={`menu-item submenu-item ${isActive("/studentDecision") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/studentDecision");
                    }}
                  >
                    Student Decision
                  </li>}
                </ul>
              )}
            </li>
          ) : ""}

          {/* Application & Admission Tracking */}
          {login == "admin" ? (
            <li className={`menu-item ${isSubmenuActive([
              "/tracker",
              "/PaymentInvoiceManagement",
              "/university",
              "/applications",
            ]) ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => toggleSubmenu("application")}
              >
                <User size={18} className="mr-2" />
                <span className="menu-text text-nowrap">Applications</span>
                <i className={`fa-solid fa-chevron-${openSubmenu === "application" ? "up" : "down"} submenu-arrow`}></i>
              </div>

              {openSubmenu === "application" && (
                <ul className={`submenu `}>
                  <li
                    className={`menu-item submenu-item ${isActive("/PaymentInvoiceManagement") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/PaymentInvoiceManagement");
                    }}
                  >
                    Course & University
                  </li>

                  <li
                    className={`menu-item submenu-item ${isActive("/tracker") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/tracker");
                    }}
                  >
                    Application Tracker
                  </li>

                  <li
                    className={`menu-item submenu-item ${isActive("/applications") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/applications");
                    }}
                  >
                    Admission Decision
                  </li>
                </ul>
              )}
            </li>
          ) : ""}

          {login == "student" && hasPermission("Application Management", "view") ? (
            <li className={`menu-item ${isActive("/myapplication") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/myapplication");
                }}
              >
                <User size={18} className="mr-2" />
                <span className="menu-text">Application Managment</span>
              </div>
            </li>
          ) : ""}

          {/* Task Management */}
          {login == "admin" ? (
            <li className={`menu-item ${isSubmenuActive(["/addcounselor", "/tasks", "/tasksreminder"]) ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => toggleSubmenu("tasks")}
              >
                <ClipboardList size={18} className="mr-2" />
                <span className="menu-text text-nowrap">Task Management</span>
                <i className={`fa-solid fa-chevron-${openSubmenu === "tasks" ? "up" : "down"} submenu-arrow`}></i>
              </div>

              {openSubmenu === "tasks" && (
                <ul className={`submenu `}>
                  <li
                    className={`menu-item submenu-item ${isActive("/addcounselor") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/addcounselor");
                    }}
                  >
                    Add Counselor
                  </li>
                  <li
                    className={`menu-item submenu-item ${isActive("/addStaff") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/addStaff");
                    }}
                  >
                    Add Staff
                  </li>
                   <li
                    className={`menu-item submenu-item ${isActive("/addStaff") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/addProcessor");
                    }}
                  >
                    Add Processors
                  </li>
                  <li
                    className={`menu-item submenu-item ${isActive("/tasks") ? "active" : ""}`}
                    onClick={() => {
                      navigate("/tasks");
                    }}
                  >
                    Tasks
                  </li>
                </ul>
              )}
            </li>
          ) : ""}

          {login == "student" && hasPermission("Task Management", "view") ? (
            <li className={`menu-item ${isActive("/studenttasks") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/studenttasks");
                }}
              >
                <ClipboardList size={18} className="mr-2" />
                <span className="menu-text">Task Management</span>
              </div>
            </li>
          ) : ""}

          {/* Roles Permissions */}
          {login == "admin" ? (
            <li className={`menu-item ${isActive("/RolesManagement") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/RolesManagement");
                }}
              >
                <ShieldCheck size={18} className="mr-2" />
                <span className="menu-text"> Roles Permissions</span>
              </div>
            </li>
          ) : ""}

          {login == "staff" ? (
            <li className={`menu-item ${isActive("/staffDashboard") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/staffDashboard");
                }}
              >
                <LayoutDashboard size={18} className="mr-2" />
                <span className="menu-text">Dashboard</span>
              </div>
            </li>
          ) : ""}

          {login == "staff" && hasUserPermission("Inquiry", "view") && (
            <li className={`menu-item ${isActive("/staffInquiry") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/staffInquiry");
                }}
              >
                <FileText size={18} className="mr-2" />
                <span className="menu-text">Inquiry</span>
              </div>
            </li>
          )}
          {login == "staff" && hasUserPermission("Lead", "view") && (
            <li className={`menu-item ${isActive("/stafflead") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/stafflead");
                }}
              >
                <FileText size={18} className="mr-2" />
                <span className="menu-text">Lead</span>
              </div>
            </li>
          )}
          {login == "staff" && hasUserPermission("Payments & Invoice", "view") ? (
            <li className={`menu-item ${isActive("/payment") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/payment");
                }}
              >
                <CreditCard size={18} className="mr-2" />
                <span className="menu-text">Payments & Invoices</span>
              </div>
            </li>
          ) : ""}

          {login == "staff" ? (
            <li className={`menu-item ${isActive("/") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/");
                }}
              >
                <LogOut size={18} className="mr-2" />
                <span className="menu-text">Logout</span>
              </div>
            </li>
          ) : ""}

          {/* Reporting & Analytics */}
          {login == "admin" ? (
            <li className={`menu-item ${isActive("/CourseUniversityDatabase") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/CourseUniversityDatabase");
                }}
              >
                <BarChart2 size={18} className="mr-2" />
                <span className="menu-text"> Reports & Analytics</span>
              </div>
            </li>
          ) : ""}

          {/* Payments & Invoices */}
          {login == "admin" ? (
            <li className={`menu-item ${isActive("/ReportingAnalytics") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/ReportingAnalytics");
                }}
              >
                <CreditCard size={18} className="mr-2" />
                <span className="menu-text">Payments & Invoices</span>
              </div>
            </li>
          ) : ""}

          {/* Visa Process List */}
          {login == "admin" ? (
            <li className={`menu-item ${isActive("/visaprocesinglist") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/visaprocesinglist");
                }}
              >
                <Globe size={18} className="mr-2" />
                <span className="menu-text">Visa procesing list</span>
              </div>
            </li>
          ) : ""}

          {login == "student" && hasPermission("Payments & Invoices", "view") ? (
            <li className={`menu-item ${isActive("/payment") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/payment");
                }}
              >
                <CreditCard size={18} className="mr-2" />
                <span className="menu-text">Payments & Invoices</span>
              </div>
            </li>
          ) : ""}

          {login == "student" && hasPermission("Course & University", "view") ? (
            <li className={`menu-item ${isActive("/UniversityCards") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/UniversityCards");
                }}
              >
                <GraduationCap size={18} className="mr-2" />
                <span className="menu-text">Course & University</span>
              </div>
            </li>
          ) : ""}

          {login == "student" && hasPermission("Course & University", "view") ? (
            <li className={`menu-item ${isActive("/visaprocesing") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/visaprocesing");
                }}
              >
                <Globe size={18} className="mr-2" />
                <span className="menu-text">Visa procesing</span>
              </div>
            </li>
          ) : ""}
           {/* {login == "student" && hasPermission("Course & University", "view") ? (
            <li className={`menu-item ${isActive("/chatbot") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/chatbot");
                }}
              >
                <Globe size={18} className="mr-2" />
                <span className="menu-text">Chat Bot</span>
              </div>
            </li>
          ) : ""} */}

          {login == "counselor" && hasPermission("Course & University", "view") ? (
            <li className={`menu-item ${isActive("/councelorTask") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/councelorTask");
                }}
              >
                <Globe size={18} className="mr-2" />
                <span className="menu-text">Task</span>
              </div>
            </li>
          ) : ""}

          {login == "counselor" && hasPermission("Course & University", "view") ? (
            <li className={`menu-item ${isActive("/applicationtracking") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/applicationtracking");
                }}
              >
                <GraduationCap size={18} className="mr-2" />
                <span className="menu-text">Application Tracking</span>
              </div>
            </li>
          ) : ""}

          {/* Processor Menu Items */}
          {login == "processors" && (
            <li className={`menu-item ${isActive("/applicationProcessor") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/applicationProcessor");
                }}
              >
                <FileText size={18} className="mr-2" />
                <span className="menu-text">Student Applications</span>
              </div>
            </li>
          )}

          {login == "processors" && (
            <li className={`menu-item ${isActive("/processorsDocument") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/processorsDocument");
                }}
              >
                <File size={18} className="mr-2" />
                <span className="menu-text">Student Documents</span>
              </div>
            </li>
          )}

          {login == "masteradmin" && (
            <li className={`menu-item ${isActive("/masterTable") ? "active" : ""}`}>
              <div
                className="menu-link menu-i"
                onClick={() => {
                  navigate("/masterTable");
                }}
              >
                <File size={18} className="mr-2" />
                <span className="menu-text">Admin </span>
              </div>
            </li>
          )}

        </ul>
      </div>
      {isMobile && collapsed === true && (
        <div className="sidebar-overlay" ></div>
      )}
    </div>
  );
};

export default Sidebar;