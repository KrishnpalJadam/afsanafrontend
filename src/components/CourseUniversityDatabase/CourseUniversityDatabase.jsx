import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Tabs,
  Tab,
  ProgressBar,
} from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import { FaDownload, FaFilter, FaSync } from "react-icons/fa";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports = () => {
  const [dateRange, setDateRange] = useState("last30");
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data
  const inquiryData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "New Inquiries",
        data: [65, 59, 80, 81],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Converted",
        data: [28, 48, 40, 19],
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
    ],
  };

  const counselorPerformance = {
    labels: ["John Smith", "Emma Wilson", "Michael Brown", "Sarah Davis"],
    datasets: [
      {
        label: "Conversion Rate (%)",
        data: [75, 68, 82, 71],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const leadSourceData = {
    labels: ["Website", "Social Media", "Referral", "Walk-in"],
    datasets: [
      {
        data: [300, 150, 100, 80],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
      },
    ],
  };

  const popularCourses = {
    labels: [
      "Computer Science",
      "Business Admin",
      "Engineering",
      "Medicine",
      "Law",
    ],
    datasets: [
      {
        label: "Applications",
        data: [65, 59, 80, 81, 56],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const followUpStatus = {
    completed: 150,
    pending: 45,
    total: 195,
  };

  return (
    <Container className="mt-3">
      {/* Header with Filters */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <h2>Reports & Analytics</h2>
        <div className="d-flex flex-wrap gap-3">
          <Form.Select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="last7">Last 7 Days</option>
            <option value="last30">Last 30 Days</option>
            <option value="last90">Last 90 Days</option>
            <option value="year">This Year</option>
          </Form.Select>
          <Button variant="secondary" style={{ border:"none"}}>
            <FaFilter className="me-2" /> Filter
          </Button>
          <Button variant="secondary" style={{ border:"none"}}>
            <FaDownload className="me-2" /> Export Report
          </Button>
        </div>
      </div>

      {/* Tabs for Different Reports */}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        {/* Overview Tab */}
        <Tab eventKey="overview" title="Overview">
          <Row className="g-4 mb-4">
            <Col xs={12} md={6} lg={3}>
              <Card className="h-100">
                <Card.Body>
                  <h6 className="text-muted">Total Inquiries</h6>
                  <h3>285</h3>
                  <div className="mt-3">
                    <small className="text-success">
                      ↑ 12.5% vs last period
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Card className="h-100">
                <Card.Body>
                  <h6 className="text-muted">Conversion Rate</h6>
                  <h3>42.8%</h3>
                  <div className="mt-3">
                    <small className="text-success">
                      ↑ 5.2% vs last period
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Card className="h-100">
                <Card.Body>
                  <h6 className="text-muted">Active Applications</h6>
                  <h3>156</h3>
                  <div className="mt-3">
                    <small className="text-danger">↓ 2.1% vs last period</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Card className="h-100">
                <Card.Body>
                  <h6 className="text-muted">Follow-up Completion</h6>
                  <h3>
                    {Math.round(
                      (followUpStatus.completed / followUpStatus.total) * 100
                    )}
                    %
                  </h3>
                <ProgressBar className="mt-2">
                <ProgressBar
                 style={{height:"100%"}}
                           variant="success"
                           now={followUpStatus.completed}
                           max={followUpStatus.total}
                             key={1} // Add a unique key for each ProgressBar (optional but recommended)
                                  label={`${Math.round(
                                       (followUpStatus.completed / followUpStatus.total) * 100
                                     )}%`} // Optional: Display percentage as a label
                               />
                       </ProgressBar>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* <Row className="g-4">
            <Col xs={12} lg={8}>
              <Card className="h-100">
                <Card.Body>
                  <h5 className="mb-4">Inquiry Funnel Trends</h5>
                  <Line
                    data={inquiryData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "bottom",
                        },
                      },
                    }}
                    height={300}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} lg={4}>
              <Card className="h-100">
                <Card.Body>
                  <h5 className="mb-4">Lead Sources</h5>
                  <Pie
                    data={leadSourceData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "bottom",
                        },
                      },
                    }}
                    height={300}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row> */}
        </Tab>

        {/* Counselor Performance Tab */}
        <Tab eventKey="counselors" title="Counselor Performance">
          <Row className="g-4">
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <h5 className="mb-4">Conversion Rate by Counselor</h5>
                  <Bar
                    data={counselorPerformance}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                    height={100}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0">Detailed Performance Metrics</h5>
                    <Button variant="secondary" size="sm" style={{ border:"none"}}>
                      <FaDownload className="me-2" /> Export
                    </Button>
                  </div>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Counselor</th>
                        <th>Total Leads</th>
                        <th>Active</th>
                        <th>Converted</th>
                        <th>Conversion Rate</th>
                        <th>Avg Response Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>John Smith</td>
                        <td>145</td>
                        <td>45</td>
                        <td>85</td>
                        <td>75%</td>
                        <td>2.5 hours</td>
                      </tr>
                      <tr>
                        <td>Emma Wilson</td>
                        <td>132</td>
                        <td>38</td>
                        <td>78</td>
                        <td>68%</td>
                        <td>1.8 hours</td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* Application Trends Tab */}
        <Tab eventKey="trends" title="Application Trends">
          <Row className="g-4">
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <h5 className="mb-4">Popular Courses</h5>
                  <Bar
                    data={popularCourses}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                    height={100}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <h5 className="mb-4">Application Pipeline</h5>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Stage</th>
                        <th>Count</th>
                        <th>Progress</th>
                        <th>Avg Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>New Inquiry</td>
                        <td>45</td>
                        <td>
                          <ProgressBar 
                             
                             now={45} variant="info" />
                        </td>
                        <td>2 days</td>
                      </tr>
                      <tr>
                        <td>Document Collection</td>
                        <td>38</td>
                        <td>
                          <ProgressBar now={45} variant="primary" />
                        </td>
                        <td>5 days</td>
                      </tr>
                      <tr>
                        <td>University Application</td>
                        <td>25</td>
                        <td>
                          <ProgressBar now={30} variant="warning" />
                        </td>
                        <td>10 days</td>
                      </tr>
                      <tr>
                        <td>Offer Received</td>
                        <td>18</td>
                        <td>
                          <ProgressBar now={20} variant="success" />
                        </td>
                        <td>15 days</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* Follow-up Analytics Tab */}
        <Tab eventKey="followups" title="Follow-up Analytics">
          <Row className="g-4">
            <Col xs={12} lg={8}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0">Follow-up Status</h5>
                    <Button variant="secondary" size="sm" style={{ border:"none"}}>
                      <FaSync className="me-2" /> Refresh
                    </Button>
                  </div>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Counselor</th>
                        <th>Pending</th>
                        <th>Completed</th>
                        <th>Completion Rate</th>
                        <th>Next Due</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>John Smith</td>
                        <td>12</td>
                        <td>45</td>
                        <td>79%</td>
                        <td>Today</td>
                      </tr>
                      <tr>
                        <td>Emma Wilson</td>
                        <td>8</td>
                        <td>38</td>
                        <td>83%</td>
                        <td>Tomorrow</td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} lg={4}>
              <Card className="h-100">
                <Card.Body>
                  <h5 className="mb-4">Follow-up Completion</h5>
                  <div className="text-center mb-4">
                    <h2>
                      {Math.round(
                        (followUpStatus.completed / followUpStatus.total) * 100
                      )}
                      %
                    </h2>
                    <p className="text-muted">Overall Completion Rate</p>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Completed</span>
                      <span>{followUpStatus.completed}</span>
                    </div>
                    <ProgressBar variant="success" now={100} className="mb-3" />
                    <div className="d-flex justify-content-between mb-2">
                      <span>Pending</span>
                      <span>{followUpStatus.pending}</span>
                    </div>
                    <ProgressBar variant="warning" now={100} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Reports;