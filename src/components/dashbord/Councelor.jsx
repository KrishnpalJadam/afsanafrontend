





// import React, { useEffect, useState } from "react";
// import { Card, Container, Row, Col } from "react-bootstrap";
// import { Pie, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";
// import { Link } from "react-router-dom";
// import CounselorProfile from "./CounselorProfile";
// import api from "../../interceptors/axiosInterceptor";
// import { hasPermission } from "../../authtication/permissionUtils";
// import BASE_URL from "../../Config";

// ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// const CounselorDashboard = () => {
//   const [leads, setLeads] = useState([]);
//   const [dashboardData, setDashboardData] = useState([]);
//   const [counselorProfile, setCounselorProfile] = useState({});
//   const role = localStorage.getItem("login");

//   // Fetch permissions
//   useEffect(() => {
//     const fetchPermissions = async () => {
//       try {
//         const permissionsResponse = await api.get(`permission?role_name=${role}`);
//         localStorage.setItem("permissions", JSON.stringify(permissionsResponse.data));
//       } catch (error) {
//         console.error("Error fetching permissions:", error);
//       }
//     };

//     if (role) fetchPermissions();
//   }, [role]);

//   // Get login detail
//   useEffect(() => {
//     const loginDetail = localStorage.getItem("login_detail");
//     if (loginDetail) {
//       setCounselorProfile(JSON.parse(loginDetail));
//     }
//   }, []);
//   const counselor_idmain = localStorage.getItem("counselor_id")
//   // Get dashboard data

//   useEffect(() => {
//     const allData = async () => {
//       try {
//         const dashData = await api.get(`${BASE_URL}dashboard/${counselor_idmain}`);
//         const data = dashData.data;

//         // Handle object or array
//         if (Array.isArray(data)) {
//           setDashboardData(data);
//         } else {
//           setDashboardData([data]); // Convert object to array
//         }

//         if (data?.leads) {
//           setLeads(data.leads); // assuming leads are in response
//         }

//       } catch (error) {
//         console.log("Dashboard fetch error", error);
//       }
//     };

//     allData();
//   }, []);

//   // Dynamic lead status counts
//   const statusCounts = leads.reduce((acc, lead) => {
//     acc[lead.status] = (acc[lead.status] || 0) + 1;
//     return acc;
//   }, {});

//   const completedLeads = (statusCounts["Converted"] || 0) + (statusCounts["Followed Up"] || 0);
//   const totalLeads = leads.length;

//   const pieChartData = {
//     labels: ["Total Leads", "Total Students", "Total Tasks", "Followed Up"],
//     datasets: [
//       {
//         data: [
//           dashboardData[0]?.totalleads || 0,
//           dashboardData[0]?.totalstudents || 0,
//           dashboardData[0]?.totalTasks || 0,
//           dashboardData[0]?.totalFollowUps || 0,
//         ],
//         backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384", "#4BC0C0"],
//       },
//     ],
//   };


//   const barChartData = {
//     labels: ["Total Leads", "Total Students", "Total Tasks", "Followed Up"],
//     datasets: [
//       {
//         label: "Dashboard Stats",
//         data: [
//           dashboardData[0]?.totalleads || 0,
//           dashboardData[0]?.totalstudents || 0,
//           dashboardData[0]?.totalTasks || 0,
//           dashboardData[0]?.totalFollowUps || 0,
//         ],
//         backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384", "#4BC0C0"],
//       },
//     ],
//   };


//   if (!hasPermission("Dashboard", "view")) {
//     return <div>You don't have access to view the Dashboard.</div>;
//   }

//   return (
//     <Container className="mt-4">
//       <div className="mb-4 px-2">
//         <h5 className="fw-bold">Hello, {counselorProfile.full_name}</h5>
//       </div>

//       <Row>
//         <Col md={12}>
//           <CounselorProfile
//             counselor={counselorProfile}
//             totalLeads={totalLeads}
//             completedLeads={completedLeads}
//           />
//         </Col>
//       </Row>

//       <Row className="mb-4">
//         {dashboardData.map((item, index) => (
//           <React.Fragment key={index}>

//             <Col md={4}>
//               <Card className="p-4 text-center shadow-lg bg-light">
//                 <h5>Total Students</h5>
//                 <h3>{item.totalstudents}</h3>
//               </Card>
//             </Col>
//             <Col md={4}>
//               <Card className="p-4 text-center shadow-lg bg-light">
//                 <h5>Total Tasks</h5>
//                 <h3>{item.totalTasks}</h3>
//               </Card>
//             </Col>
//             <Col md={4}>
//               <Card className="p-4 text-center shadow-lg bg-light">
//                 <h5>Followed Up</h5>
//                 <h3>{item.totalFollowUps}</h3>
//               </Card>
//             </Col>
//           </React.Fragment>
//         ))}
//       </Row>

