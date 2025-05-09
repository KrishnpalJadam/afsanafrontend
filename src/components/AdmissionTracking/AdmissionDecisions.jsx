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
import { FaPlus, FaTrash, FaEye } from "react-icons/fa";

import BASE_URL from "../../Config";
import api from "../../interceptors/axiosInterceptor";

const AdmissionDecisions = () => {
  const [decisions, setDecisions] = useState([]);
  const [students, setStudentsData] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const [newDecision, setNewDecision] = useState({
    student_id: "",
    university_id: "",
    status: "accepted",
    date: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortByDate, setSortByDate] = useState("asc");

  const user_id = localStorage.getItem("student_id");
  useEffect(() => {
    const fetchDecisions = async () => {
      try {
        const res = await api.get(`${BASE_URL}admissiondecision`);
        const decisionData = Array.isArray(res.data)
          ? res.data
          : res.data.data || []; // fallback in case it's wrapped in "data"
      
        setDecisions(decisionData);
        
      } catch (err) {
        console.error("Error fetching decisions:", err);
      }
    };

    fetchDecisions();
  }, []);

 
  // Fetch students
  useEffect(() => {
    api.get(`${BASE_URL}auth/getAllStudents`)
      .then((res) => setStudentsData(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  // Fetch universities
  useEffect(() => {
    api.get(`${BASE_URL}universities`)
      .then((res) => setUniversities(res.data))
      .catch((err) => console.error("Error fetching universities:", err));
  }, []);

  const filteredDecisions = decisions.filter((dec) => {
   
    const statusMatch = filterStatus === "all" || dec.status === filterStatus;
  
    // Check if student and university are accessible and correct the property names
    const studentMatch = dec.student_name && dec.student_name.toLowerCase().includes(searchTerm.toLowerCase());
    const universityMatch = dec.university_name && dec.university_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    
  
    return (studentMatch || universityMatch) && statusMatch;
  });
  
  

  const sortedDecisions = [...filteredDecisions].sort((a, b) =>
    sortByDate === "asc"
      ? new Date(a.decision_date) - new Date(b.decision_date)
      : new Date(b.decision_date) - new Date(a.decision_date)
  );

  const handleNewDecisionChange = (e) => {
    const { name, value } = e.target;
    setNewDecision((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newDecision.student_id || !newDecision.university_id || !newDecision.date) {
      alert("Please fill in all the required fields.");
      return;
    }
  
    const payload = {
      student_id: parseInt(newDecision.student_id),
      university_id: parseInt(newDecision.university_id),
      status: newDecision.status,
      decision_date: newDecision.date,
      user_id: parseInt(localStorage.getItem("user_id")),
    };
  
    try {
      await api.post(`${BASE_URL}admissiondecision`, payload);
  
      // Fetch the updated decisions
      const refresh = await api.get(`${BASE_URL}admissiondecision`);
  
      // Ensure the response is an array before setting it
      const decisionData = Array.isArray(refresh.data) ? refresh.data : refresh.data.data || [];
      setDecisions(decisionData); // Update the state with the correct array format
      setNewDecision({ student_id: "", university_id: "", status: "accepted", date: "" });
      setShowModal(false);
    } catch (err) {
      console.error("Error submitting decision:", err);
    }
  };
  


  const updateDecisionStatus = async (id, newStatus) => {
    try {
      await api.patch(`${BASE_URL}admissiondecision/${id}`, { status: newStatus });
      setDecisions(
        decisions.map((dec) => (dec.id === id ? { ...dec, status: newStatus } : dec))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const deleteDecision = async (id) => {
    try {
      const response = await api.delete(`${BASE_URL}admissiondecision/${id}`);
      setDecisions(response)
      alert("deleted successfully")
  
    } catch (err) {
      console.error("Error deleting decision:", err);
    }
  };
  

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

      <Form className="mb-3">
        <Row className="g-2">
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="waitlisted">Waitlisted</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select value={sortByDate} onChange={(e) => setSortByDate(e.target.value)}>
              <option value="asc">Oldest First</option>
              <option value="desc">Newest First</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Button onClick={() => setShowModal(true)} className="w-100">
              <FaPlus /> Add Decision
            </Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Student</th>
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
                <td>{dec.university_name}</td>
                <td>
                  <Form.Select
                    value={dec.status}
                    onChange={(e) => updateDecisionStatus(dec.id, e.target.value)}
                  >
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="waitlisted">Waitlisted</option>
                  </Form.Select>
                </td>
                <td>{new Date(dec.decision_date).toLocaleDateString()}</td>
                <td>
                  <Button size="sm" variant="outline-primary" onClick={() => handleViewLeadDetails(dec)}>
                    <FaEye />
                  </Button>{" "}
                  <Button size="sm" variant="outline-danger" onClick={() => deleteDecision(dec.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No decisions found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Decision Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLead && (
            <>
              <p><strong>Student:</strong> {selectedLead.student_name}</p>
              <p><strong>University:</strong> {selectedLead.university_name}</p>
              <p><strong>Status:</strong> {selectedLead.status}</p>
              <p><strong>Decision Date:</strong> {new Date(selectedLead.decision_date).toLocaleDateString()}</p>
             
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseViewModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Admission Decision</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Student</Form.Label>
              <Form.Select
                name="student_id"
                value={newDecision.student_id}
                onChange={handleNewDecisionChange}
              >
                <option value="">-- Select Student --</option>
                {students.map((stu) => (
                  <option key={stu.id} value={stu.id}>{stu.full_name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>University</Form.Label>
              <Form.Select
                name="university_id"
                value={newDecision.university_id}
                onChange={handleNewDecisionChange}
              >
                <option value="">-- Select University --</option>
                {universities.map((uni) => (
                  <option key={uni.id} value={uni.id}>{uni.name}</option>
                ))}
              </Form.Select>
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
              <Button type="submit" variant="primary">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdmissionDecisions;
