

import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import BASE_URL from '../../Config';
// import { Badge } from "react-bootstrap";
import {
  FaDownload,
  FaUser,
  FaGraduationCap,
  FaChartLine,
  FaFileAlt,
  FaCalendarAlt,
  FaTasks,
  FaComments,
} from "react-icons/fa";
import { ProgressBar, Card, Row, Col, Button, Badge } from "react-bootstrap";
import React from "react";


const students = [
  {
    studentId: 1001,
    name: "Hudson",
    idNo: "0201",
    class: "Class 1(A)",
    fatherName: "Emrys",
    dob: "02/06/2019",
    gender: "Male",
    category: "General",
    mobile: "16514840184",
    // Additional fields from inquiry form
    email: "hudson@example.com",
    city: "New York",
    address: "123 Main St",
    course: "Maths",
    source: "Whatsapp",
    inquiryType: "studentVisa",
    branch: "dhaka",
    assignee: "counselor1",
    country: "USA",
    dateOfInquiry: "2023-05-15",
    presentAddress: "123 Main St, New York",
    education: ["SSC", "HSC"],
    englishProficiency: ["Reading", "Writing"],
    jobExperience: {
      company: "ABC Corp",
      jobTitle: "Developer",
      duration: "2 years",
    },
    preferredCountries: ["Germany", "Canada"],
    status: "Active",
    urgency: "High",
    department: "Admissions",
  },
  {
    studentId: 1020,
    name: "Marlie",
    idNo: "0204",
    class: "Class 1(B)",
    fatherName: "Lester",
    dob: "05/22/2019",
    gender: "Female",
    category: "General",
    mobile: "6595084801",
    // Additional fields from inquiry form
    email: "marlie@example.com",
    city: "Los Angeles",
    address: "456 Oak Ave",
    course: "Science",
    source: "Facebook",
    inquiryType: "touristVisa",
    branch: "sylhet",
    assignee: "counselor2",
    country: "USA",
    dateOfInquiry: "2023-06-20",
    presentAddress: "456 Oak Ave, Los Angeles",
    education: ["Bachelor"],
    englishProficiency: ["Speaking", "Listening"],
    jobExperience: {
      company: "XYZ Inc",
      jobTitle: "Designer",
      duration: "3 years",
    },
    preferredCountries: ["Canada", "UK"],
    status: "In Progress",
    urgency: "Medium",
    department: "Registrar",
  },
  // Other student objects with similar additional fields
];

const student = {
  applicationSteps: [
    { step: "Application Form", status: "Completed" },
    { step: "Document Submission", status: "Completed" },
    { step: "Interview", status: "Pending" },
    { step: "Visa Process", status: "Pending" },
  ],
};