//       <Row className="mb-5">
//         <Col md={6}>
//           <Card className="p-4 text-center shadow-lg" style={{ height: "400px" }}>
//             <h5>Lead Distribution</h5>
//             <Pie className="p-4" style={{ height: "500px", marginLeft: "auto", marginRight: "auto" }} data={pieChartData} />
//           </Card>
//         </Col>
//         <Col md={6}>
//           <Card className="p-4 text-center shadow-lg" style={{ height: "400px" }}>
//             <h5>Lead Status Overview</h5>
//             <Bar style={{ height: "500px" }} data={barChartData} />
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default CounselorDashboard;









// // CounselorDashboard.js
// import React, { useState, useEffect } from "react";
// import {
//   FaUsers,
//   FaUserGraduate,
//   FaUniversity,
//   FaTasks,
//   FaReply,
//   FaChartLine,
// } from "react-icons/fa";
// import Chart from "chart.js/auto";
// import { Bar } from "react-chartjs-2";
// import api from "../../interceptors/axiosInterceptor";
// import BASE_URL from "../../Config";


// const CounselorDashboard = () => {
//   const [filters, setFilters] = useState({});
//   const [metrics, setMetrics] = useState({
//     leads: 2,
//     students: 7,
//     universities: 6,
//     tasks: 2,
//     followups: 9,
//     followupsDue: 12,
//   });



//   const counselor_idmain = localStorage.getItem("counselor_id")
//   //   // Get dashboard data

//   useEffect(() => {
//     const allData = async () => {
//       try {
//         const dashData = await api.get(`${BASE_URL}getCounselorDashboardData?counselor_id=${counselor_idmain}`);
//         const data = dashData.data;
// console.log("datat", data)
//         // Handle object or array
//         if (Array.isArray(data)) {
//           setDashboardData(data);
//         } else {
//           setDashboardData([data]); // Convert object to array
//         }

//         if (data?.leads) {
//           setLeads(data.leads); // assuming leads are in response
//         }

//       } catch (error) {
//         console.log("Dashboard fetch error", error);
//       }
//     };

//     allData();
//   }, []);

//   const followupEfficiency = ((metrics.followups / metrics.followupsDue) * 100).toFixed(2);
//   const conversionRate = ((metrics.students / metrics.leads) * 100).toFixed(2);

//   const dummyLeads = [
//     { name: "John Doe", country: "India", intake: "Fall 2025", status: "Lead", followup: "2025-06-20" },
//   ];
//   const dummyApplications = [
//     { name: "Jane Smith", university: "ABC Univ", stage: "Offer", assigned: "2025-06-18" },
//   ];
//   const dummyFollowups = [

//     { type: "Call", date: "2025-06-20", remarks: "Interested", status: "Done" },
//   ];
//   const dummyTasks = [
//     { name: "Follow up with Rahul", due: "2025-06-26", status: "Pending" },
//   ];

//   const funnelData = {
//     labels: ["Inquiries", "Leads", "Students", "Applicants"],
//     datasets: [
//       {
//         label: "Count",
//         data: [7, metrics.leads, metrics.students, 5],
//         backgroundColor: "#5a67d8",
//       },
//     ],
//   };

//   return (
//     <div className="cd-wrapper">
//       {/* Filters */}
//       <div className="cd-filters full-width">
//         <select className="cd-select"><option>Date Range</option></select>
//         <select className="cd-select"><option>Country</option></select>
//         <select className="cd-select"><option>Status</option></select>
//         <select className="cd-select"><option>Intake</option></select>
//         <button className="cd-reset">Reset Filters</button>
//       </div>

//       {/* KPI Cards */}
//       <div className="cd-kpis">
//         <div className="cd-kpi-card"><FaUsers /><p>Total Leads</p><h2>{metrics.leads}</h2></div>
//         <div className="cd-kpi-card"><FaUserGraduate /><p>Total Students</p><h2>{metrics.students}</h2></div>
//         <div className="cd-kpi-card"><FaUniversity /><p>Total Universities</p><h2>{metrics.universities}</h2></div>
//         <div className="cd-kpi-card"><FaTasks /><p>Total Tasks</p><h2>{metrics.tasks}</h2></div>
//         <div className="cd-kpi-card"><FaReply /><p>Total Follow-ups</p><h2>{metrics.followups}</h2></div>
//         <div className="cd-kpi-card efficiency-box">
//           <FaChartLine />
//           <p>Efficiency</p>
//           <h2>Follow-up: {followupEfficiency}%</h2>
//           <h2>Conversion: {conversionRate}%</h2>
//         </div>
//       </div>

