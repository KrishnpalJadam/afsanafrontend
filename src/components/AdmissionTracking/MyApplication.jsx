import React, { useState } from "react";
import {
  Container,
  Table,
  Card,
  Badge,
  Alert,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { hasPermission } from "../../authtication/permissionUtils";

const MyApplication = () => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState({});
  const navigate = useNavigate();

  const applications = [
    {
      id: 1,
      university: "University of Toronto",
      program: "BSc Computer Science",
      status: "Submitted",
      action: "Upload passport scan",
    },
    {
      id: 2,
      university: "Oxford University",
      program: "MSc Civil Engineering",
      status: "In Review",
      action: "Track application progress",
    },
    {
      id: 3,
      university: "UBC",
      program: "MBA",
      status: "Approved",
      action: "Schedule visa appointment",
    },
    {
      id: 4,
      university: "Harvard University",
      program: "PhD Economics",
      status: "Rejected",
      action: "Explore other programs",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Submitted":
        return <Badge bg="secondary">Submitted</Badge>;
      case "In Review":
        return <Badge bg="info">In Review</Badge>;
      case "Approved":
        return <Badge bg="success">Approved</Badge>;
      case "Rejected":
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="dark">{status}</Badge>;
    }
  };

  const handleUpload = (e, appId) => {
    setUploadedDocs({
      ...uploadedDocs,
      [appId]: e.target.files[0]?.name || "",
    });
  };

  const handleMessage = (student) => {
    setSelectedStudent(student);
    setShowMessageModal(true);
  };

  const handleSendMessage = () => {
    alert(`Message sent to counselor for ${selectedStudent}`);
    setShowMessageModal(false);
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">My Applications</h3>

      <Card>
        <Card.Body>
          <Table responsive bordered hover className="text-center text-nowrap">
            <thead>
              <tr>
                <th>#</th>
                <th>University</th>
                <th>Program</th>
                <th>Status</th>
                <th>Next Action</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app.id}>
                  <td>{index + 1}</td>
                  <td>{app.university}</td>
                  <td>{app.program}</td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td>
                    <Alert
                      variant={
                        app.status === "Approved"
                          ? "success"
                          : app.status === "Rejected"
                          ? "danger"
                          : "warning"
                      }
                      className="mb-0 py-1 px-2"
                    >
                      {app.action}
                    </Alert>
                  </td>
                  <td>
                    {/* Upload Docs */}
                    {app.status === "Submitted" && (
                      <>
                        <Form.Control
                          type="file"
                          size="sm"
                          onChange={(e) => handleUpload(e, app.id)}
                        />
                        {uploadedDocs[app.id] && (
                          <span className="text-success small">
                            {uploadedDocs[app.id]}
                          </span>
                        )}
                      </>
                    )}

                    {/* Track Timeline */}
                    {app.status === "In Review" && (
                      <Button
                        size="sm"
                        variant="info"
                        className="mt-1"
                        onClick={() => navigate(`/timeline/${app.id}`)}
                        disabled={!hasPermission("Application Management","add")}
                      >
                        View Timeline
                      </Button>
                    )}

                    {/* Message Counselor */}
                    <Button
                      size="sm"
                      variant="secondary"
                      className="mt-1 me-1"
                      onClick={() => handleMessage(app.university)}
                      disabled={!hasPermission("Application Management","add")}
                    >
                      Message Counselor
                    </Button>

                    {/* Schedule Visa */}
                    {app.status === "Approved" && (
                      <Button size="sm" variant="success" className="mt-1" disabled={!hasPermission("Application Management","add")}>
                        Book Visa Appointment
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Message Modal */}
      <Modal
        show={showMessageModal}
        onHide={() => setShowMessageModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Message Counselor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Write your message..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowMessageModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSendMessage}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyApplication;
