import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import Home from "./authtication/Home";
import React, { useEffect, useState } from "react";
import Login from "./authtication/Login";
import Dashboard from "./components/dashbord/Dashbord";
import ChatBox from "./components/CommunicationFollowupManagement/ChatBox";
import Contract from "./components/Lead & Inquiry Management/Contract";
import Profile from "./components/Profile/Profile";
import StudentDetailsPage from "./components/Profile/StudentDetailsPage";
import Lead from "./components/Lead & Inquiry Management/Lead";
import Deal from "./components/Lead & Inquiry Management/Deal";
import AdmissionNew from "./components/AdmissionTracking/AdmissionNew";
import ProfileDetails from "./components/Profile/ProfileDetails";
import LeadInquiryManagement from "./components/Lead & Inquiry Management/LeadInquiryManagement";
import StudentDetails from "./components/Profile/StudentDetails";
import AdmissionTracking from "./components/AdmissionTracking/AdmissionTracking";
import TaskCalendarManagement from "./components/Task Calendar Management/TaskCalendarManagement";

import PaymentInvoiceMangament from "./components/PaymentInvoiceManagement/PaymentInvoiceManagement";
import ReportingAnalytics from "./components/ReportingAnalytics/ReportingAnalytics";
import UserRolesAccessControl from "./components/UserRolesAccessControl/UserRolesAccessControl";
import CommunicationFollowupManagement from "./components/CommunicationFollowupManagement/CommunicationFollowupManagement";
import Inquriy from "./components/Lead & Inquiry Management/Inquriy";
import ApplicationTracker from "./components/AdmissionTracking/ApplicationTracker";
import DocumentUpload from "./components/AdmissionTracking/DocumentUpload";
import UniversitySubmissions from "./components/AdmissionTracking/UniversitySubmissions";
import AdmissionDecisions from "./components/AdmissionTracking/AdmissionDecisions";
import FollowUpScheduling from "./components/CommunicationFollowupManagement/FollowUpScheduling";
import AutomatedReminders from "./components/CommunicationFollowupManagement/AutomatedReminders";
import ManaDetails from "./components/Profile/ManaDetails";
import AddCounselor from "./components/Task Calendar Management/AddCounselor";
import TaskAssignment from "./components/Task Calendar Management/TaskAssignment";
import TaskReminder from "./components/Task Calendar Management/TaskReminder";
import RolesManagement from "./components/CourseUniversityDatabase/RolesManagement";
import PermissionsTable from "./components/CourseUniversityDatabase/permissionsData";
import CourseUniversityDatabase from "./components/CourseUniversityDatabase/CourseUniversityDatabase";
import StudentProfile from "./components/Profile/Dashboard";
import StudentUniversity from "./components/PaymentInvoiceManagement/StudentUniversity";
import Councelor from "./components/dashbord/Councelor";

import CounselorTask from "./components/Lead & Inquiry Management/CouncelorTask";
import StatusTracking from "./components/Lead & Inquiry Management/StatusTracking";
import AdminStatus from "./components/Lead & Inquiry Management/AdminStatus";
import { LeadProvider } from "./context/LeadContext";
import LeadCouncelor from "./components/Lead & Inquiry Management/LeadCouncelor";
import UniversityCards from "./components/PaymentInvoiceManagement/UniversityCards";
import BmuUniversity from "./components/universityPagesform/BmuUniversity";
import DebrecenUniversity from "./components/universityPagesform/DebrecenUniversity";
import HunguryUniversity from "./components/universityPagesform/HunguryUniversity";
import GyorUniversity from "./components/universityPagesform/GyorUniversity";
import WekerleUiversity from "./components/universityPagesform/WekerleUniversity";
import MainStudentDetails from "./components/Profile/MainStudentDetails";
import ViewStudentProfile from "./components/AdmissionTracking/ViewStudentProfile";
import SearchPrograms from "./components/Profile/SearchPrograms";
import Payment from "./components/ReportingAnalytics/Payment";
import StudentTask from "./components/Task Calendar Management/StudentTask";
import Support from "./components/CommunicationFollowupManagement/Support";