//       {/* Conversion Funnel & Performance */}
//       <div className="cd-charts">
//         <div className="cd-chart-box">
//           <h4>Conversion Funnel</h4>
//           <Bar data={funnelData} />
//         </div>
//         <div className="cd-chart-box">
//           <h4>Follow-up Gaps</h4>
//           <ul>
//             <li>2 leads not followed up in 7+ days</li>
//           </ul>
//         </div>
//         <div className="cd-chart-box">
//           <h4>Performance Tips</h4>
//           <ul>
//             <li>3 leads not contacted in 10 days</li>
//           </ul>
//         </div>
//       </div>

//       {/* Data Tables */}
//       <div className="cd-tables">
//         <h4>Recent Leads</h4>
//         <div className="cd-table-box">
//           <table className="cd-table">
//             <thead><tr><th>Name</th><th>Country</th><th>Intake</th><th>Status</th><th>Last Follow-up</th></tr></thead>
//             <tbody>
//               {dummyLeads.map((lead, i) => (
//                 <tr key={i}><td>{lead.name}</td><td>{lead.country}</td><td>{lead.intake}</td><td>{lead.status}</td><td>{lead.followup}</td></tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <h4>Student Application List</h4>
//         <div className="cd-table-box">
//           <table className="cd-table">
//             <thead><tr><th>Name</th><th>University</th><th>Stage</th><th>Assigned Date</th></tr></thead>
//             <tbody>
//               {dummyApplications.map((app, i) => (
//                 <tr key={i}><td>{app.name}</td><td>{app.university}</td><td>{app.stage}</td><td>{app.assigned}</td></tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <h4>Follow-up Table</h4>
//         <div className="cd-table-box">
//           <table className="cd-table">
//             <thead><tr><th>Type</th><th>Date</th><th>Remarks</th><th>Status</th></tr></thead>
//             <tbody>
//               {dummyFollowups.map((f, i) => (
//                 <tr key={i}><td>{f.type}</td><td>{f.date}</td><td>{f.remarks}</td><td>{f.status}</td></tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <h4>Upcoming Tasks</h4>
//         <div className="cd-table-box">
//           <table className="cd-table">
//             <thead><tr><th>Name</th><th>Due Date</th><th>Status</th></tr></thead>
//             <tbody>
//               {dummyTasks.map((t, i) => (
//                 <tr key={i}><td>{t.name}</td><td>{t.due}</td><td>{t.status}</td></tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CounselorDashboard;
















import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaUserGraduate,
  FaUniversity,
  FaTasks,
  FaReply,
  FaChartLine,
} from "react-icons/fa";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import api from "../../interceptors/axiosInterceptor";

