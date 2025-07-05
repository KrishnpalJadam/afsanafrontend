import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Line, Pie } from "react-chartjs-2";
import { FaComments, FaUserGraduate, FaUsers } from "react-icons/fa";
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
import BASE_URL from "../../Config";

ChartJS.register(
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

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

const Dashboard = () => {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversityId, setSelectedUniversityId] = useState(null); // Track selected university
  const [applicationStatus, setApplicationStatus] = useState({
    Application_stage: 0,
    Interview: 0,
    Visa_process: 0,
  });

  const applicationProgress = 50; // For progress bar demo
  const stuId = localStorage.getItem("student_id");

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

  const user = JSON.parse(localStorage.getItem("login_detail"));

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

  const pieOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const cards = [
    {
      label: "Application Stage",
      value: applicationStatus.Application_stage === 1 ? "complete" : "incomplete",
      icon: <FaComments />,
      bg: "#e0f7fa",
    },
    {
      label: "Interview & Offer Process",
      value: applicationStatus.Interview === 1 ? "complete" : "incomplete",
      icon: <FaUserGraduate />,
      bg: "#e8f5e9",
    },
    {
      label: "Embassy Documents Submission",
      value: applicationStatus.Visa_process === 1 ? "complete" : "incomplete",
      icon: <FaUsers />,
      bg: "#f3e5f5",
    },
  ];

  const role = localStorage.getItem("login");

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const permissionsResponse = await api.get(`/permission?role_name=${role}`);
        localStorage.setItem("permissions", JSON.stringify(permissionsResponse.data));
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    fetchPermissions();
  }, [role]);

  // Fetch universities and set the first university as the default
  useEffect(() => {
    api
      .get(`${BASE_URL}universities`)
      .then((res) => {
        setUniversities(res.data);
        if (res.data.length > 0) {
          // Set the first university as the default selected
          setSelectedUniversityId(res.data[0].id);
        }
      })
      .catch((err) => console.error("Error fetching universities:", err));
  }, []);

  // Fetch application data when university selection changes
  useEffect(() => {
    if (selectedUniversityId) {
      const fetchApplicationData = async () => {
        try {
          const response = await api.get(`${BASE_URL}dashboardApplyUniveristy/${selectedUniversityId}/${stuId}`);
          setApplicationStatus(response.data); // Update status based on response
        } catch (error) {
          console.error("Error fetching application data:", error);
        }
      };
      fetchApplicationData();
    }
  }, [selectedUniversityId]); // Fetch when university ID changes

  if (!hasPermission("Dashboard", "view")) {
    return <div> You don't have access for Dashboard</div>;
  }

  return (
    <Container fluid className="mt-4">
      <Card className="p-3 mb-4">
        <div className="d-flex justify-content-between">
          <h3>
            Welcome,
            <Link to={"/MainStudentDetails"} className="text-decoration-none">
              {user.full_name}
            </Link>
          </h3>
        </div>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h5>Check Application Journey</h5>
            </div>
            <div>
              <Form.Group className="mb-3 d-flex">
                <Form.Select
                  name="university_id"
                  value={selectedUniversityId}
                  onChange={(e) => setSelectedUniversityId(e.target.value)} // Update university selection
                >
                  <option value="">-- Select University For Status Check --</option>
                  {universities.map((uni) => (
                    <option key={uni.id} value={uni.id}>
                      {uni.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Row className="text-center g-4">
            {cards.map((item, index) => (
              <Col md={4} lg={4} key={index}>
                <Card className="p-3" style={{ backgroundColor: item.bg }}>
                  <div style={{ fontSize: "1.2rem" }}>{item.label}</div>
                  <span
                    className={`badge px-3 py-2 mt-2 fs-6 rounded-pill ${item.value === "complete"
                      ? "bg-success"
                      : item.value === "pending"
                        ? "bg-warning text-dark"
                        : "bg-danger"
                      }`}
                  >
                    {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
                  </span>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body style={{ height: "400px" }}>
              <h5 className="card-title">Applications Overview</h5>
              <Line data={lineData} options={lineOptions} height={300} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Body style={{ height: "400px" }}>
              <h5 className="card-title">Payment Status</h5>
              <Pie data={pieData} options={pieOptions} height={300} />
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container >
  );
};

export default Dashboard;