import MyApplication from "./components/AdmissionTracking/MyApplication";
import CounselorApplications from "./components/AdmissionTracking/CounselorApplications";
import ApplicationTimeline from "./components/AdmissionTracking/ApplicationTimeline";
import MyProfile from "./MyProfile/MyProfile";
import Addbranch from "./components/ReportingAnalytics/Addbranch";
import ChangePassword from "./MyProfile/ChangePassword";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
// import chatBox from "./components/ChatSection/ChatBox"
import ChatBox2 from "./components/ChatSection/ChatBox";
import ChatHistory from "./components/ChatSection/ChatHistory";
import ChatList from "./components/ChatSection/ChatList";
import Signup from "./authtication/Signup";
import InquiryForm from "./authtication/InquiryForm";
import InquryTabledemo from "./demofiles/InquryTabledemo";
import Applicationtracking from "./components/Profile/Applicationtracking";
import CounslerStudentTable from "./components/Profile/CounslerStudentTable";
import Addstaff from "./components/Task Calendar Management/Addstaff";
import StaffInquiry from "./components/Lead & Inquiry Management/StaffInquiry";
import Visaprocesing from "./components/AdmissionTracking/Visaprocesing";
import StaffDashboard from "./components/universityPagesform/StaffDashboard";
import Stafflead from "./components/Lead & Inquiry Management/Stafflead";



