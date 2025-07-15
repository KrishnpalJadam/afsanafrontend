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
import { FaPlus, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";

import BASE_URL from "../../Config";
import api from "../../interceptors/axiosInterceptor";

const StudentDecisions = () => {
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

  useEffect(() => {
    api.get(`${BASE_URL}auth/getAllStudents`)
      .then((res) => setStudentsData(res.data))
      .catch((err) => console.error("Error fetching students:", err));

    api.get(`${BASE_URL}universities`)
      .then((res) => setUniversities(res.data))
      .catch((err) => console.error("Error fetching universities:", err));

    const student_id = localStorage.getItem("student_id");
    if (student_id) {
      api.get(`${BASE_URL}admissiondecisions/${student_id}`)
        .then((res) => {
          const decisionData = Array.isArray(res.data) ? res.data : res.data.data || [];
          setDecisions(decisionData);
        })
        .catch((err) => console.error("Error fetching decisions:", err));
    }
  }, []);

  const getStudentName = (id) => {
    const student = students.find((s) => s.id === id);
    return student ? student.full_name : "N/A";
  };

  const getUniversityName = (id) => {
    const university = universities.find((u) => u.id === id);
    return university ? university.name : "N/A";
  };

  const filteredDecisions = decisions.filter((dec) => {
    const statusMatch = filterStatus === "all" || dec.status === filterStatus;
    const studentName = getStudentName(dec.student_id);
    const universityName = getUniversityName(dec.university_id);
    const studentMatch = studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const universityMatch = universityName.toLowerCase().includes(searchTerm.toLowerCase());
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
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              className="p-2"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="waitlisted">Waitlisted</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Select value={sortByDate} onChange={(e) => setSortByDate(e.target.value)}>
              <option value="asc">Oldest First</option>
              <option value="desc">Newest First</option>
            </Form.Select>
          </Col>
          {/* <Col md={3}>
            <Button onClick={() => setShowModal(true)} className="w-100">
              <FaPlus /> Add Decision
            </Button>
          </Col> */}
        </Row>
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
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
                <td>{getStudentName(dec.student_id)}</td>
                <td>{getUniversityName(dec.university_id)}</td>
                <td>{dec.status}</td>
                <td>{new Date(dec.decision_date).toLocaleDateString()}</td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => handleViewLeadDetails(dec)}
                  >
                    <FaEye />
                  </Button>
                  {/* Delete disabled as delete API removed */}
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
              <p><strong>Student:</strong> {getStudentName(selectedLead.student_id)}</p>
              <p><strong>University:</strong> {getUniversityName(selectedLead.university_id)}</p>
              <p><strong>Status:</strong> {selectedLead.status}</p>
              <p><strong>Decision Date:</strong> {new Date(selectedLead.decision_date).toLocaleDateString()}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseViewModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Modal - Save Disabled */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Admission Decision</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
              <Button type="button" variant="primary" disabled>
                Save (Disabled)
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default StudentDecisions;
