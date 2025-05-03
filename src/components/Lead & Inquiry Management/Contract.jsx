import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AssignCounselor = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Sample counselor data with status
  const [counselors, setCounselors] = useState([
    { id: 1, name: "Emily Johnson", image: "https://randomuser.me/api/portraits/women/44.jpg", selected: false, status: "Active" },
    { id: 2, name: "Michael Smith", image: "https://randomuser.me/api/portraits/men/45.jpg", selected: false, status: "Inactive" },
    { id: 3, name: "Sarah Lee", image: "https://randomuser.me/api/portraits/women/46.jpg", selected: false, status: "Active" },
    { id: 4, name: "David Brown", image: "https://randomuser.me/api/portraits/men/47.jpg", selected: false, status: "Inactive" },
    { id: 5, name: "Lisa White", image: "https://randomuser.me/api/portraits/women/48.jpg", selected: false, status: "Active" },
    { id: 6, name: "James Green", image: "https://randomuser.me/api/portraits/men/49.jpg", selected: false, status: "Inactive" },
  ]);

  // Function to handle selection
  const toggleSelection = (id) => {
    setCounselors(
      counselors.map((counselor) =>
        counselor.id === id ? { ...counselor, selected: !counselor.selected } : counselor
      )
    );
  };

  // Function to toggle status between Active and Inactive
  const toggleStatus = (id) => {
    setCounselors(
      counselors.map((counselor) =>
        counselor.id === id
          ? { ...counselor, status: counselor.status === "Active" ? "Inactive" : "Active" }
          : counselor
      )
    );
  };

  // Function to submit selected counselors
  const handleSubmit = () => {
    const selectedCounselors = counselors.filter((counselor) => counselor.selected);
    alert(`Assigned Counselors: ${selectedCounselors.map((c) => c.name).join(", ")}`);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2 className="mb-3">Assign Leads to Counselors</h2>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          ⬅ Back
        </Button>
      </div>

      <Row>
        {counselors.map((counselor) => (
          <Col md={4} sm={6} xs={12} key={counselor.id} className="mb-3">
            <Card
              className={`shadow-sm p-3 bg-light ${
                counselor.selected ? "border-primary" : ""
              }`}
            >
              <Card.Body className="d-flex align-items-center">
                <img
                  src={counselor.image}
                  alt={counselor.name}
                  className="rounded-circle me-3"
                  width="60"
                  height="60"
                />
                <div className="flex-grow-1">
                  <Card.Title>{counselor.name}</Card.Title>
                  <Button
                    variant={counselor.status === "Active" ? "success" : "danger"}
                    size="sm"
                    onClick={() => toggleStatus(counselor.id)}
                  >
                    {counselor.status}
                  </Button>
                </div>
                <Form.Check
                  type="checkbox"
                  checked={counselor.selected}
                  onChange={() => toggleSelection(counselor.id)}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Button variant="dark" onClick={handleSubmit} style={{ backgroundColor: "gray", color: "black", border: "none" }}>
        Submit
      </Button>
    </Container>
  );
};

export default AssignCounselor;