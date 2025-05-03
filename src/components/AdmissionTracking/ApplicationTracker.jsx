import React, { useState } from "react";
import { Table, Form, Row, Col, Badge, Button, Card } from "react-bootstrap";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";

// Dummy student data
const students = [
  {
    id: 1,
    name: "Raj Sharma",
    university: "BMU",
    status: "Submitted",
    stage: "Positive feedback",
    visa: "Approved",
    country: "Hungary",
  },
  {
    id: 2,
    name: "Tina Das",
    university: "University 2",
    status: "Not submitted",
    stage: "Failed - Interview",
    visa: "Rejected",
    country: "Germany",
  },
  {
    id: 3,
    name: "Amit Roy",
    university: "BMU",
    status: "Submitted",
    stage: "Pending applicants",
    visa: "Pending",
    country: "France",
  },
  {
    id: 4,
    name: "Sana Ali",
    university: "University 3",
    status: "Submitted",
    stage: "Conditionally accepted",
    visa: "Approved",
    country: "Spain",
  },
  {
    id: 5,
    name: "Nikhil Verma",
    university: "University 2",
    status: "Submitted",
    stage: "Rescheduled",
    visa: "Pending",
    country: "Italy",
  },
  {
    id: 6,
    name: "Zara Sheikh",
    university: "BMU",
    status: "Not submitted",
    stage: "Disappeared",
    visa: "Pending",
    country: "Portugal",
  },
  {
    id: 7,
    name: "Deepak Kumar",
    university: "University 4",
    status: "Submitted",
    stage: "Provisionally accepted",
    visa: "Approved",
    country: "Switzerland",
  },
  {
    id: 8,
    name: "Pooja Rani",
    university: "BMU",
    status: "Submitted",
    stage: "Unreplied",
    visa: "Pending",
    country: "Germany",
  },
  {
    id: 9,
    name: "Arjun Mehta",
    university: "University 3",
    status: "Submitted",
    stage: "Department check",
    visa: "Approved",
    country: "France",
  },
  {
    id: 10,
    name: "Komal Singh",
    university: "University 2",
    status: "Submitted",
    stage: "Feedback - missing docs",
    visa: "Rejected",
    country: "Spain",
  },

  // New Stage Filter Entries 👇
  {
    id: 11,
    name: "Suresh Nair",
    university: "University 5",
    status: "Submitted",
    stage: "Missing Application Fee",
    visa: "Pending",
    country: "Italy",
  },
  {
    id: 12,
    name: "Anita Desai",
    university: "University 1",
    status: "Submitted",
    stage: "Application Fee Paid",
    visa: "Approved",
    country: "Portugal",
  },
  {
    id: 13,
    name: "Rahul Bhatt",
    university: "BMU",
    status: "Submitted",
    stage: "University Interview Date",
    visa: "Pending",
    country: "Switzerland",
  },
  {
    id: 14,
    name: "Priya Joshi",
    university: "University 4",
    status: "Submitted",
    stage: "Tuition Fee Paid",
    visa: "Approved",
    country: "Germany",
  },
  {
    id: 15,
    name: "Farhan Khan",
    university: "University 3",
    status: "Submitted",
    stage: "Email for Embassy Date Sent",
    visa: "Pending",
    country: "France",
  },
  {
    id: 16,
    name: "Isha Kapoor",
    university: "University 2",
    status: "Submitted",
    stage: "Embassy Date Confirmed",
    visa: "Approved",
    country: "Spain",
  },
  {
    id: 17,
    name: "Mohit Sharma",
    university: "University 1",
    status: "Submitted",
    stage: "Visa Interview Scheduled",
    visa: "Pending",
    country: "Italy",
  },
];

const statuses = ["Submitted", "Not submitted"];
const stages = [
  "Unreplied",
  "Feedback - missing docs",
  "Department check",
  "Positive feedback",
  "Failed - Docs",
  "Rescheduled",
  "Pending applicants",
  "Failed - Interview",
  "Provisionally accepted",
  "Conditionally accepted",
  "Accepted - visa needed",
  "Disappeared",
  "Missing Application Fee",
  "Application Fee Paid",
  "University Interview Date",
  "Tuition Fee Paid",
  "Email for Embassy Date Sent",
  "Embassy Date Confirmed",
  "Visa Interview Scheduled",
];

const visaStatuses = ["Approved", "Rejected", "Pending"];

