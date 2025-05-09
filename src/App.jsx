import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import Home from "./authtication/Home";
import { useEffect, useState } from "react";

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
import TawkMessenger from "./TawkMessenger";
import MyApplication from "./components/AdmissionTracking/MyApplication";
import CounselorApplications from "./components/AdmissionTracking/CounselorApplications";
import ApplicationTimeline from "./components/AdmissionTracking/ApplicationTimeline";
import MyProfile from "./MyProfile/MyProfile";
import Addbranch from "./components/ReportingAnalytics/Addbranch";
import ChangePassword from "./MyProfile/ChangePassword";

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

  const hideLayout =
    location.pathname === "/" || location.pathname === "/login";
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
        <div
          className={`right-side-content ${
            hideLayout ? "full-width" : isSidebarCollapsed ? "collapsed" : ""
          }`}
          style={hideLayout ? { marginTop: "0", paddingLeft: "0" } : {}}
        >
          <LeadProvider>
            <Routes>
           
              <Route
                path="/university/GyorUniversity"
                element={<GyorUniversity></GyorUniversity>}
              ></Route>
              <Route
                path="/university/WekerleUniversity"
                element={<WekerleUiversity></WekerleUiversity>}
              ></Route>
              <Route
                path="/university/HunguryUniversity"
                element={<HunguryUniversity></HunguryUniversity>}
              ></Route>
              <Route
                path="/university/DebrecenUniversity"
                element={<DebrecenUniversity></DebrecenUniversity>}
              ></Route>

              {/* login signup */}
              <Route
                path="/login"
                element={
                  <Login
                    login={login}
                    setLogin={setLogin}
                    // handleAdmin={handleAdmin}
                    // handleStudent={handleStudent}
                    // handleCounselor={handleCounselor}
                  />
                }
              />
              {/* login signup */}
              <Route path="/" element={<Home></Home>}></Route>

              {/* dashbord */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/councelor"
                element={<Councelor></Councelor>}
              ></Route>
              {/* student dashboard */}
              <Route
                path="/studentProfile"
                element={<StudentProfile></StudentProfile>}
              ></Route>
              {/* dashbord */}

              <Route
                path="/Searchprograms"
                element={<SearchPrograms></SearchPrograms>}
              ></Route>

              {/* LeadInquiryManagement */}
              {/* Inquriy */}
              <Route path="/inquiry" element={<Inquriy></Inquriy>}></Route>
              {/* lead   */}
              <Route path="/lead" element={<Lead></Lead>}></Route>

              {/* deal */}
              {/* <Route path="/deal" element={<Deal></Deal>}></Route> */}
              <Route path="/lead/:id" element={<Deal />} />

              <Route
                path="/leadCouncelor"
                element={<LeadCouncelor></LeadCouncelor>}
              ></Route>
              <Route
                path="/councelorTask"
                element={<CounselorTask></CounselorTask>}
              ></Route>
              <Route path="/contract" element={<Contract></Contract>}></Route>

              <Route
                path="/status"
                element={<CounselorApplications></CounselorApplications>}
              ></Route>

              <Route
                path="/adminstatus"
                element={<AdminStatus></AdminStatus>}
              ></Route>

              <Route
                path="/timeline/:applicationId"
                element={<ApplicationTimeline />}
              />

              {/* student management */}
              <Route
                path="/studentDetails"
                element={<StudentDetails></StudentDetails>}
              ></Route>

              <Route
                path="/MainStudentDetails"
                element={<MainStudentDetails></MainStudentDetails>}
              ></Route>
              {/* student details page */}
              <Route
                path="/manaDetails"
                element={<ManaDetails></ManaDetails>}
              ></Route>

              {/* student addmission */}
              <Route
                path="/admission"
                element={<AdmissionNew></AdmissionNew>}
              ></Route>

              <Route
                path="/new"
                element={<AdmissionTracking></AdmissionTracking>}
              ></Route>
              {/* student detail single page */}
              <Route
                path="/studentProfile/:studentId"
                element={<StudentDetailsPage></StudentDetailsPage>}
              ></Route>

              <Route
                path="/student/:id"
                element={<ViewStudentProfile></ViewStudentProfile>}
              ></Route>

              {/* comunication */}
              <Route
                path="/communication"
                element={
                  <CommunicationFollowupManagement></CommunicationFollowupManagement>
                }
              ></Route>

              <Route
                path="/myapplication"
                element={<MyApplication></MyApplication>}
              ></Route>

              <Route
                path="/ContactSupport"
                element={<Support></Support>}
              ></Route>

              {/* ApplicationTracking */}
              <Route
                path="/tracker"
                element={<ApplicationTracker></ApplicationTracker>}
              ></Route>

              {/* university details */}
              <Route
                path="/university"
                element={<UniversitySubmissions></UniversitySubmissions>}
              ></Route>
   {/* this is VB routes for all the university  */}
   <Route
                path="/university/:id"
                element={<BmuUniversity></BmuUniversity>}
              ></Route>
              {/* Admission decisions */}
              <Route
                path="/applications"
                element={<AdmissionDecisions></AdmissionDecisions>}
              ></Route>
              <Route
                path="/AdmissionTracking"
                element={<AdmissionTracking />}
              />

              {/* follow up */}
              <Route
                path="/followup"
                element={<FollowUpScheduling></FollowUpScheduling>}
              ></Route>

              {/* automated reminder */}
              <Route
                path="/reminder"
                element={<AutomatedReminders></AutomatedReminders>}
              ></Route>

              {/* add councelor */}
              <Route
                path="/addcounselor"
                element={
                  <AddCounselor onAdd={handleAddCounselor}></AddCounselor>
                }
              ></Route>

              {/* tasks */}
              <Route
                path="/tasks"
                element={
                  <TaskAssignment
                    counselors={counselors}
                    tasks={tasks}
                    onTaskAssign={handleTaskAssign}
                  ></TaskAssignment>
                }
              ></Route>

              {/* reminder */}
              <Route
                path="/tasksreminder"
                element={<TaskReminder tasks={tasks}></TaskReminder>}
              ></Route>

              <Route
                path="/studenttasks"
                element={<StudentTask></StudentTask>}
              ></Route>

              {/* roles permissions */}
              <Route path="/RolesManagement" element={<RolesManagement />} />

              <Route path="/permissions/:role" element={<PermissionsTable />} />

              {/* reports & analytics */}
              <Route
                path="/CourseUniversityDatabase"
                element={<CourseUniversityDatabase></CourseUniversityDatabase>} ></Route>

              {/* payment & invoices*/}
              <Route
                path="/ReportingAnalytics"
                element={<ReportingAnalytics />}/>

              <Route path="/addbranch" element={<Addbranch/>}></Route>
              <Route path="/payment" element={<Payment></Payment>}></Route>

              {/* PaymentInvoiceManagement */}
              <Route
                path="/UniversityCards"
                element={<UniversityCards></UniversityCards>}
              ></Route>
              <Route
                path="/PaymentInvoiceManagement"
                element={<PaymentInvoiceMangament />
                  
                }
              />

              {/* chatbox route */}
              <Route path="/chatbox" element={<ChatBox />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Routes>
          </LeadProvider>
        </div>
        {/* right end  */}
      </div>
    </>
  );
}

export default App;
