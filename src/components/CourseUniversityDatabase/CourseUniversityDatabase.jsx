import React, { useEffect, useState } from "react";
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
import api from "../../interceptors/axiosInterceptor";

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

const CourseUniversityDatabase = () => {
  const [dateRange, setDateRange] = useState("last30");
  const [activeTab, setActiveTab] = useState("overview");


  const [overview, setOverview] = useState([])
  const [perfomance, setPerfomance] = useState([])
  const [application, setApplication] = useState([])






  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await api.get(`overview?range=${dateRange}`);
        setOverview([response.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOverview();
  }, [dateRange]); // Re-run when dateRange changes


  useEffect(() => {
    const fetchPerfomance = async () => {
      try {
        const response1 = await api.get(`counselorPerformance?range=${dateRange}`);
        setPerfomance(response1.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPerfomance();
  }, [dateRange]);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response2 = await api.get(`applicationPipline?range=${dateRange}`);
        setApplication([response2.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplication();
  }, [dateRange]);



  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response2 = await api.get(`applicationPipline?range=${dateRange}`);
        setApplication([response2.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplication();
  }, [dateRange]);
  const exportCSV = (data, filename = "report.csv") => {
    const headers = Object.keys(data[0]);
    const rows = data.map(obj => headers.map(header => `"${obj[header]}"`).join(','));
    const csvContent = [headers.join(','), ...rows].join('\n');

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };





  // Function to handle date range filtering
  const handleFilter = () => {
    console.log("Filtering reports for date range:", dateRange);
    // Logic to fetch or filter the data based on the selected date range
    // For example, re-fetch data using the dateRange
  };

  const handleExport = () => {
    if (activeTab === "overview" && overview.length > 0) {
      exportCSV(overview, "overview_report.csv");
    } else if (activeTab === "counselors" && perfomance.result?.length > 0) {
      exportCSV(perfomance.result, "counselor_performance.csv");
    } else if (activeTab === "trends" && application.length > 0) {
      exportCSV(application, "application_pipeline.csv");
    } else {
      console.warn("Nothing to export or unsupported tab.");
    }
  };

  return (
    <Container className="mt-3">
      {/* Header with Filters */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <h2>Reports & Analytics</h2>
        <div className="d-flex flex-wrap gap-3">
          {/* Date Range Filter */}
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

          {/* Filter Button */}
          <Button variant="secondary" style={{ border: "none" }} onClick={() => handleFilter()}>
            <FaFilter className="me-2" /> Filter
          </Button>

          {/* Export Report Button */}
          <Button variant="secondary" style={{ border: "none" }} onClick={() => handleExport()}>
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
            {overview?.map((item) => {
              return (
                <>
                  <Col xs={12} md={6} lg={3}>
                    <Card className="h-100">
                      <Card.Body>
                        <h6 className="text-muted">Total Inquiries</h6>
                        <h3>{item.total_inquiries}</h3>
                        {/* <div className="mt-3">
                          <small className="text-success">
                            ↑ 12.5% vs last period
                          </small>
                        </div> */}
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col xs={12} md={6} lg={3}>
                    <Card className="h-100">
                      <Card.Body>
                        <h6 className="text-muted">Active Applications</h6>
                        <h3>{item.total_Active_Applications}</h3>
                        <div className="mt-3">
                          {/* <small className="text-danger">↓ 2.1% vs last period</small> */}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={12} md={6} lg={3}>
                    <Card className="h-100">
                      <Card.Body>
                        <h6 className="text-muted">Comlete Applications</h6>
                        <h3>{item.total_fulfill_Applications}</h3>
                        <div className="mt-3">
                          {/* <small className="text-danger">↓ 2.1% vs last period</small> */}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={12} md={6} lg={3}>
                    <Card className="h-100">
                      <Card.Body>
                        <h6 className="text-muted">Follow-up Completion</h6>
                        <h3>
                          {item?.follow_up_stats.percentage}

                        </h3>
                        <ProgressBar className="mt-2">
                          <ProgressBar
                            style={{ height: "100%" }}
                            variant="success"
                            now={item?.follow_up_stats.percentage}
                            key={1}
                            label={`${item?.follow_up_stats.percentage}`}
                          />
                        </ProgressBar>
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              )

            })}

          </Row>


        </Tab>

        {/* Counselor Performance Tab */}
        <Tab eventKey="counselors" title="Counselor Performance">
          <Row className="g-4">
            {/* <Col xs={12}>
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
            </Col> */}
          </Row>

          <Row className="mt-4">
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0">Detailed Performance Metrics</h5>
                    {/* <Button variant="secondary" size="sm" style={{ border: "none" }}>
                      <FaDownload className="me-2" /> Export
                    </Button> */}
                  </div>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Sr.</th>
                        <th>Counselor</th>
                        <th>Total Leads</th>
                        <th>Active</th>
                        <th>Avg Response Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {perfomance?.result?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.counselor_name}</td>
                            <td>{item?.total_leads}</td>
                            <td>{item?.active}</td>
                            <td>{item?.avg_response_time}</td>
                          </tr>
                        );
                      })}
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

                      </tr>
                    </thead>
                    <tbody>
                      {application?.map((item) => {
                        return (
                          <>
                            <tr>
                              <td>New Inquiry</td>
                              <td>{item.total_inquiries}</td>

                            </tr>
                            <tr>
                              <td>Document Collection</td>
                              <td>{item.completed_tasks}</td>

                            </tr>
                            <tr>
                              <td>University Application</td>
                              <td>{item.completed_tasks}</td>

                            </tr>
                            <tr>
                              <td>Offer Received</td>
                              <td>{item.total_inquiries}</td>

                            </tr>
                          </>
                        )
                      })}

                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* Follow-up Analytics Tab */}

      </Tabs>
    </Container>
  );
};

export default CourseUniversityDatabase;