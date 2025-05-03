import React, { useState } from "react";
import { Card, Table, Button, Container, Row, Col } from "react-bootstrap";
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
import CounselorProfile from "./CounselorProfile"; // Import the profile component

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// Dummy leads
const dummyLeads = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    status: "Pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    status: "Converted",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "555-555-5555",
    status: "Pending",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "444-444-4444",
    status: "Followed Up",
  },
  {
    id: 5,
    name: "Daniel Brown",
    email: "daniel@example.com",
    phone: "333-333-3333",
    status: "Converted",
  },
];

// Example counselor object with an activeSince date
const counselorProfile = {
  name: "Sarah Williams",
  email: "sarah.williams@example.com",
  phone: "999-888-7777",
  role: "Senior Counselor",
  imageUrl: "https://via.placeholder.com/200", // or your local image
  activeSince: "2023-01-01", // used to calculate how many days they've been active
};

const CounselorDashboard = () => {
  const [leads, setLeads] = useState(dummyLeads);

  // Count how many leads have each status
  const statusCounts = {
    Pending: leads.filter((lead) => lead.status === "Pending").length,
    Converted: leads.filter((lead) => lead.status === "Converted").length,
    "Followed Up": leads.filter((lead) => lead.status === "Followed Up").length,
  };

  // For progress bar: consider "Converted" or "Followed Up" as completed leads
  const completedLeads = statusCounts.Converted + statusCounts["Followed Up"];
  const totalLeads = leads.length;

  // Pie chart data
  const pieChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384"],
      },
    ],
  };

  // Bar chart data
  const barChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Leads",
        data: Object.values(statusCounts),
        backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <Container className="mt-4">
      <div className="mb-4 px-2">
        <h5 className="fw-bold">Hello, Sarah Williams</h5>
      </div>
      {/* -- Profile Section with ProgressBar for completed leads -- */}
      <Row>
        <Col md={12}>
          <CounselorProfile
            counselor={counselorProfile}
            totalLeads={totalLeads}
            completedLeads={completedLeads}
          />
        </Col>
      </Row>

      {/* Statistic Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Link to={"/leadCouncelor"} className="text-decoration-none">
            <Card className="p-4 text-center shadow-lg bg-light">
              <h5>Total Leads</h5>
              <h3>{totalLeads}</h3>
            </Card>
          </Link>
        </Col>
        <Col md={3}>
          <Card className="p-4 text-center shadow-lg bg-light">
            <h5>Pending</h5>
            <h3>{statusCounts.Pending}</h3>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-4 text-center shadow-lg bg-light">
            <h5>Converted</h5>
            <h3>{statusCounts.Converted}</h3>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-4 text-center shadow-lg bg-light">
            <h5>Followed Up</h5>
            <h3>{statusCounts["Followed Up"]}</h3>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="mb-5">
        <Col md={6}>
          <Card
            className="p-4 text-center shadow-lg"
            style={{ height: "650px" }}
          >
            <h5>Lead Distribution</h5>
            <Pie style={{ height: "500px" }} data={pieChartData} />
          </Card>
        </Col>
        <Col md={6}>
          <Card
            className="p-4 text-center shadow-lg"
            style={{ height: "650px" }}
          >
            <h5>Lead Status Overview</h5>
            <Bar style={{ height: "500px" }} data={barChartData} />
          </Card>
        </Col>
      </Row>

      {/* Lead List */}
    </Container>
  );
};

export default CounselorDashboard;
