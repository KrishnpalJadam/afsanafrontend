import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar, Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, BubbleController } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, BubbleController);

const Dashboard = () => {
    return (
        <Container fluid className="mt-4">
            <h2 className="text-center">RECRUITMENT DASHBOARD</h2>
            <Row className="mb-4">
                <Col md={3}><Card className="p-3 text-center bg-light"><h5>AVERAGE ENROLLMENT RATE</h5><h3>6.5%</h3></Card></Col>
                <Col md={3}><Card className="p-3 text-center bg-light"><h5>TARGET ENROLLMENT RATE</h5><h3>2.5%</h3></Card></Col>
                <Col md={3}><Card className="p-3 text-center bg-light"><h5>STUDENT COUNT</h5><h3>130</h3></Card></Col>
                <Col md={3}><Card className="p-3 text-center bg-light"><h5>CURRENT REMOVALS</h5><h3>12</h3></Card></Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Card className="p-3">
                        <h5>Lead Management</h5>
                        <Bar data={{
                            labels: ['102', '239', '112', '114', '74', '3'],
                            datasets: [{ label: 'Leads', data: [102, 239, 112, 114, 74, 3], backgroundColor: '#00aaf3' }]
                        }} />
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="p-3">
                        <h5>Application Tracking</h5>
                        <Bubble data={{
                            datasets: [{ label: 'Applications', data: [{ x: 10, y: 60, r: 10 }, { x: 20, y: 40, r: 20 }, { x: 30, y: 80, r: 30 }], backgroundColor: '#00aaf3' }]
                        }} />
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={6}>
                    <Card className="p-3">
                        <h5>Student Performance</h5>
                        <Bar data={{
                            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            datasets: [{ label: 'Performance', data: [80, 75, 90, 85, 70, 50, 10], backgroundColor: '#00aaf3' }]
                        }} />
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="p-3">
                        <h5>Staff Distribution by Department</h5>
                        <Bar data={{
                            labels: ['Recruiters', 'Admission', 'Legal', 'Marketing', 'Finance', 'Product', 'Human'],
                            datasets: [{ label: 'Staff', data: [100, 90, 85, 80, 70, 60, 50], backgroundColor: '#00aaf3' }]
                        }}
                        options={{
                            indexAxis: 'y'  // Converts Bar Chart to Horizontal Bar Chart
                        }} />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;