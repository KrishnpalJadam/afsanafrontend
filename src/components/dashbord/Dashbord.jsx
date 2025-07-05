
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Table, Modal, Button } from 'react-bootstrap';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { FaUsers, FaUserGraduate, FaUserTie, FaUniversity, FaTasks, FaQuestionCircle, FaChartLine } from 'react-icons/fa';
import api from '../../interceptors/axiosInterceptor';
import BASE_URL from '../../Config';


// Register ChartJS Components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState({});
    const [counselors, setCounselors] = useState([]); // Counselor list
    const [showDateModal, setShowDateModal] = useState(false);
    const [customRange, setCustomRange] = useState({ start: '', end: '' });
    const [loading, setLoading] = useState(false);
    const [growthData, setGrowthData] = useState({
        this_month_conversion_rate: '0%',
        last_month_conversion_rate: '0%',
        growth_rate: '0%',
        top_counselors: [],
        conversion_funnel: { inquiries: 0, leadCount: 0, studentCount: 0, application: 0 },
        country_wise_converted_leads: []
    });

    const handleResetFilters = () => {
        setFilters({
            dateRange: '',
            country: '',
            counselor: '',
            status: '',
            intake: '',
            leadSource: ''
        });
        setCustomRange({ start: '', end: '' });
    };


    const [filters, setFilters] = useState({
        dateRange: '', // we're using this now
        country: '',
        counselor: '',
        status: '',
        intake: '',
        leadSource: ''
    });



    const getDateRange = (rangeType) => {
        const today = new Date();
        let startDate, endDate;

        switch (rangeType) {
            case 'Today':
                startDate = endDate = today;
                break;
            case 'This Week':
                startDate = new Date(today.setDate(today.getDate() - today.getDay()));
                endDate = new Date();
                break;
            case 'This Month':
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                endDate = new Date();
                break;
            default:
                return null;
        }

        const format = (d) => d.toISOString().split('T')[0];
        return { startDate: format(startDate), endDate: format(endDate) };
    };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let url = `${BASE_URL}dashboard`;
            let params = new URLSearchParams();

            // Date Range Handling
            if (filters.dateRange) {
                let range = null;

                if (filters.dateRange === 'Custom' && customRange.start && customRange.end) {
                    range = { startDate: customRange.start, endDate: customRange.end };
                } else {
                    range = getDateRange(filters.dateRange);
                }

                if (range) {
                    params.append('startDate', range.startDate);
                    params.append('endDate', range.endDate);
                }
            }

            // Country
            if (filters.country) {
                params.append('country', filters.country);
            }

            // Lead Source
            if (filters.leadSource) {
                params.append('source', filters.leadSource);
            }

            // Counselor (this will send ID)
            if (filters.counselor) {
                params.append('counselor_id', filters.counselor);
            }

            // Lead Status
            if (filters.status) {
                params.append('leadStatus', filters.status);
            }

            // Intake
            if (filters.intake) {
                params.append('intake', filters.intake);
            }

            try {
                const res = await api.get(`${url}?${params.toString()}`);
                setDashboardData(res.data || {});
            } catch (error) {
                console.error('Dashboard fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filters.dateRange, filters.country, filters.leadSource, filters.counselor, filters.status, filters.intake, customRange]);

    useEffect(() => {
        const fetchGrowthData = async () => {
            try {
                const res = await api.get(`${BASE_URL}dashboardinfo`);
                setGrowthData(res.data || {});
            } catch (error) {
                console.error('Failed to fetch growth data', error);
            }
        };

        fetchGrowthData();
    }, []);


    useEffect(() => {
        const fetchCounselors = async () => {
            try {
                const res = await api.get(`${BASE_URL}counselor`);  // Fetch counselor data
                setCounselors(res.data);  // Update the counselors state with data

            } catch (err) {
                console.error("Failed to fetch counselors", err);
            }
        };
        fetchCounselors();  // Call the function to fetch counselors
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'dateRange' && value === 'Custom') {
            setShowDateModal(true);  // Open the modal
        } else {
            setFilters({ ...filters, [name]: value });
        }
    };


    // Funnel Chart Data
    const funnelData = {
        labels: ['Inquiries', 'Leads', 'Students', 'Applicants'],
        datasets: [{
            label: 'Count',
            data: [
                growthData.conversion_funnel.inquiries || 0,
                growthData.conversion_funnel.leadCount || 0,
                growthData.conversion_funnel.studentCount || 0,
                growthData.conversion_funnel.application || 0
            ],
            backgroundColor: '#0d1b3d'
        }]
    };

    // Day mapping for labels
    const dayShortMap = {
        Monday: "Mon",
        Tuesday: "Tue",
        Wednesday: "Wed",
        Thursday: "Thu",
        Friday: "Fri",
        Saturday: "Sat",
        Sunday: "Sun"
    };

    // Heatmap Data
    const heatmapData = {
        labels: (growthData.weekly_inquiries_by_day || []).map(item => dayShortMap[item.day]),
        datasets: [{
            label: 'Inquiries',
            data: (growthData.weekly_inquiries_by_day || []).map(item => item.total_inquiries),
            borderColor: '#ff6600',
            backgroundColor: 'rgba(255, 102, 0, 0.3)',
            fill: true
        }]
    };



    // World Map simulation with Pie chart
    const countryData = {
        labels: (growthData.country_wise_converted_leads || []).map(item => item.country),
        datasets: [{
            data: (growthData.country_wise_converted_leads || []).map(item => item.inquiries),
            backgroundColor: ['#0d1b3d', '#ff6600', '#ffc107', '#198754', '#dc3545', '#00bcd4', '#8e44ad', '#ff4081']
        }]
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return `${label}: Inquiries ${value}`;
                    }
                }
            }
        }
    };


    // Define the cards array dynamically like your commented code
    const cards = [
        { key: 'totalLeads', label: 'Total Leads', value: dashboardData.totalleads, icon: <FaUsers />, bg: '#e0f7fa' },
        { key: 'totalStudents', label: 'Total Students', value: dashboardData.totalstudents, icon: <FaUserGraduate />, bg: '#e8f5e9' },
        { key: 'totalCounselors', label: 'Total Counselors', value: dashboardData.totalcounselors, icon: <FaUserTie />, bg: '#fff3e0' },
        { key: 'totalUniversities', label: 'Total Universities', value: dashboardData.totalUniversities, icon: <FaUniversity />, bg: '#fce4ec' },
        { key: 'totalTasks', label: 'Total Tasks', value: dashboardData.totalTasks, icon: <FaTasks />, bg: '#ede7f6' },
        { key: 'totalInquiries', label: 'Inquiries', value: dashboardData.totalInquiries, icon: <FaQuestionCircle />, bg: '#f3e5f5' },
    ];
    const handleCustomApply = (e) => {
        e.preventDefault();
        setShowDateModal(false);
        setFilters(prev => ({
            ...prev,
            dateRange: 'Custom'
        }));
        setTimeout(() => {
            setCustomRange({ start: '', end: '' });
        }, 300);
    };

    useEffect(() => {
        if (filters.dateRange !== 'Custom') {
            setCustomRange({ start: '', end: '' });
        }
    }, [filters.dateRange]);


    return (
        <Container fluid className="dashboard-container">
            <Modal show={showDateModal} onHide={() => setShowDateModal(false)} centered>
                <Form onSubmit={handleCustomApply}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select Custom Date Range</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={customRange.start}
                                onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={customRange.end}
                                onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDateModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Apply Filter
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>


            {/* Filters */}
            <div className="filters-row mb-4">

                {[
                    { name: 'dateRange', label: 'Date Range', options: ['Today', 'This Week', 'This Month', 'Custom'] },
                    {
                        name: 'country', label: 'Country', options: ['Hungary',
                            'UK',
                            'Cyprus',
                            'Canada',
                            'Malaysia',
                            'Lithuania',
                            'Latvia',
                            'Germany',
                            'New Zealand',
                            "usa",
                            'Others']
                    },
                    {
                        name: 'counselor',
                        label: 'Counselor',
                        options: counselors.map(c => ({ label: c.full_name, value: c.id }))
                    },

                    { name: 'status', label: 'Status', options: ['New', 'In Review', 'Converted to lead', 'Not Interested', 'Converted to student'] },
                    { name: 'intake', label: 'Intake', options: ['Fabruary', 'September', 'Other'] },
                    {
                        name: 'leadSource', label: 'Lead Source', options: ['Whatsapp', 'Facebook',
                            'YouTube',
                            'Website',
                            'Referral',
                            'Event',
                            'Agent',
                            'Office Visit',
                            'Hotline',
                            'Seminar',
                            'Expo',
                            'Other']
                    }
                ].map(filter => (
                    <Form.Select name={filter.name} onChange={handleChange} key={filter.name} className="filter-select" style={{ minWidth: "180px", marginRight: "10px" }}>
                        <option value="">{filter.label}</option>
                        {filter.options.map(opt => (
                            typeof opt === 'object'
                                ? <option key={opt.value} value={opt.value}>{opt.label}</option>
                                : <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </Form.Select>
                ))}
                <Button variant="outline-danger" className='btn' onClick={handleResetFilters}>
                    Reset Filters
                </Button>
            </div>

            {/* KPI Cards */}
            <Row className="g-4 mb-4">
                {cards.map((card, index) => (
                    <InfoCard
                        key={card.key}
                        icon={card.icon}
                        title={card.label}
                        value={card.value}
                        bg={card.bg}
                    />
                ))}
            </Row>


            <Card className="growth-bar mb-4">
                <div className="growth-text">
                    <div className='mb-2'>
                        <FaChartLine size={30} className="growth-icon" />
                        <h6>Leads Conversion Growth</h6>
                    </div>

                    <h5 style={{ color: '#fff' }}>This Month: {growthData.this_month_conversion_rate}</h5>
                    <h5 style={{ color: '#fff' }}>Last Month: {growthData.last_month_conversion_rate}</h5>

                    <h3 style={{ margin: 0, color: (parseFloat(growthData.growth_rate) >= 0 ? '#4caf50' : '#f44336') }}>
                        {parseFloat(growthData.growth_rate) >= 0 ? '🔺' : '🔻'} {growthData.growth_rate}
                    </h3>
                </div>
            </Card>



            {/* Main Content Split */}
            <Row className="g-4 mb-4">
                <Col md={8}>
                    <Card className="big-card">
                        <h5>Conversion Funnel</h5>
                        <Bar data={funnelData} />
                    </Card>

                    <Card className="big-card mt-4">
                        <h5>Inquiry Heatmap / Timeline</h5>
                        <Line data={heatmapData} />
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="big-card">
                        <h5>Top Performing Counselors</h5>
                        <Table hover responsive className="small-table">
                            <thead>
                                <tr><th>#</th><th>Name</th><th>Converted Lead</th></tr>
                            </thead>
                            <tbody>
                                {growthData.top_counselors.map((counselor, index) => (
                                    <tr key={counselor.counselor_id}>
                                        <td>{index + 1}</td>
                                        <td>{counselor.full_name}</td>
                                        <td>{counselor.converted_leads}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>


                    <Card className="big-card mt-4">
                        <h5>Lead/Student Country Map</h5>
                        <Pie data={countryData} options={options} />
                    </Card>
                </Col>
            </Row>

            {/* <Row>
                <Col md={12}>
                    <Card className="big-card">
                        <h5>Recent Activities & Tasks</h5>
                        <ul className="activities-list">
                            <li>Lead John updated to Student</li>
                            <li>Task assigned to Counselor A</li>
                            <li>Document submitted by Student B</li>
                        </ul>
                    </Card>
                </Col>
            </Row> */}
            {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255,255,255,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

        </Container>
    );
};

// KPI CARD COMPONENT
const InfoCard = ({ icon, title, value }) => (
    <Col md={2} xs={6}>
        <Card className="kpi-card text-center">
            <div className="icon">{icon}</div>
            <h6>{title}</h6>
            <h3>{value}</h3>
        </Card>
    </Col>
);

export default Dashboard;








// import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Dashboard = () => {
//   const [filters, setFilters] = useState({
//     handler: "",
//     university: "",
//     program: "",
//     stage: "",
//     visaStatus: "",
//     feeStatus: "",
//     complianceStatus: "",
//     intake: "",
//     country: "",
//     registration: "",
//     documentPercent: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   const handleFilter = () => {
//     // 👇 Yahan aap API call kar sakte ho filter values ke sath
//     console.log("Applied Filters:", filters);
//   };

//   return (
//     <div className="container mt-4">
//       <h4 className="mb-3">🎯 Student Filter Panel</h4>
//       <div className="row g-3">

//         <div className="col-md-4">
//           <label className="form-label">Compliance Officer / Handler</label>
//           <input type="text" className="form-control" name="handler" onChange={handleChange} />
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">University</label>
//           <input type="text" className="form-control" name="university" onChange={handleChange} />
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">Program Level</label>
//           <select className="form-select" name="program" onChange={handleChange}>
//             <option value="">Select</option>
//             <option value="Bachelor">Bachelor</option>
//             <option value="Master">Master</option>
//             <option value="Foundation">Foundation</option>
//           </select>
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">Application Stage</label>
//           <select className="form-select" name="stage" onChange={handleChange}>
//             <option value="">Select</option>
//             <option value="Document Upload Pending">Document Upload Pending</option>
//             <option value="Application Submitted">Application Submitted</option>
//             <option value="Tuition Fee Paid">Tuition Fee Paid</option>
//             <option value="Main Offer Letter Received">Main Offer Letter Received</option>
//             <option value="Visa Approved">Visa Approved</option>
//           </select>
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">Visa Status</label>
//           <select className="form-select" name="visaStatus" onChange={handleChange}>
//             <option value="">Select</option>
//             <option value="Applied">Applied</option>
//             <option value="In Process">In Process</option>
//             <option value="Approved">Approved</option>
//             <option value="Rejected">Rejected</option>
//             <option value="Appealed">Appealed</option>
//           </select>
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">Tuition Fee Payment</label>
//           <select className="form-select" name="feeStatus" onChange={handleChange}>
//             <option value="">Select</option>
//             <option value="Not Paid">Not Paid</option>
//             <option value="Partially Paid">Partially Paid</option>
//             <option value="Fully Paid">Fully Paid</option>
//           </select>
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">Compliance Verification</label>
//           <select className="form-select" name="complianceStatus" onChange={handleChange}>
//             <option value="">Select</option>
//             <option value="Verified">Verified by Compliance</option>
//             <option value="Under Review">Under Review</option>
//             <option value="Rejected">Rejected by Compliance</option>
//           </select>
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">Intake</label>
//           <select className="form-select" name="intake" onChange={handleChange}>
//             <option value="">Select</option>
//             <option value="Feb 2025">February 2025</option>
//             <option value="Sep 2025">September 2025</option>
//             <option value="Feb 2026">February 2026</option>
//           </select>
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">Country</label>
//           <select className="form-select" name="country" onChange={handleChange}>
//             <option value="">Select</option>
//             <option value="Hungary">Hungary</option>
//             <option value="Cyprus">Cyprus</option>
//           </select>
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">Registration Date</label>
//           <select className="form-select" name="registration" onChange={handleChange}>
//             <option value="">Select</option>
//             <option value="This Week">This Week</option>
//             <option value="This Month">This Month</option>
//           </select>
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">Document Completion %</label>
//           <select className="form-select" name="documentPercent" onChange={handleChange}>
//             <option value="">Select</option>
//             <option value="100%">100% Complete</option>
//             <option value="75-99%">75–99%</option>
//             <option value="<75%">Below 75%</option>
//           </select>
//         </div>

//         <div className="col-md-12 d-flex justify-content-end mt-3">
//           <button className="btn btn-primary" onClick={handleFilter}>
//             🔍 Apply Filters
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

