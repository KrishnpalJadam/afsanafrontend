import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {   FaUserGraduate, FaUsers, FaTasks, FaComments,   FaChalkboardTeacher, FaUniversity} from 'react-icons/fa';
import api from '../../interceptors/axiosInterceptor';
import BASE_URL from '../../Config';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`${BASE_URL}dashboard`);
                setDashboardData(res.data || {});
            } catch (error) {
                console.error('Dashboard fetch error:', error);
            }
        }; 
        fetchData(); 
    }, []);

    const cards = [
        { label: 'Total Leads', value: dashboardData.totalleads, icon: <FaComments />, bg: '#e0f7fa' },
        { label: 'Total Students', value: dashboardData.totalstudents, icon: <FaUserGraduate />, bg: '#e8f5e9' },
        { label: 'Total Counselors', value: dashboardData.totalcounselors, icon: <FaChalkboardTeacher />, bg: '#fff3e0' },
        { label: 'Total Universities', value: dashboardData.totalUniversities, icon: <FaUniversity />, bg: '#fce4ec' },
        { label: 'Total Tasks', value: dashboardData.totalTasks, icon: <FaTasks />, bg: '#ede7f6' },
        { label: 'Inquiries', value: dashboardData.totalInquiries, icon: <FaUsers />, bg: '#f3e5f5' },
    ];

    // Chart 1: Leads, Students, Counselors
    const chartOneData = {
        labels: ['Leads', 'Students', 'Counselors'],
        datasets: [{
            label: 'Count',
            data: [
                dashboardData.totalleads || 0,
                dashboardData.totalstudents || 0,
                dashboardData.totalcounselors || 0
            ],
            backgroundColor: ['#00aaf3', '#66bb6a', '#ffa726']
        }]
    };

    // Chart 2: Universities, Tasks, Inquiries, (optional extra)
    const chartTwoData = {
        labels: ['Universities', 'Tasks', 'Inquiries', ''],
        datasets: [{
            label: 'Count',
            data: [
                dashboardData.totalUniversities || 0,
                dashboardData.totalTasks || 0,
                dashboardData.totalInquiries || 0,
                0 // optional extra to balance 4 items
            ],
            backgroundColor: ['#ab47bc', '#42a5f5', '#ef5350', '#cfd8dc']
        }]
    };

    return (
        <Container fluid className="mt-4">
            <h2 className="text-center mb-4">🎓 Recruitment Admin Dashboard</h2>
            <Row className="g-4 mb-4">
                {cards.map((card, idx) => (
                    <Col md={4} lg={2} key={idx}>
                        <Card className="text-center shadow-sm p-3" style={{ backgroundColor: card.bg }}>
                            <div className="mb-2 fs-2">{card.icon}</div>
                            <h6>{card.label}</h6>
                            <h4 className="fw-bold" style={{marginLeft: "auto", marginRight: "auto"}}>{card.value ?? 0}</h4>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row>
                <Col md={6}>
                    <Card className="p-3 shadow-sm">
                        <h5>Lead, Student & Counselor Overview</h5>
                        <Bar data={chartOneData} />
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="p-3 shadow-sm">
                        <h5>University, Task & Inquiry Overview</h5>
                        <Bar data={chartTwoData} />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
