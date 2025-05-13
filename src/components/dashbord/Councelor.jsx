// import React, { useEffect, useState } from "react";
// import { Card, Table, Button, Container, Row, Col } from "react-bootstrap";
// import { Pie, Bar } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, } from "chart.js";
// import { Link } from "react-router-dom";
// import CounselorProfile from "./CounselorProfile"; // Import the profile component
// import api from "../../interceptors/axiosInterceptor";
// import { hasPermission } from "../../authtication/permissionUtils";
// import BASE_URL from "../../Config";
// ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// // Dummy leads
// const dummyLeads = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     phone: "123-456-7890",
//     status: "Pending",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@example.com",
//     phone: "987-654-3210",
//     status: "Converted",
//   },
//   {
//     id: 3,
//     name: "Mike Johnson",
//     email: "mike@example.com",
//     phone: "555-555-5555",
//     status: "Pending",
//   },
//   {
//     id: 4,
//     name: "Emily Davis",
//     email: "emily@example.com",
//     phone: "444-444-4444",
//     status: "Followed Up",
//   },
//   {
//     id: 5,
//     name: "Daniel Brown",
//     email: "daniel@example.com",
//     phone: "333-333-3333",
//     status: "Converted",
//   },
// ];

// // Example counselor object with an activeSince date
// const counselorProfile = {
//   name: "Sarah Williams",
//   email: "sarah.williams@example.com",
//   phone: "999-888-7777",
//   role: "Senior Counselor",
//   imageUrl: "https://via.placeholder.com/200",
//   activeSince: "2023-01-01",
// };

// const CounselorDashboard = () => {
//   const [leads, setLeads] = useState(dummyLeads);
//   const [dashboardData, setdashboardData] = useState([])
//   const [counselorProfile, setCounselorProfile] = useState([])
//   const role = localStorage.getItem("login")
//   useEffect(() => {
//     const fetchPermissions = async () => {
//       try {
//         const permissionsResponse = await api.get(`permission?role_name=${role}`);
//         console.log("fyh", permissionsResponse);
//         localStorage.setItem("permissions", JSON.stringify(permissionsResponse.data));
//       } catch (error) {
//         console.error("Error fetching permissions:", error);
//       }
//     };

//     fetchPermissions();
//   }, [role]);


//   useEffect(() => {
//     const loginDetail = localStorage.getItem("login_detail")
//     if (loginDetail) {
//       setCounselorProfile(JSON.parse(loginDetail))
//     }
//   }, [])


//   // get dashbiard data 

//   useEffect(() => {
//     const allData = async () => {
//       try {
//         const dashData = await api.get(`${BASE_URL}dashboard`)
//         setdashboardData(Array.isArray(dashData.data) ? dashData.data : []);

//         console.log(dashData.data)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     allData()
//   }, [])


//   // Count how many leads have each status
//   const statusCounts = {
//     Pending: leads.filter((lead) => lead.status === "Pending").length,
//     Converted: leads.filter((lead) => lead.status === "Converted").length,
//     "Followed Up": leads.filter((lead) => lead.status === "Followed Up").length,
//   };

//   // For progress bar: consider "Converted" or "Followed Up" as completed leads
//   const completedLeads = statusCounts.Converted + statusCounts["Followed Up"];
//   const totalLeads = leads.length;

//   // Pie chart data
//   const pieChartData = {
//     labels: Object.keys(statusCounts),
//     datasets: [
//       {
//         data: Object.values(statusCounts),
//         backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384"],
//       },
//     ],
//   };

//   // Bar chart data
//   const barChartData = {
//     labels: Object.keys(statusCounts),
//     datasets: [
//       {
//         label: "Leads",
//         data: Object.values(statusCounts),
//         backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384"],
//       },
//     ],
//   };




//   if (!hasPermission("Dashboard", "view")) {
//     return <div> You doesn't have access for Dashboard</div>
//   }
//   return (
//     <Container className="mt-4">
//       <div className="mb-4 px-2">
//         <h5 className="fw-bold">Hello, {counselorProfile.full_name}</h5>
//       </div>
//       {/* -- Profile Section with ProgressBar for completed leads -- */}
//       <Row>
//         <Col md={12}>
//           <CounselorProfile
//             counselor={counselorProfile}
//             totalLeads={totalLeads}
//             completedLeads={completedLeads} />
//         </Col>
//       </Row>

//       {/* Statistic Cards */}
//       <Row className="mb-4">
//         {dashboardData?.map((item) => {
//           return (
//             <>
//               <Col md={3}>
//                 <Link to={"/leadCouncelor"} className="text-decoration-none">
//                   <Card className="p-4 text-center shadow-lg bg-light">
//                     <h5>Total Leads</h5>
//                     <h3>{item?.totalleads}</h3>
//                   </Card>
//                 </Link>
//               </Col>
//               <Col md={3}>
//                 <Card className="p-4 text-center shadow-lg bg-light">
//                   <h5>Total Students</h5>
//                   <h3>{item?.totalstudents}</h3>
//                 </Card>
//               </Col>
//               <Col md={3}>
//                 <Card className="p-4 text-center shadow-lg bg-light">
//                   <h5>Total Tasks</h5>
//                   <h3>{item?.totalTasks}</h3>
//                 </Card>
//               </Col>
//               <Col md={3}>
//                 <Card className="p-4 text-center shadow-lg bg-light">
//                   <h5>Followed Up</h5>
//                   <h3>{item.totalFollowUps}</h3>
//                 </Card>
//               </Col>
//             </>
//           )
//         })}
//       </Row>

