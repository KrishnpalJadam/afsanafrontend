import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BASE_URL from '../../Config';
import {
  FaUser,
  FaGraduationCap,
  FaChartLine,
  FaAngleDoubleRight,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';
import axios from 'axios';
import api from '../../interceptors/axiosInterceptor';

function StudentDetailsPage() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [application, setApplication] = useState(null); // Start as null
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`${BASE_URL}auth/getStudentById/${studentId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    const fetchApplicationData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}studentApplication/${studentId}`);
        const data = res.data;

        if (!data || data.length === 0 || data.message === "No applications found for the given ID") {
          setApplication(null);
        } else {
          setApplication(data[0]); // ✅ extract the first application object
        }
      } catch (error) {
        console.error('Error fetching application:', error.response?.data || error.message);
        setApplication(null);
      }
    };


    fetchStudentData();
    fetchApplicationData();
  }, [studentId]);

  const labelMap = {
    flight_booking_confirmed: 'Flight Booking',
    online_enrollment_completed: 'Online Enrollment',
    accommodation_confirmation: 'Accommodation Confirmation',
    application_stage: 'Application Stage',
    interview: 'Interview',
    visa_process: 'Visa Process',
  };

  const completed = [];
  const pending = [];

  if (application && typeof application === 'object') {
    Object.entries(application).forEach(([key, value]) => {
      const readable =
        labelMap[key] || key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

      if (typeof value === 'string' && value.includes('uploads')) {
        completed.push(`${readable} Document`);
      } else if (value === '1') {
        completed.push(readable);
      } else if (value === '0' || !value) {
        pending.push(readable);
      }
    });
  }

  return (
    <div className="container mt-5">
      {/* Profile Header */}
      <Row className="mb-4 align-items-center text-center">
        <Col>
          <img
            src={student?.photo}
            alt="Profile"
            style={{ height: '150px', width: '150px', objectFit: 'cover' }}
            className="img-fluid rounded-circle shadow-sm mb-3 bg-white"
            crossOrigin=''
          />
          <h2 className="text-primary">{student?.full_name}</h2>
        </Col>
      </Row>

      {/* Personal Info, Completed, Pending */}
      <Row className="mb-4">
        {/* Personal Info */}
        <Col md={4}>
          <Card className="h-100">
            <Card.Header>
              <FaUser className="me-2" /> Personal Information
            </Card.Header>
            <Card.Body>
              <p><strong>Full Name:</strong> {student?.full_name}</p>
              <p><strong>Date of Birth:</strong> {student?.date_of_birth ? new Date(student?.date_of_birth).toLocaleDateString() : '-'}</p>
              <p><strong>Email:</strong> {student?.email}</p>
              <p><strong>Phone:</strong> {student?.mobile_number}</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Completed */}
        <Col md={4}>
          <Card className="h-100">
            <Card.Header>
              <FaGraduationCap className="me-2" /> Application Completed
            </Card.Header>
            <Card.Body>
              {completed.length > 0 ? (
                completed.slice(0, 5).map((item, index) => (
                  <p key={index}>
                    <Badge bg="success" className="me-2">
                      <FaCheckCircle className="me-1" /> {item}
                    </Badge>
                  </p>
                ))
              ) : (
                <p>No completed items found.</p>
              )}
            </Card.Body>

          </Card>
        </Col>

        {/* Pending */}
        <Col md={4}>
          <Card className="h-100">
            <Card.Header>
              <FaChartLine className="me-2" /> Application Pending
            </Card.Header>
            <Card.Body>
              {Array.isArray(pending) && pending.length > 0 ? (
                pending.slice(0, 5).map((item, index) => ( // ✅ Show only first 5
                  <p key={index}>
                    <Badge bg="warning" text="dark" className="me-2">
                      <FaTimesCircle className="me-1" /> {item}
                    </Badge>
                  </p>
                ))
              ) : (
                <p>All steps are incompleted!</p>
              )}
            </Card.Body>
          </Card>
        </Col>

      </Row>

      {/* More Details Button */}
      <div className="text-center mt-4">
        <Link to={`/student/${studentId}`}>
          <Button variant="primary">
            More Details <FaAngleDoubleRight className="ms-2" />
          </Button>
        </Link>

      </div>
    </div>
  );
}

export default StudentDetailsPage;