function StudentDetailsPage() {
  const [student , setStudent ] = useState()
  const { studentId } = useParams();
  console.log("ID1",studentId)
   
  // const selectedStudent = students.find(
  //   (student) => student.studentId.toString() === studentId
  // );

  // if (!selectedStudent) {
  //   return <div>Student not found</div>;
  // }
 useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}auth/getStudentById/${studentId}`
        );
        const data = await response.json();
        setStudent(data);
        console.log("Student data:", data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [studentId]);
  console.log("student",student)
  // Badge colors based on status
  const getBadge = (status) => {
    switch (status) {
      case "In Progress":
        return "success";
      case "Active":
        return "primary";
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      case "Low":
        return "info";
      default:
        return "secondary";
    }
  };


  return (
    <div className="container mt-5">
      {/* Profile Header */}
      <Row className="mb-4 align-items-center">
        <Col md={6} className="text-center mb-3 mb-md-0">
          <img
            style={{ height: "150px", width: "150px", objectFit: "cover" }}
             src={student?.photo}
            alt="Profile"
            className="img-fluid rounded-circle shadow-sm"
          />
        </Col>
        <Col md={6}>
          <h2 className="font-weight-bold text-primary">{student?.full_name}</h2>
          {/* <p className="text-muted">Last login: Today at 9:45 AM</p> */}
          <ProgressBar
            className="step-progress-bar"
            now={75}
            label={`Profile Completeness: 75%`}
            variant="info"
          />
        </Col>
      </Row>

      {/* Personal Information, Education & Progress */}
      <Row className="mb-4">
        {/* Personal Information */}
        <Col md={4} className="mb-3">
          <Card style={{ minHeight: "400px" }}>
            <Card.Header className="d-flex align-items-center">
              <FaUser className="mr-2" /> Personal Information
            </Card.Header>
            <Card.Body>
              <p>
                <strong>Full Name:</strong>{''} {student?.full_name}
              </p>
              <p>
                <strong>Date of Birth:</strong>{' '} {new Date(student?.date_of_birth).toLocaleDateString()}
              </p>
              <p>
                <strong>Email:</strong> {student?.email}
              </p>
              <p>
                <strong>Phone:</strong>  {student?.mobile_number}
              </p>
              {/* <p>
                <strong>Nationality:</strong> United States
              </p> */}
            </Card.Body>
          </Card>
        </Col>

        {/* Educational Background */}
        <Col md={4} className="mb-3">
          <Card style={{ minHeight: "400px" }}>
            <Card.Header className="d-flex align-items-center">
              <FaGraduationCap className="mr-2" /> Educational Background
            </Card.Header>
            <Card.Body>
              <p>
                <strong>High School:</strong> Lincoln High School
              </p>
              <p>
                <strong>Graduation Year:</strong> 2016
              </p>
              <p>
                <strong>GPA:</strong> 3.8/4.0
              </p>
              <p>
                <strong>Bachelor's Degree:</strong> University of California
              </p>
              <p>
                <strong>Major:</strong> Computer Science
              </p>
              <p>
                <strong>Graduation Year:</strong> 2020
              </p>
              <p>
                <strong>GPA:</strong> 3.5/4.0
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* Academic Progress */}
        <Col md={4} className="mb-3">
          <Card style={{ minHeight: "400px" }}>
            <Card.Header className="d-flex align-items-center">
              <FaChartLine className="mr-2" /> Academic Progress
            </Card.Header>
            <Card.Body>
              <p>
                <strong>Current Semester:</strong> Spring 2024
              </p>
              <ProgressBar
                className="step-progress-bar mb-3"
                now={83}
                label={`Credits: 15/18`}
              />
              <p>
                <strong>Overall Progress:</strong> 90/120 Credits
              </p>
              <ProgressBar
                className="step-progress-bar mb-3"
                now={75}
                label={`Total Progress`}
              />
              <p>
                <strong>Expected Graduation:</strong> May 2025
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Application Steps */}
      <Row>
        {student?.applicationSteps?.map((step, index) => (
          <Col md={6} key={index} className="mb-3">
            <Card>
              <Card.Header>{step.step}</Card.Header>
              <Card.Body>
                <p>
                  Status:{" "}
                  <Badge
                    bg={step.status === "Completed" ? "success" : "warning"}
                  >
                    {step.status}
                  </Badge>
                </p>
                {step.status === "Pending" && (
                  <Button variant="primary">Complete</Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Additional Details */}
      <Row>
        <Col md={12}>
          <Card className="mt-3 shadow-lg p-3 mb-5 bg-white rounded">
            <Card.Header>Additional Details</Card.Header>
            <Card.Body>
              <h6>Documents:</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  Passport: <Badge bg="success">Completed</Badge>
                </li>
                <li className="mb-2">
                  Offer Letter: <Badge bg="danger">Pending</Badge>
                </li>
                <li className="mb-2">
                  Visa Form: <Badge bg="warning">Pending</Badge>
                </li>
              </ul>
              <h6>Actions:</h6>
              <Button variant="success" className="me-2">
                Update Documents
              </Button>
              <Button variant="danger">Cancel Application</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Documents Section */}
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Header className="d-flex align-items-center">
              <FaFileAlt className="mr-2" /> Documents
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <strong>Passport:</strong> Uploaded on 01/15/2024
                <Button variant="link" className="ms-2">
                  <FaDownload /> Download
                </Button>
              </div>
              <div className="mb-3">
                <strong>High School Transcript:</strong> Uploaded on 01/10/2024
                <Button variant="link" className="ms-2">
                  <FaDownload /> Download
                </Button>
              </div>
              <div>
                <strong>Language Certificate:</strong> Uploaded on 01/14/2024
                <Button variant="link" className="ms-2">
                  <FaDownload /> Download
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Communication History, Upcoming Events, To-Do List */}
      <Row className="mb-4">
        {/* Communication History */}
        <Col md={4} className="mb-3">
          <Card style={{ minHeight: "300px" }}>
            <Card.Header className="d-flex align-items-center">
              <FaComments className="mr-2" /> Communication History
            </Card.Header>
            <Card.Body>
              <p className="mb-2">
                <strong>Application Status Update:</strong> Documents verified
                successfully (March 10, 2024)
              </p>
              <p className="mb-2">
                <strong>Interview Scheduling:</strong> Interview scheduled for
                March 15, 2024
              </p>
              <p>
                <strong>Document Request:</strong> Additional documentation
                required (March 5, 2024)
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* Upcoming Events */}
        <Col md={4} className="mb-3">
          <Card style={{ minHeight: "300px" }}>
            <Card.Header className="d-flex align-items-center">
              <FaCalendarAlt className="mr-2" /> Upcoming Events
            </Card.Header>
            <Card.Body>
              <p className="mb-2">
                <strong>Career Fair:</strong> March 20, 2024, 10:00 AM - 4:00 PM
              </p>
              <p>
                <strong>Workshop:</strong> Resume Building, March 25, 2024
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* To-Do List */}
        <Col md={4} className="mb-3">
          <Card style={{ minHeight: "300px" }}>
            <Card.Header className="d-flex align-items-center">
              <FaTasks className="mr-2" /> To-Do List
            </Card.Header>
            <Card.Body>
              <p className="mb-2">
                <strong>Submit Assignment:</strong> Due March 18, 2024
              </p>
              <p className="mb-2">
                <strong>Book Study Room:</strong> For Group Project
              </p>
              <p>
                <strong>Priority:</strong> Medium
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default StudentDetailsPage;