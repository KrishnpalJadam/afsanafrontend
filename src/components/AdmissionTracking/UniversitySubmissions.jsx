import { useState } from "react";
import { Table, Container, Form, Button, Row, Col } from "react-bootstrap";

const UniversitySubmissions = () => {
  const initialSubmissions = [
    {
      id: 1,
      student_name: "John Doe",
      university: "Harvard",
      status: "pending",
      date: "2025-02-01",
    },
    {
      id: 2,
      student_name: "Alice Smith",
      university: "MIT",
      status: "submitted",
      date: "2025-01-28",
    },
    {
      id: 3,
      student_name: "Bob Johnson",
      university: "Stanford",
      status: "reviewed",
      date: "2025-01-30",
    },
    {
      id: 4,
      student_name: "Emma Brown",
      university: "Oxford",
      status: "pending",
      date: "2025-02-10",
    },
  ];

  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Filter submissions based on search term & status
  const filteredSubmissions = submissions.filter(
    (sub) =>
      (sub.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.university.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "all" || sub.status === filterStatus)
  );

  // Sort submissions
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    if (sortBy === "university")
      return a.university.localeCompare(b.university);
    if (sortBy === "date") return new Date(a.date) - new Date(b.date);
    return 0;
  });

  // Function to update submission status
  const updateStatus = (id, newStatus) => {
    setSubmissions(
      submissions.map((sub) =>
        sub.id === id ? { ...sub, status: newStatus } : sub
      )
    );
  };

  // Function to delete a submission
  const deleteSubmission = (id) => {
    setSubmissions(submissions.filter((sub) => sub.id !== id));
  };

  return (
    <Container className="p-3"  >
      <h4 className="fw-bold mb-4">University Submissions</h4>

      {/* Search & Filter Controls */}
      <Form className="mb-3">
        <Row className="g-2">
          <Col xs={12} md={6} lg={4}>
            <Form.Control
              type="text"
              placeholder="Search by name or university..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Form.Select
              onChange={(e) => setFilterStatus(e.target.value)}
              value={filterStatus}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="reviewed">Reviewed</option>
            </Form.Select>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Form.Select
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
            >
              <option value="date">Sort by Date</option>
              <option value="university">Sort by University</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>

      {/* Submissions Table */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>University</th>
              <th>Status</th>
              <th>Submission Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedSubmissions.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.student_name}</td>
                <td>{sub.university}</td>
                <td>
                  <Form.Select
                    value={sub.status}
                    onChange={(e) => updateStatus(sub.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="submitted">Submitted</option>
                    <option value="reviewed">Reviewed</option>
                  </Form.Select>
                </td>
                <td>{sub.date}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteSubmission(sub.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default UniversitySubmissions;