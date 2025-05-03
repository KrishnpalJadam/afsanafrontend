import React, { useState } from "react";
import {
  Container,
  Table,
  Card,
  Badge,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CounselorApplications = () => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const navigate = useNavigate();

  const [applications, setApplications] = useState([
    {
      id: 1,
      student: "Rahul Sharma",
      email: "rahul@example.com",
      university: "University of Toronto",
      program: "BSc CS",
      status: "Submitted",
    },
    {
      id: 2,
      student: "Neha Verma",
      email: "neha@example.com",
      university: "Oxford University",
      program: "MSc Civil Engineering",
      status: "In Review",
    },
    {
      id: 3,
      student: "Aman Singh",
      email: "aman@example.com",
      university: "UBC",
      program: "MBA",
      status: "Approved",
    },
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Submitted":
        return <Badge bg="secondary">{status}</Badge>;
      case "In Review":
        return <Badge bg="info">{status}</Badge>;
      case "Approved":
        return <Badge bg="success">{status}</Badge>;
      case "Rejected":
        return <Badge bg="danger">{status}</Badge>;
      default:
        return <Badge bg="dark">{status}</Badge>;
    }
  };

  const handleOpenModal = (id) => {
    setSelectedAppId(id);
    setShowStatusModal(true);
  };

  const handleStatusUpdate = () => {
    const updated = applications.map((app) =>
      app.id === selectedAppId ? { ...app, status: newStatus } : app
    );
    setApplications(updated);
    setShowStatusModal(false);
    setNewStatus("");
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Student Applications</h3>

      <Card>
        <Card.Body>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Email</th>
                <th>University</th>
                <th>Program</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app.id}>
                  <td>{index + 1}</td>
                  <td>{app.student}</td>
                  <td>{app.email}</td>
                  <td>{app.university}</td>
                  <td>{app.program}</td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-2"
                      onClick={() => handleOpenModal(app.id)}
                    >
                      Update Status
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      className="me-2"
                      onClick={() => navigate(`/timeline/${app.id}`)}
                    >
                      View Timeline
                    </Button>
                    <Button size="sm" variant="outline-success">
                      Upload Docs
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Update Status Modal */}
      <Modal
        show={showStatusModal}
        onHide={() => setShowStatusModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Application Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Select New Status</Form.Label>
            <Form.Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Submitted">Submitted</option>
              <option value="In Review">In Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleStatusUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CounselorApplications;
