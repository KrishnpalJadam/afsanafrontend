import React from "react";
import { Card, ListGroup, Container, Row, Col, Image } from "react-bootstrap";

const MyProfile = () => {
  // Get login_detail from localStorage
  const loginDetail = JSON.parse(localStorage.getItem("login_detail"));

  // If no login data, show message
  if (!loginDetail) {
    return (
      <Container className="mt-5 text-center">
        <h4 className="text-muted">No user is logged in.</h4>
      </Container>
    );
  }

  // Function to render list item only if value exists
  const renderItem = (label, value) => {
    if (!value) return null;
    return (
      <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4 border-0 border-bottom">
        <span className="fw-semibold text-secondary">{label}</span>
        <span className="fw-medium text-dark">{value}</span>
      </ListGroup.Item>
    );
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm rounded-4 border-0 overflow-hidden">
            <Card.Header
              as="h4"
              className="text-center bg-primary text-white py-3 fw-bold"
            >
              My Profile
            </Card.Header>

            <ListGroup variant="flush">
              {renderItem("Full Name", loginDetail.full_name)}
              {renderItem("Email", loginDetail.email)}
              {renderItem("Phone", loginDetail.phone)}
              {renderItem("Gender", loginDetail.gender)}
              {renderItem("Date of Birth", new Date(loginDetail.date_of_birth).toLocaleDateString())}
              {renderItem("Address", loginDetail.address)}
              {renderItem("Father's Name", loginDetail.father_name)}
              {renderItem("Admission No.", loginDetail.admission_no)}
              {renderItem("ID No.", loginDetail.id_no)}
              {renderItem("Category", loginDetail.category)}
              {renderItem("Role", loginDetail.role)}
              {renderItem("University Name", loginDetail.university_name)}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfile;