function App() {
  //show details to admin
  const [login, setLogin] = useState(localStorage.getItem("login") || "");

  useEffect(() => {

    if (login) {
      localStorage.setItem("login", login);
    }
  }, [login]);

  const [counselors, setCounselors] = useState([]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
    },
  ]);

  const handleAddCounselor = (name) => {
    setCounselors([...counselors, name]);
  };
  // console.log(counselors);

  const handleTaskAssign = (task) => {
    setTasks([...tasks, task]);
  };
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const menusidebarcollaps = () => {
    setIsSidebarCollapsed(true);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };
  const location = useLocation();
  const user_id = localStorage.getItem("user_id")
  const noLayoutPaths = ["/", "/login", "/signup"];
  const hideLayout = noLayoutPaths.includes(location.pathname);

  return (
    <>
      {/* navbar */}
      {!hideLayout && <Navbar toggleSidebar={toggleSidebar} />}
      {/* navbar end */}
      {/* sidebar start */}
      <div className={`main-content ${hideLayout ? "full-width" : ""}`}>
        {!hideLayout && (
          <Sidebar
            collapsed={isSidebarCollapsed}
            menuItemClick={menusidebarcollaps}
            login={login}
            // login={"admin"}
            toggleSidebar={toggleSidebar}
          />
        )}
        {/* sidebar end */}
        {/* right side  */}
        <div className={`right-side-content ${hideLayout ? "full-width" : isSidebarCollapsed ? "collapsed" : ""}`} style={hideLayout ? { marginTop: "0", paddingLeft: "0" } : {}}>
          <LeadProvider>
            <Routes>
              {/* University Routes */}
              <Route path="/university/GyorUniversity" element={<ProtectedRoute><GyorUniversity /></ProtectedRoute>} />
              <Route path="/university/WekerleUniversity" element={<ProtectedRoute><WekerleUiversity /></ProtectedRoute>} />
              <Route path="/university/HunguryUniversity" element={<ProtectedRoute><HunguryUniversity /></ProtectedRoute>} />
              <Route path="/university/DebrecenUniversity" element={<ProtectedRoute><DebrecenUniversity /></ProtectedRoute>} />
              <Route path="/university/:id" element={<ProtectedRoute><BmuUniversity /></ProtectedRoute>} />

              {/* Login & Signup */}
              <Route path="/login" element={<Login login={login} setLogin={setLogin} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />

              {/* Protected Route for Dashboard */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

              {/* Other Protected Routes */}
              <Route path="/councelor" element={<ProtectedRoute><Councelor /></ProtectedRoute>} />
              <Route path="/studentProfile" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
              <Route path="/Searchprograms" element={<ProtectedRoute><SearchPrograms /></ProtectedRoute>} />
              <Route path="/inquiry" element={<ProtectedRoute><Inquriy /></ProtectedRoute>} />
              <Route path="/lead" element={<ProtectedRoute><Lead /></ProtectedRoute>} />
              <Route path="/lead/:id" element={<ProtectedRoute><Deal /></ProtectedRoute>} />
              <Route path="/leadCouncelor" element={<ProtectedRoute><LeadCouncelor /></ProtectedRoute>} />
              <Route path="/councelorTask" element={<ProtectedRoute><CounselorTask /></ProtectedRoute>} />
              <Route path="/contract" element={<ProtectedRoute><Contract /></ProtectedRoute>} />
              <Route path="/status" element={<ProtectedRoute><CounselorApplications /></ProtectedRoute>} />
              <Route path="/adminstatus" element={<ProtectedRoute><AdminStatus /></ProtectedRoute>} />
              <Route path="/timeline/:applicationId" element={<ProtectedRoute><ApplicationTimeline /></ProtectedRoute>} />

              {/* Student Management */}
              <Route path="/studentDetails" element={<ProtectedRoute><StudentDetails /></ProtectedRoute>} />
              <Route path="/MainStudentDetails" element={<ProtectedRoute><MainStudentDetails /></ProtectedRoute>} />
              <Route path="/manaDetails" element={<ProtectedRoute><ManaDetails /></ProtectedRoute>} />
              <Route path="/admission" element={<ProtectedRoute><AdmissionNew /></ProtectedRoute>} />
              <Route path="/new" element={<ProtectedRoute><AdmissionTracking /></ProtectedRoute>} />
              <Route path="/studentProfile/:studentId" element={<ProtectedRoute><StudentDetailsPage /></ProtectedRoute>} />
              <Route path="/student/:id" element={<ProtectedRoute><ViewStudentProfile /></ProtectedRoute>} />

              {/* Communication */}
              <Route path="/communication" element={<ProtectedRoute><CommunicationFollowupManagement /></ProtectedRoute>} />
              <Route path="/myapplication" element={<ProtectedRoute><MyApplication /></ProtectedRoute>} />
              <Route path="/ContactSupport" element={<ProtectedRoute><Support /></ProtectedRoute>} />

              {/* Application Tracking */}
              <Route path="/tracker" element={<ProtectedRoute><ApplicationTracker /></ProtectedRoute>} />

              {/* Admission Decisions */}
              <Route path="/applications" element={<ProtectedRoute><AdmissionDecisions /></ProtectedRoute>} />
              <Route path="/AdmissionTracking" element={<ProtectedRoute><AdmissionTracking /></ProtectedRoute>} />

              {/* Follow Up */}
              <Route path="/followup" element={<ProtectedRoute><FollowUpScheduling /></ProtectedRoute>} />

              {/* Automated Reminders */}
              <Route path="/reminder" element={<ProtectedRoute><AutomatedReminders /></ProtectedRoute>} />

              {/* Add Counselor */}
              <Route path="/addcounselor" element={<ProtectedRoute><AddCounselor onAdd={handleAddCounselor} /></ProtectedRoute>} />

              {/* Tasks */}
              <Route path="/tasks" element={<ProtectedRoute><TaskAssignment counselors={counselors} tasks={tasks} onTaskAssign={handleTaskAssign} /></ProtectedRoute>} />
              <Route path="/tasksreminder" element={<ProtectedRoute><TaskReminder tasks={tasks} /></ProtectedRoute>} />
              <Route path="/studenttasks" element={<ProtectedRoute><StudentTask /></ProtectedRoute>} />

              {/* Roles Permissions */}
              <Route path="/RolesManagement" element={<ProtectedRoute><RolesManagement /></ProtectedRoute>} />
              <Route path="/permissions/:role" element={<ProtectedRoute><PermissionsTable /></ProtectedRoute>} />

              {/* Reports & Analytics */}
              <Route path="/CourseUniversityDatabase" element={<ProtectedRoute><CourseUniversityDatabase /></ProtectedRoute>} />
              <Route path="/ReportingAnalytics" element={<ProtectedRoute><ReportingAnalytics /></ProtectedRoute>} />

              {/* Payment & Invoices */}
              <Route path="/addbranch" element={<ProtectedRoute><Addbranch /></ProtectedRoute>} />
              <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
              <Route path="/UniversityCards" element={<ProtectedRoute><UniversityCards /></ProtectedRoute>} />
              <Route path="/PaymentInvoiceManagement" element={<ProtectedRoute><PaymentInvoiceMangament /></ProtectedRoute>} />

              {/* Chatbox Route */}
              <Route path="/chatbox" element={<ProtectedRoute><ChatBox /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
              <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
              {/* <Route path="/chat" element={<ProtectedRoute><ChatBox2/></ProtectedRoute>} />
  <Route path="/chatHistory" element={<ProtectedRoute><ChatBox2/></ProtectedRoute>} /> */}
              <Route path="/chat/:receiverId" element={<ChatBox2 userId={user_id} />} />
              <Route path="/chatHistory" element={<ChatHistory userId={user_id} />} />
              <Route path="/chatList" element={<ChatList userId={user_id} />} />
            
              {/* <Route path="/inquirydemo" element={<Inquirydemo/>} /> */}
              <Route path="/inquryTabledemo" element={<InquryTabledemo/>} />
              <Route path="/applicationtracking" element={<Applicationtracking/>} />
              <Route path="/counslerStudentTable" element={<CounslerStudentTable/>} />
              <Route path="/addStaff" element={<Addstaff/>} />
              <Route path="/staffInquiry" element={<StaffInquiry/>} />
              <Route path="/visaprocesing" element={<Visaprocesing/>} />
              <Route path="/staffDashboard" element={<StaffDashboard/>} />
              <Route path="/stafflead" element={<Stafflead/>} />





            </Routes>

          </LeadProvider>
        </div>
        {/* right end  */}
      </div>
    </>
  );
}

export default App;