//       {/* Charts */}
//       <Row className="mb-5">
//         <Col md={6}>
//           <Card className="p-4 text-center shadow-lg"
//             style={{ height: "650px" }}>
//             <h5>Lead Distribution</h5>
//             <Pie style={{ height: "500px" }} data={pieChartData} />
//           </Card>
//         </Col>
//         <Col md={6}>
//           <Card
//             className="p-4 text-center shadow-lg"
//             style={{ height: "650px" }}>
//             <h5>Lead Status Overview</h5>
//             <Bar style={{ height: "500px" }} data={barChartData} />
//           </Card>
//         </Col>
//       </Row>

//       {/* Lead List */}
//     </Container>
//   );
// };

// export default CounselorDashboard;









import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Link } from "react-router-dom";
import CounselorProfile from "./CounselorProfile";
import api from "../../interceptors/axiosInterceptor";
import { hasPermission } from "../../authtication/permissionUtils";
import BASE_URL from "../../Config";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const CounselorDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [counselorProfile, setCounselorProfile] = useState({});
  const role = localStorage.getItem("login");

  // Fetch permissions
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const permissionsResponse = await api.get(`permission?role_name=${role}`);
        localStorage.setItem("permissions", JSON.stringify(permissionsResponse.data));
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    if (role) fetchPermissions();
  }, [role]);

  // Get login detail
  useEffect(() => {
    const loginDetail = localStorage.getItem("login_detail");
    if (loginDetail) {
      setCounselorProfile(JSON.parse(loginDetail));
    }
  }, []);
  const counselor_idmain = localStorage.getItem("counselor_id")
  // Get dashboard data
  useEffect(() => {
    const allData = async () => {
      try {
        const dashData = await api.get(`${BASE_URL}dashboard/${counselor_idmain}`);
        const data = dashData.data;

        // Handle object or array
        if (Array.isArray(data)) {
          setDashboardData(data);
        } else {
          setDashboardData([data]); // Convert object to array
        }

        if (data?.leads) {
          setLeads(data.leads); // assuming leads are in response
        }

      } catch (error) {
        console.log("Dashboard fetch error", error);
      }
    };

    allData();
  }, []);

  // Dynamic lead status counts
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const completedLeads = (statusCounts["Converted"] || 0) + (statusCounts["Followed Up"] || 0);
  const totalLeads = leads.length;

  const pieChartData = {
    labels: ["Total Leads", "Total Students", "Total Tasks", "Followed Up"],
    datasets: [
      {
        data: [
          dashboardData[0]?.totalleads || 0,
          dashboardData[0]?.totalstudents || 0,
          dashboardData[0]?.totalTasks || 0,
          dashboardData[0]?.totalFollowUps || 0,
        ],
        backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384", "#4BC0C0"],
      },
    ],
  };


  const barChartData = {
    labels: ["Total Leads", "Total Students", "Total Tasks", "Followed Up"],
    datasets: [
      {
        label: "Dashboard Stats",
        data: [
          dashboardData[0]?.totalleads || 0,
          dashboardData[0]?.totalstudents || 0,
          dashboardData[0]?.totalTasks || 0,
          dashboardData[0]?.totalFollowUps || 0,
        ],
        backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384", "#4BC0C0"],
      },
    ],
  };


  if (!hasPermission("Dashboard", "view")) {
    return <div>You don't have access to view the Dashboard.</div>;
  }

  return (
    <Container className="mt-4">
      <div className="mb-4 px-2">
        <h5 className="fw-bold">Hello, {counselorProfile.full_name}</h5>
      </div>

      <Row>
        <Col md={12}>
          <CounselorProfile
            counselor={counselorProfile}
            totalLeads={totalLeads}
            completedLeads={completedLeads}
          />
        </Col>
      </Row>

      <Row className="mb-4">
        {dashboardData.map((item, index) => (
          <React.Fragment key={index}>
            <Col md={3}>
              <Link to="/leadCouncelor" className="text-decoration-none">
                <Card className="p-4 text-center shadow-lg bg-light">
                  <h5>Total Leads</h5>
                  <h3>{item.totalleads}</h3>
                </Card>
              </Link>
            </Col>
            <Col md={3}>
              <Card className="p-4 text-center shadow-lg bg-light">
                <h5>Total Students</h5>
                <h3>{item.totalstudents}</h3>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="p-4 text-center shadow-lg bg-light">
                <h5>Total Tasks</h5>
                <h3>{item.totalTasks}</h3>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="p-4 text-center shadow-lg bg-light">
                <h5>Followed Up</h5>
                <h3>{item.totalFollowUps}</h3>
              </Card>
            </Col>
          </React.Fragment>
        ))}
      </Row>

      <Row className="mb-5">
        <Col md={6}>
          <Card className="p-4 text-center shadow-lg" style={{ height: "400px" }}>
            <h5>Lead Distribution</h5>
            <Pie className="p-4" style={{ height: "500px", marginLeft: "auto", marginRight: "auto" }} data={pieChartData} />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-4 text-center shadow-lg" style={{ height: "400px" }}>
            <h5>Lead Status Overview</h5>
            <Bar style={{ height: "500px" }} data={barChartData} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CounselorDashboard;
