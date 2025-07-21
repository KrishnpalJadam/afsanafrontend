import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Line, Pie } from "react-chartjs-2";
import { FaComments, FaUserGraduate, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
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
import Visaprocesing from "../AdmissionTracking/Visaprocesing";

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
  const [selectedUniversityId, setSelectedUniversityId] = useState(null);
  const [data, setData] = useState({ totaltasks: 0, totalpayment: 0 });
  const [applicationStatus, setApplicationStatus] = useState({
    Application_stage: 0,
    Interview: 0,
    Visa_process: 0,
  });

  const stuId = localStorage.getItem("student_id");
  const role = localStorage.getItem("login");
  const user = JSON.parse(localStorage.getItem("login_detail"));

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
      key: "Application_stage",
      icon: <FaComments />,
      bg: "#e0f7fa",
    },
    {
      label: "Interview & Offer Process",
      key: "Interview",
      icon: <FaUserGraduate />,
      bg: "#e8f5e9",
    },
    {
      label: "Visa Process",
      key: "Visa_process",
      icon: <FaUsers />,
      bg: "#f3e5f5",
    },
  ];

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const permissionsResponse = await api.get(
          `/permission?role_name=${role}`
        );
        localStorage.setItem(
          "permissions",
          JSON.stringify(permissionsResponse.data)
        );
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };
    fetchPermissions();
  }, [role]);

  useEffect(() => {
    api
      .get(`${BASE_URL}universities`)
      .then((res) => {
        setUniversities(res.data);
        if (res.data.length > 0) {
          setSelectedUniversityId(res.data[0].id);
        }
      })
      .catch((err) => console.error("Error fetching universities:", err));
  }, []);

  useEffect(() => {
    if (selectedUniversityId) {
      const fetchApplicationData = async () => {
        try {
          const response = await api.get(
            `${BASE_URL}dashboardApplyUniveristy/${selectedUniversityId}/${stuId}`
          );
          setApplicationStatus(response.data);
        } catch (error) {
          console.error("Error fetching application data:", error);
        }
      };
      fetchApplicationData();
    }
  }, [selectedUniversityId]);

  if (!hasPermission("Dashboard", "view")) {
    return <div>You don't have access for Dashboard</div>;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://ssknf82q-3009.inc1.devtunnels.ms/api/studentsdashboard/${stuId}`
        );
        console.log(res);

        setData(res?.data?.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [stuId]);

  return (
    <Container fluid className="mt-4">
      <Card className="p-3 mb-4">
        <div className="d-flex justify-content-between">
          <h3>
            Welcome,{" "}
            <Link to={"/MainStudentDetails"} className="text-decoration-none">
              {user.full_name}
            </Link>
          </h3>
        </div>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Visaprocesing/>

          <Row className="row gx-3 mt-3">
            <div className="col-6">
              <div
                className="card p-3 text-center"
                style={{
                  background: "linear-gradient(145deg, #2a2fbd, #091d50)",
                  color: "white",
                }}
              >
                <i
                  class="fa-solid fa-list-check"
                  style={{ fontSize: "24px" }}
                ></i>
                <h5 className="mt-3">Total Tasks</h5>
                <h3>{data.totaltasks}</h3>
              </div>
            </div>

            <div className="col-6">
              <div
                className="card p-3 text-center"
                style={{
                  background: "linear-gradient(145deg, #2a2fbd, #091d50)",
                  color: "white",
                }}
              >
                <i
                  class="fa-solid fa-money-check-dollar "
                  style={{ fontSize: "24px" }}
                ></i>
                <h5 className="mt-3">Total Payment</h5>
                <h3>{data.totalpayments}</h3>
              </div>
            </div>
          </Row>

          {/* <Row className="text-center g-4 mt-3">
            {cards.map((item, index) => {
              const status =
                applicationStatus[item.key] === "1" ? "complete" : "incomplete";
              const badgeClass =
                status === "complete"
                  ? "bg-success"
                  : status === "pending"
                  ? "bg-warning text-dark"
                  : "bg-danger";

              return (
                <Col md={4} key={index}>
                  <Card className="p-3" style={{ backgroundColor: item.bg }}>
                    <div style={{ fontSize: "1.2rem" }}>{item.label}</div>
                    <span
                      className={`badge px-3 py-2 mt-2 fs-6 rounded-pill ${badgeClass}`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </Card>
                </Col>
              );
            })}
          </Row> */}
        </Card.Body>
      </Card>

      {/* <Row>
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
      </Row> */}
    </Container>
  );
};

export default Dashboard;