const CounselorDashboard = () => {
  const [metrics, setMetrics] = useState({
    leads: 0,
    students: 0,
    universities: 0,
    tasks: 0,
    followups: 9,         // Static fallback
    followupsDue: 12,     // Static fallback
    inquiries: 0,
    applications: 0,
  });

  const [recentLeads, setRecentLeads] = useState([]);
  const [applications , studentApplications] = useState([]);

  const counselor_id = localStorage.getItem("counselor_id");

  useEffect(() => {
    if (counselor_id) {
      api
        .get(
          `getCounselorDashboardData?counselor_id=${counselor_id}`
        )
        .then((res) => {
          const kpi = res.data.kpi || {};
          setMetrics((prev) => ({
            ...prev,
            leads: kpi.totalLeads || 0,
            students: kpi.totalStudents || 0,
            universities: kpi.totalUniversities || 0,
            tasks: kpi.totalTasks || 0,
            inquiries: kpi.inquiries || 0,
            applications: kpi.applications || 0,
          }));

          setRecentLeads(res.data.recentLeads || []);
          studentApplications(res.data.applications || []);

        })
        .catch((err) => console.error("Error fetching dashboard data:", err));
    }
  }, [counselor_id]);

  const followupEfficiency = ((metrics.followups / metrics.followupsDue) * 100).toFixed(2);
  const conversionRate = ((metrics.leads > 0 ? metrics.students / metrics.leads : 0) * 100).toFixed(2);


  const dummyFollowups = [
    { type: "Call", date: "2025-06-20", remarks: "Interested", status: "Done" },
  ];
  const dummyTasks = [
    { name: "Follow up with Rahul", due: "2025-06-26", status: "Pending" },
  ];

  const funnelData = {
    labels: ["Inquiries", "Leads", "Students", "Applicants"],
    datasets: [
      {
        label: "Count",
        data: [metrics.inquiries, metrics.leads, metrics.students, metrics.applications],
        backgroundColor: "#5a67d8",
      },
    ],
  };

  return (
    <div className="cd-wrapper">
      {/* Filters */}
      <div className="cd-filters full-width">
        {/* Date Range */}
        <select className="cd-select">
          <option value="">Date Range</option>
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="Custom">Custom</option>
        </select>

        {/* Country */}
        <select className="cd-select">
          <option value="">Country</option>
          <option>Hungary</option>
          <option>UK</option>
          <option>Cyprus</option>
          <option>Canada</option>
          <option>Malaysia</option>
          <option>Lithuania</option>
          <option>Latvia</option>
          <option>Germany</option>
          <option>New Zealand</option>
          <option>USA</option>
          <option>Others</option>
        </select>

        {/* Status */}
        <select className="cd-select">
          <option value="">Status</option>
          <option>New</option>
          <option>In Review</option>
          <option>Converted to lead</option>
          <option>Not Interested</option>
          <option>Converted to student</option>
        </select>

        {/* Intake */}
        <select className="cd-select">
          <option value="">Intake</option>
          <option>Fabruary</option>
          <option>September</option>
          <option>Other</option>
        </select>

        <button className="cd-reset">Reset Filters</button>
      </div>


      {/* KPI Cards */}
      <div className="cd-kpis">
        <div className="cd-kpi-card"><FaUsers /><p>Total Leads</p><h2>{metrics.leads}</h2></div>
        <div className="cd-kpi-card"><FaUserGraduate /><p>Total Students</p><h2>{metrics.students}</h2></div>
        <div className="cd-kpi-card"><FaUniversity /><p>Total Universities</p><h2>{metrics.universities}</h2></div>
        <div className="cd-kpi-card"><FaTasks /><p>Total Tasks</p><h2>{metrics.tasks}</h2></div>
        <div className="cd-kpi-card"><FaReply /><p>Total Follow-ups</p><h2>{metrics.followups}</h2></div>
        <div className="cd-kpi-card efficiency-box">
          <FaChartLine />
          <p>Efficiency</p>
          <h2>Follow-up: {followupEfficiency}%</h2>
          <h2>Conversion: {conversionRate}%</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="cd-charts">
        <div className="cd-chart-box">
          <h4>Conversion Funnel</h4>
          <Bar data={funnelData} />
        </div>
        <div className="cd-chart-box">
          <h4>Follow-up Gaps</h4>
          <ul><li>2 leads not followed up in 7+ days</li></ul>
        </div>
        <div className="cd-chart-box">
          <h4>Performance Tips</h4>
          <ul><li>3 leads not contacted in 10 days</li></ul>
        </div>
      </div>

      {/* Tables */}
      <div className="cd-tables">
        <h4>Recent Leads</h4>
        <div className="cd-table-box">
          <table className="cd-table">
            <thead><tr><th>Name</th><th>Country</th><th>Intake</th><th>Status</th><th>Last Follow-up</th></tr></thead>
            <tbody>
              {recentLeads.map((lead, i) => (
                <tr key={i}>
                  <td>{lead.name}</td>
                  <td>{lead.country}</td>
                  <td>{lead.intake || "-"}</td>
                  <td>{lead.status}</td>
                  <td>{new Date(lead.last_follow_up).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4>Student Application List</h4>
        <div className="cd-table-box">
          <table className="cd-table">
            <thead><tr><th>Name</th><th>University</th><th>Stage</th><th>Assigned Date</th></tr></thead>
            <tbody>
              {applications.map((app, i) => (
                <tr key={i}><td>{app?.name}</td><td>{app.university}</td><td>{app?.stage}</td><td>{app.assigned_date}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4>Follow-up Table</h4>
        <div className="cd-table-box">
          <table className="cd-table">
            <thead><tr><th>Type</th><th>Date</th><th>Remarks</th><th>Status</th></tr></thead>
            <tbody>
              {dummyFollowups.map((f, i) => (
                <tr key={i}><td>{f.type}</td><td>{f.date}</td><td>{f.remarks}</td><td>{f.status}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4>Upcoming Tasks</h4>
        <div className="cd-table-box">
          <table className="cd-table">
            <thead><tr><th>Name</th><th>Due Date</th><th>Status</th></tr></thead>
            <tbody>
              {dummyTasks.map((t, i) => (
                <tr key={i}><td>{t.name}</td><td>{t.due}</td><td>{t.status}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CounselorDashboard;
