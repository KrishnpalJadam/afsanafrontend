import { useState } from "react";
import {
  Table,
  Container,
  Form,
  Button,
  Modal,
  Row,
  Col,
} from "react-bootstrap";

const AdmissionDecisions = () => {
  const initialDecisions = [
    {
      id: 1,
      student: "John Doe",
      university: "Harvard",
      status: "accepted",
      date: "2025-02-05",
    },
    {
      id: 2,
      student: "Alice Smith",
      university: "MIT",
      status: "rejected",
      date: "2025-02-02",
    },
    {
      id: 3,
      student: "Bob Johnson",
      university: "Stanford",
      status: "waitlisted",
      date: "2025-02-08",
    },
  ];

  const [decisions, setDecisions] = useState(initialDecisions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortByDate, setSortByDate] = useState("asc");

  const [showModal, setShowModal] = useState(false);
  const [newDecision, setNewDecision] = useState({
    student: "",
    university: "",
    status: "accepted",
    date: "",
  });

  // Filter and search logic
  const filteredDecisions = decisions.filter(
    (dec) =>
      (dec.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dec.university.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "all" || dec.status === filterStatus)
  );

  // Sort by date logic
  const sortedDecisions = [...filteredDecisions].sort((a, b) => {
    return sortByDate === "asc"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  });

  // Update decision status
  const updateDecisionStatus = (id, newStatus) => {
    setDecisions(
      decisions.map((dec) =>
        dec.id === id ? { ...dec, status: newStatus } : dec
      )
    );
  };

  // Delete a decision
  const deleteDecision = (id) => {
    setDecisions(decisions.filter((dec) => dec.id !== id));
  };

  // Handle new decision input change
  const handleNewDecisionChange = (e) => {
    const { name, value } = e.target;
    setNewDecision((prevState) => ({ ...prevState, [name]: value }));
  };

  // Add a new decision
  const addNewDecision = () => {
    if (!newDecision.student || !newDecision.university || !newDecision.date) {
      alert("All fields are required!");
      return;
    }
    setDecisions([...decisions, { id: decisions.length + 1, ...newDecision }]);
    setShowModal(false);
    setNewDecision({
      student: "",
      university: "",
      status: "accepted",
      date: "",
    });
  };

  return (
    <Container className="p-3">
      <h2 className=" mb-4">Admission Decisions</h2>

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
              style={{ border: "none" }}
            >
              + Add Decision
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Admission Decisions Table */}
      <div className="table-responsive">
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
            {sortedDecisions.map((dec) => (
              <tr key={dec.id}>
                <td>{dec.student}</td>
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
                <td>{dec.date}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteDecision(dec.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for Adding New Decision */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Admission Decision</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={addNewDecision}
            style={{ backgroundColor: "gray", color: "black", border: "none" }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdmissionDecisions;
