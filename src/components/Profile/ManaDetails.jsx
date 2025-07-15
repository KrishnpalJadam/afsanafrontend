import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import BASE_URL from "../../Config";
import api from "../../interceptors/axiosInterceptor";

function ManaDetails() {
  const [show, setShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [student, setStudentsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [universities, setUniversities] = useState([]);

  const handleShow = (student) => {
    setSelectedStudent(student);
    setShow(true);
  };

  // Filter Logic
  const filtered_student = student.filter((item) => {
    const matchesSearch = item?.full_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUniversity = selectedCourse === "" || item?.university_id == selectedCourse;
    return matchesSearch && matchesUniversity;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${BASE_URL}universities`);
        setUniversities(response.data);
      } catch (error) {
        console.log("Error fetching universities:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get(`${BASE_URL}auth/getAllStudents`);
        setStudentsData(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="container pt-3">
      <h2 className="mb-3">Select Criteria</h2>
      <div className="row g-2 align-items-center">
        <div className="col-md-3">
          <label className="form-label">
            University <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">All University</option>
            {universities?.map((item) => (
              <option key={item?.id} value={item?.id}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="col-md-5">
          <label className="form-label">Search By Keyword</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search By Student Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div> */}
      </div>

      <ul className="nav nav-tabs mt-4">
        <li className="nav-item">
          <Link className="nav-link" to="/studentDetails">
            List View
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/manaDetails">
            Details View
          </Link>
        </li>
      </ul>

      <Row className="mt-4">
        {filtered_student.map((student) => (
          <Col md={12} key={student.id}>
            <Link
              to={{
                pathname: `/studentProfile/${student?.id}`,
                state: { selectedStudent: student },
              }}
              className="text-decoration-none"
            >
              <Card className="mb-3 shadow-sm">
                <Card.Body className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <h5 className="text-primary">{student?.full_name}</h5>
                    <p className="mb-1">
                      <strong>University:</strong> {student?.university_name}
                    </p>
                    <p className="mb-1">
                      <strong>Admission No:</strong> {student?.admission_no}
                    </p>
                    <p className="mb-1">
                      <strong>Date of Birth:</strong>{" "}
                      {new Date(student?.date_of_birth).toLocaleDateString()}
                    </p>
                    <p className="mb-1">
                      <strong>Gender:</strong> {student?.gender}
                    </p>
                  </div>
                  <Button variant="secondary" style={{ border: "none" }}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ManaDetails;
