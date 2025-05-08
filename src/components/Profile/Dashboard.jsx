import React,{useEffect} from "react";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import { Line, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../../interceptors/axiosInterceptor";
import { hasPermission } from "../../authtication/permissionUtils";

ChartJS.register(
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const steps = [
    "Complete Profile",
    "Start Applying",
    "Review & Submit",
    "Get Your Results",
    "Apply for Visa",
    "Enroll & Settle",
  ];

  const applicationProgress = 50; // For progress bar demo

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Applications",
        data: [5, 10, 8, 15, 20],
        borderColor: "#007bff",
        fill: false,
      },
    ],
  };
  const user = JSON.parse(localStorage.getItem("login_detail"))
  console.log(user)

  const pieData = {
    labels: ["Paid", "Due"],
    datasets: [
      {
        data: [3000, 1500],
        backgroundColor: ["#28a745", "#dc3545"],
        hoverOffset: 4,
      },
    ],
  };

  // Add this options object for Pie Chart
  const pieOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };
   const role = localStorage.getItem("login")
    useEffect(() => {
      const fetchPermissions = async () => {
        try {
          const permissionsResponse = await api.get(`permission?role_name=${role}`);
          console.log("fyh", permissionsResponse);
          localStorage.setItem("permissions", JSON.stringify(permissionsResponse.data));
        } catch (error) {
          console.error("Error fetching permissions:", error);
        }
      };
    
      fetchPermissions();
    }, [role]);

  // Add this options for Line chart as well (optional, to be consistent)
  const lineOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };
  
   
    if(!hasPermission("Dashboard","view")){
      return <div> You doesn't have access for Dashboard</div>
    }
  

  return (
    <Container fluid className="mt-4">
      <Card className="p-3 mb-4">
        <div className="d-flex justify-content-between">
          <h4>
            Welcome,
            <Link to={"/MainStudentDetails"} className="text-decoration-none">
              {user.full_name}
            </Link>
          </h4>
          {/* <span>Last login: Today at 9:45 AM</span> */}
        </div>
        <ProgressBar
          className="step-progress-bar"
          now={applicationProgress}
          label={`${applicationProgress}%`}
        />
      </Card>
      <h3 className="mb-4">Welcome to Your Dashboard</h3>
      {/* Progress Tracker */}
      <Card className="mb-4">
        <Card.Body>
          <h5>Application Journey</h5>
          <Row className="text-center">
            {steps.map((step, index) => (
              <Col key={index}>
                <div style={{ fontSize: "0.85rem" }}>{step}</div>
                <ProgressBar
                  now={(index + 1) * (100 / steps.length)}
                  variant="info"
                  style={{ height: "8px", marginTop: "5px" }}
                />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
      <Row>
        {/* Applications Graph */}
        {/* Applications Graph */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body style={{ height: "400px" }}>
              <h5 className="card-title">Applications Overview</h5>
              <Line data={lineData} options={lineOptions} height={300} />
            </Card.Body>
          </Card>
        </Col>

        {/* Payment Graph */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body style={{ height: "400px" }}>
              <h5 className="card-title">Payment Status</h5>
              <Pie data={pieData} options={pieOptions} height={300} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
