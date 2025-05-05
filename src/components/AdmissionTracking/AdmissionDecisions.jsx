import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Table,
  Form,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye, FaTimes } from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../../Config";


const AdmissionDecisions = () => {
  const [decisions, setDecisions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newDecision, setNewDecision] = useState({
    student: "",
    university: "",
    status: "accepted",
    date: "",
  });

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortByDate, setSortByDate] = useState("asc");

  // Fetch decisions from API
  useEffect(() => {
    const fetchDecisions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}admissiondecision`);
        setDecisions(response.data.data);
      } catch (error) {
        console.error("Error fetching decisions:", error);
      }
    };
    fetchDecisions();
  }, []);

  // Filter logic
  const filteredDecisions = decisions.filter((dec) => {
    const statusMatch =
      filterStatus === "all" || dec.status === filterStatus;
    const studentMatch =
      dec.student_name && dec.student_name.toLowerCase().includes(searchTerm.toLowerCase());
    const universityMatch =
      dec.university && dec.university.toLowerCase().includes(searchTerm.toLowerCase());
    
    return (studentMatch || universityMatch) && statusMatch;
  });
  

  // Sort by date logic
  const sortedDecisions = [...filteredDecisions].sort((a, b) => {
    return sortByDate === "asc"
      ? new Date(a.decision_date) - new Date(b.decision_date)
      : new Date(b.decision_date) - new Date(a.decision_date);
  });

  // Handle new decision input change
  const handleNewDecisionChange = (e) => {
    const { name, value } = e.target;
    setNewDecision((prevState) => ({ ...prevState, [name]: value }));
};


  // Handle "Add New Decision" submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the required fields are set
    if (!newDecision.student || !newDecision.university || !newDecision.date) {
        alert("Please fill in all the required fields.");
        return;
    }

    const decisionData = {
        student_name: newDecision.student,
        university: newDecision.university,
        status: newDecision.status,
        decision_date: newDecision.date,
        user_id: 101, // Assuming you have a user ID to assign, replace with the actual user ID logic
    };

    try {
        const response = await axios.post(`${BASE_URL}admissiondecision`, decisionData);
        setDecisions([...decisions, response.data]);
        setNewDecision({
            student: "",
            university: "",
            status: "accepted",
            date: "",
        });
        setShowModal(false);
    } catch (error) {
        console.error("Error adding new decision:", error);
    }
};


  // Update decision status
  const updateDecisionStatus = async (id, newStatus) => {
    try {
      await axios.patch(`${BASE_URL}admissiondecision/${id}`, { status: newStatus });
      setDecisions(
        decisions.map((dec) =>
          dec.id === id ? { ...dec, status: newStatus } : dec
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Delete a decision
  const deleteDecision = async (id) => {
    try {
      await axios.delete(`${BASE_URL}admissiondecision/${id}`);
      setDecisions(decisions.filter((dec) => dec.id !== id));
    } catch (error) {
      console.error("Error deleting decision:", error);
    }
  };

  // View decision details
  const handleViewLeadDetails = (lead) => {
    setSelectedLead(lead);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedLead(null);
  };

  return (
    <Container className="p-3">
      <h2 className="mb-4">Admission Decisions</h2>

      {/* Search, Filter, and Sort Controls */}
      <Form className="mb-3">
        <Row className="g-2">
          <Col xs={12} md={6} lg={3}>
            <Form.Control
              type="text"
              placeholder="Search by student or university..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Form.Select
              onChange={(e) => setFilterStatus(e.target.value)}
              value={filterStatus}
            >
              <option value="all">All Statuses</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="waitlisted">Waitlisted</option>
            </Form.Select>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Form.Select
              onChange={(e) => setSortByDate(e.target.value)}
              value={sortByDate}
            >
              <option value="asc">Sort by Date (Oldest First)</option>
              <option value="desc">Sort by Date (Newest First)</option>
            </Form.Select>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Button
              variant="secondary"
              onClick={() => setShowModal(true)}
              className="w-100"
            >
              + Add Decision
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Admission Decisions Table */}
      <Table striped bordered hover className="text-center text-nowrap">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>University</th>
            <th>Status</th>
            <th>Decision Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedDecisions.length > 0 ? (
            sortedDecisions.map((dec) => (
              <tr key={dec.id}>
                <td>{dec.student_name}</td>
                <td>{dec.university}</td>
                <td>
                  <Form.Select
                    value={dec.status}
                    onChange={(e) =>
                      updateDecisionStatus(dec.id, e.target.value)
                    }
                  >
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="waitlisted">Waitlisted</option>
                  </Form.Select>
                </td>
                <td>{new Date(dec.decision_date).toLocaleDateString()}</td>
                <td>
                  <Button variant="outline-primary" size="sm" onClick={() => handleViewLeadDetails(dec)}>
                    <FaEye />
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => deleteDecision(dec.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No decisions found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* View Lead Details Modal */}
      <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Lead Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLead && (
            <div>
              <p><strong>Student Name:</strong> {selectedLead.student_name}</p>
              <p><strong>University:</strong> {selectedLead.university}</p>
              <p><strong>Status:</strong> {selectedLead.status}</p>
              <p><strong>Decision Date:</strong> {new Date(selectedLead.decision_date).toLocaleDateString()}</p>
              <p><strong>Notes:</strong> {selectedLead.notes}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add New Decision Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Admission Decision</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3">
        <Form.Label>Student Name</Form.Label>
        <Form.Control
            type="text"
            name="student"
            placeholder="Enter student name"
            value={newDecision.student}
            onChange={handleNewDecisionChange}
        />
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label>University</Form.Label>
        <Form.Control
            type="text"
            name="university"
            placeholder="Enter university name"
            value={newDecision.university}
            onChange={handleNewDecisionChange}
        />
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select
            name="status"
            value={newDecision.status}
            onChange={handleNewDecisionChange}
        >
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="waitlisted">Waitlisted</option>
        </Form.Select>
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label>Decision Date</Form.Label>
        <Form.Control
            type="date"
            name="date"
            value={newDecision.date}
            onChange={handleNewDecisionChange}
        />
    </Form.Group>
    <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Decision
              </Button>
            </Modal.Footer>
</Form>

        </Modal.Body>
    
      </Modal>
    </Container>
  );
};

export default AdmissionDecisions;
