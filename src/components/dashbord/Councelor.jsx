





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
           
            <Col md={4}>
              <Card className="p-4 text-center shadow-lg bg-light">
                <h5>Total Students</h5>
                <h3>{item.totalstudents}</h3>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-4 text-center shadow-lg bg-light">
                <h5>Total Tasks</h5>
                <h3>{item.totalTasks}</h3>
              </Card>
            </Col>
            <Col md={4}>
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
