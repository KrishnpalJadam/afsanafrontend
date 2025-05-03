import React, { useState } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LeadCouncelor = () => {
  const navigate = useNavigate();
  // Sample lead data
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 234 567 890",
      status: "Active",
    },
    {
      id: 2,
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      phone: "+1 987 654 321",
      status: "Pending",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 555 666 777",
      status: "Inactive",
    },
  ]);

  // State for modal visibility
  const [showModal, setShowModal] = useState(false);

  // State for new lead form data
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
  });

  // Open modal
  const handleShowModal = () => setShowModal(true);

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setNewLead({
      name: "",
      email: "",
      phone: "",
      status: "Active",
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead({
      ...newLead,
      [name]: value,
    });
  };

  // Handle form submission
  const handleAddLead = (e) => {
    e.preventDefault();

    // Create a new lead object
    const lead = {
      id: leads.length + 1,
      ...newLead,
    };

    // Add the new lead to the list
    setLeads([...leads, lead]);

    // Close the modal
    handleCloseModal();
  };

  // Function to assign a counselor
  const assignCounselor = (id) => {
    alert(`Assigning counselor to Lead ID: ${id}`);
  };

  return (
    <Container className="mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lead List</h2>
        <Button
          variant="dark"
          onClick={handleShowModal}
          style={{ backgroundColor: "gray", color: "black", border: "none" }}
        >
          Add New Lead
        </Button>
      </div>

      {/* Lead Cards */}
      <Row className="justify-content-start">
        {leads.map((lead) => (
          <Col md={4} sm={6} xs={12} key={lead.id} className="mb-3">
            <Card className="shadow-sm p-3 bg-light">
              <Card.Body>
                <Card.Title>{lead.name}</Card.Title>
                <Card.Text>
                  <a href={`mailto:${lead.email}`}>{lead.email}</a>
                  <br />
                  {lead.phone}
                </Card.Text>
                <Badge
                  bg={
                    lead.status === "Active"
                      ? "success"
                      : lead.status === "Pending"
                      ? "warning"
                      : "secondary"
                  }
                  className="mb-2"
                >
                  {lead.status.toLowerCase()}
                </Badge>
                <div className="d-flex justify-content-between mt-3">
                  <Button
                    variant="light"
                    onClick={() => navigate(`/lead/${lead.id}`)}
                  >
                    View Details
                  </Button>
                  
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Adding New Lead */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddLead}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={newLead.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={newLead.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                name="phone"
                value={newLead.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={newLead.status}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{
                  backgroundColor: "gray",
                  color: "black",
                  border: "none",
                }}
              >
                Add Lead
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default LeadCouncelor;