const StudentList = () => {
  const [filters, setFilters] = useState({
    university: "All",
    status: "All",
    stage: "All",
    visa: "All",
    country: "All", // ⬅️ add this
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredStudents = students.filter((student) => {
    const matchUni =
      filters.university === "All" || student.university === filters.university;
    const matchStatus =
      filters.status === "All" || student.status === filters.status;
    const matchStage =
      filters.stage === "All" || student.stage === filters.stage;
    const matchVisa = filters.visa === "All" || student.visa === filters.visa;

    const matchCountry =
      filters.country === "All" || student.country === filters.country;

    return matchUni && matchStatus && matchStage && matchVisa && matchCountry;
  });
  const exportToExcel = () => {
    const exportData = filteredStudents.map((student) => ({
      Name: student.name,
      University: student.university,
      Status: student.status,
      Stage: student.stage,
      Visa: student.visa,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(data, "Student_List.xlsx");
  };
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2> Application Tracker</h2>

        <Button variant="success" className="mb-3" onClick={exportToExcel}>
          📤 Export to Excel
        </Button>
      </div>
      <Card className="mb-4">
        <Card.Header>🎯 Filter Options</Card.Header>
        <Card.Body>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>University</Form.Label>
                <Form.Select
                  name="university"
                  value={filters.university}
                  onChange={handleFilterChange}
                >
                  <option value="All">All ({students.length})</option>
                  {[...new Set(students.map((s) => s.university))].map(
                    (uni) => (
                      <option key={uni} value={uni}>
                        {uni} (
                        {students.filter((s) => s.university === uni).length})
                      </option>
                    )
                  )}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Application Status</Form.Label>
                <Form.Select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="All">All ({students.length})</option>
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s} ({students.filter((stu) => stu.status === s).length})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Country</Form.Label>
                <Form.Select
                  name="country"
                  value={filters.country}
                  onChange={handleFilterChange}
                >
                  <option value="All">All ({students.length})</option>
                  {[...new Set(students.map((s) => s.country))].map(
                    (country) => (
                      <option key={country} value={country}>
                        {country} (
                        {students.filter((s) => s.country === country).length})
                      </option>
                    )
                  )}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Stage</Form.Label>
                <Form.Select
                  name="stage"
                  value={filters.stage}
                  onChange={handleFilterChange}
                >
                  <option value="All">All ({students.length})</option>
                  {stages.map((s) => (
                    <option key={s} value={s}>
                      {s} ({students.filter((stu) => stu.stage === s).length})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Visa Status</Form.Label>
                <Form.Select
                  name="visa"
                  value={filters.visa}
                  onChange={handleFilterChange}
                >
                  <option value="All">All ({students.length})</option>
                  {visaStatuses.map((s) => (
                    <option key={s} value={s}>
                      {s} ({students.filter((stu) => stu.visa === s).length})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="mb-3">
        {filters.university !== "All" && (
          <Badge pill bg="primary" className="me-2">
            University: {filters.university}{" "}
            <span
              style={{ cursor: "pointer", marginLeft: "8px" }}
              onClick={() =>
                setFilters((prev) => ({ ...prev, university: "All" }))
              }
            >
              ❌
            </span>
          </Badge>
        )}
        {filters.status !== "All" && (
          <Badge pill bg="info" className="me-2">
            Status: {filters.status}{" "}
            <span
              style={{ cursor: "pointer", marginLeft: "8px" }}
              onClick={() => setFilters((prev) => ({ ...prev, status: "All" }))}
            >
              ❌
            </span>
          </Badge>
        )}
        {filters.stage !== "All" && (
          <Badge pill bg="warning" className="me-2">
            Stage: {filters.stage}{" "}
            <span
              style={{ cursor: "pointer", marginLeft: "8px" }}
              onClick={() => setFilters((prev) => ({ ...prev, stage: "All" }))}
            >
              ❌
            </span>
          </Badge>
        )}
        {filters.visa !== "All" && (
          <Badge pill bg="danger" className="me-2">
            Visa: {filters.visa}{" "}
            <span
              style={{ cursor: "pointer", marginLeft: "8px" }}
              onClick={() => setFilters((prev) => ({ ...prev, visa: "All" }))}
            >
              ❌
            </span>
          </Badge>
        )}

        {filters.country !== "All" && (
          <Badge pill bg="success" className="me-2">
            Country: {filters.country}{" "}
            <span
              style={{ cursor: "pointer", marginLeft: "8px" }}
              onClick={() =>
                setFilters((prev) => ({ ...prev, country: "All" }))
              }
            >
              ❌
            </span>
          </Badge>
        )}
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>University</th>
            <th>Status</th>
            <th>Stage</th>
            <th>Visa</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.university}</td>
                <td>
                  <Badge
                    bg={student.status === "Submitted" ? "success" : "dark"}
                  >
                    {student.status}
                  </Badge>
                </td>
                <td>{student.stage}</td>
                <td>
                  <Badge
                    bg={
                      student.visa === "Rejected"
                        ? "danger"
                        : student.visa === "Approved"
                        ? "success"
                        : "warning"
                    }
                  >
                    {student.visa}
                  </Badge>
                </td>
                <td>
                  {/* <Button size="sm" variant="info">
                    View
                  </Button> */}
                  <Button size="sm" variant="info">
                    <Link
                      to={`/student/${student.id}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      View
                    </Link>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentList;
