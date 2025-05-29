
import React, { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Tab,
  Tabs,
} from "react-bootstrap";
import api from "../../interceptors/axiosInterceptor";
import BASE_URL from "../../Config";
import { hasPermission } from "../../authtication/permissionUtils";
import { Link, useNavigate } from "react-router-dom";
import { FaAnglesRight } from "react-icons/fa6";

const Profile = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const id = localStorage.getItem('student_id')
    api.get(`${BASE_URL}auth/getStudentById/${id}`)
      .then(response => {
        setStudent(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);


  return (
    <Container className="mt-4">
      <Card className="shadow mb-4">
        <Card.Body>
          <Row>
            <Col md={2} className="text-center">
              <img
                src={student?.photo}
                alt="Student Photo" crossorigin="anonymous"
                style={{ height: "150px", width: "150px", objectFit: "cover", borderRadius: "50%" }}
              />

            </Col>
            <Col md={10} className="text-center mt-3">
              <h3>{student?.full_name}</h3>
              <p>Email: {student?.email}</p>
              <p>Phone: {student?.mobile_number}</p>
              <Button variant="outline-primary" size="sm" disabled={!hasPermission("Student Details", "add")} onClick={() => { navigate("/profile") }}>
                Edit Profile
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Tabs defaultActiveKey="personal" className="mb-4">
        {/* Personal Info */}
        <Tab eventKey="personal" title="Personal Info">
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <strong>Id no:</strong> {student?.id_no}
                </Col>
                <Col md={6}>
                  <strong>Admision No.:</strong> {student?.admission_no}
                </Col>
                <Col md={6} className="mt-2">
                  <strong>Date of Birth:</strong> {student?.date_of_birth}
                </Col>
                <Col md={6} className="mt-2">
                  <strong>Gender:</strong> {student?.gender}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Father Name:</strong> {student?.father_name}
                </Col>
                <Col md={6}>
                  <strong>Address:</strong> {student?.address}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Category:</strong> {student?.category}
                </Col>
                <Col md={6}>
                  <strong>DOB:</strong> {student?.date_of_birth}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Alternate Email:</strong> {student?.email}
                </Col>
                <Col md={6}>
                  <strong>Emergency Contact:</strong> {student?.mobile_number}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>

        {/* Academic Info */}
        {/* <Tab eventKey="academic" title="Education">
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <strong>Qualification:</strong> B.Tech in Computer Science
                </Col>
                <Col md={6}>
                  <strong>University:</strong> XYZ Technical University
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Year of Passing:</strong> 2022
                </Col>
                <Col md={6}>
                  <strong>Grade:</strong> 8.5 CGPA
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>10th Board:</strong> CBSE
                </Col>
                <Col md={6}>
                  <strong>10th Marks:</strong> 92%
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>12th Board:</strong> CBSE
                </Col>
                <Col md={6}>
                  <strong>12th Marks:</strong> 89%
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Backlogs:</strong> None
                </Col>
                <Col md={6}>
                  <strong>Medium of Instruction:</strong> English
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab> */}

        {/* Documents */}

        {/* <Tab eventKey="documents" title="Documents">
          <Row>
            {[
              { title: "Passport", file: "Passport.pdf", status: "✅" },
              {
                title: "Academic Transcript",
                file: "Academic Transcript.pdf",
                status: "✅",
              },
              { title: "IELTS Score", file: "IELTS Score.pdf", status: "✅" },
              { title: "SOP", file: "Statement of Purpose.pdf", status: "✅" },
              {
                title: "LOR",
                file: "Letter of Recommendation.pdf",
                status: "✅",
              },
            ].map((doc, idx) => (
              <Col md={4} key={idx} className="mb-3">
                <Card className="h-100 shadow-sm border-info">
                  <Card.Body>
                    <Card.Title>{doc.title}</Card.Title>
                    <Card.Text>{doc.file}</Card.Text>
                    <Button variant="outline-primary" size="sm">
                      View {doc.status}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-end mt-2">
            <Button variant="outline-success" size="sm">
              Upload More
            </Button>
          </div>
        </Tab> */}

        {/* Preferences */}
        {/* <Tab eventKey="preferences" title="Study Preferences">
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <strong>Preferred Country:</strong> Canada
                </Col>
                <Col md={6}>
                  <strong>Intake:</strong> Fall 2025
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Program Interest:</strong> Computer Science
                </Col>
                <Col md={6}>
                  <strong>Visa Guidance Required:</strong> Yes
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Preferred Universities:</strong> University of
                  Toronto, UBC
                </Col>
                <Col md={6}>
                  <strong>Budget (INR):</strong> ₹25-30 Lakhs
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Interested in Scholarships:</strong> Yes
                </Col>
                <Col md={6}>
                  <strong>Interested in Part-Time Jobs:</strong> Yes
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab> */}
      </Tabs>
      <div  className="text-center">

      <Link className="btn btn-primary" to="/myapplication">More Details <FaAnglesRight className="ms-2" /></Link>
      </div>
    </Container>
  );
};

export default Profile;
