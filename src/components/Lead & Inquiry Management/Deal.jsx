import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, ListGroup, Button } from "react-bootstrap";

const Deal = () => {
  const { id } = useParams(); // Get lead ID from URL
  const navigate = useNavigate(); // Hook for navigation

  // Example lead data (this should come from an API in a real project)
  const lead = {
    id: id,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 234 567 890",
    status: "Active",
    courseInterest: "MBA",
    source: "Website",
    counselor: "Emily Johnson",
    followUps: [
      { method: "Call", date: "2024-02-20", notes: "Discussed course details" },
      { method: "Email", date: "2024-02-22", notes: "Sent fee structure" },
    ],
  };

  return (
    <>
      <Container className="mt-4">
        {/* Back Button (Top Right) */}
        <div className="d-flex justify-content-between mb-3">
          <h2>Lead Details</h2>
          <Button variant="secondary" onClick={() => navigate(-1)}>⬅ Back</Button>
        </div>

        <Card className="shadow p-3">
          <Card.Body>
            <Card.Title>{lead.name}</Card.Title>
            <Card.Text>
              <strong>Email:</strong> <a href={`mailto:${lead.email}`}>{lead.email}</a><br />
              <strong>Phone:</strong> {lead.phone}<br />
              <strong>Status:</strong> {lead.status}<br />
              <strong>Course Interest:</strong> {lead.courseInterest}<br />
              <strong>Source:</strong> {lead.source}<br />
              <strong>Assigned Counselor:</strong> {lead.counselor}
            </Card.Text>
          </Card.Body>
        </Card>

        <h4 className="mt-4">Follow-Up History</h4>
        <ListGroup>
          {lead.followUps.map((fup, index) => (
            <ListGroup.Item key={index}>
              <strong>{fup.method}</strong> - {fup.date} | {fup.notes}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <div className="mt-3">
          <Button variant="warning" className="me-2">Edit Lead</Button>
          <Button variant="success" style={{backgroundColor:"gray", color:"black", border:"none"}}>Convert to Student</Button>
        </div>
      </Container>
    </>
  );
};

export default Deal;
