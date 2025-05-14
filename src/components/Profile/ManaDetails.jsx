
import React, { useState , useEffect} from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import BASE_URL from "../../Config";
import api from "../../interceptors/axiosInterceptor";

function ManaDetails() {
  const [show, setShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [student, setStudentsData] = useState([]);
  const handleShow = (student) => {
    setSelectedStudent(student);
    setShow(true);
  };
  
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

  }, [])
 
  return (
    <div className="container pt-3">
      <h2 className=" mb-3">Select Criteria</h2>
      <div className="row g-2 align-items-center">
        <div className="col-md-3">
          <label className="form-label">
            Class <span className="text-danger">*</span>
          </label>
          <select className="form-select">
            <option>Class 1</option>
            <option>Class 2</option>
            <option>Class 3</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Section</label>
          <select className="form-select">
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Search By Keyword</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search By Student Name, Roll Number, Enroll Number, etc."
          />
        </div>

        <div className="col-md-2 d-flex">
          <button className="btn btn-secondary mt-4 w-100">
            <i className="fas fa-search"></i> Search
          </button>
        </div>
      </div>

      <ul className="nav nav-tabs mt-4 ">
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

      {/* <input
        type="text"
        className="form-control my-3"
        placeholder="Search..."
      /> */}

      <Row className="mt-4">
        {student?.map((student) => (
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
                  <img
                    src={student?.photo}
                    alt="Profile"
                    className="rounded-circle border me-3"
                    crossorigin="anonymous"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      padding: "5px",
                    }}
                  />
                  <div className="flex-grow-1">
                    <h5 className="text-primary">{student?.full_name}</h5>
                    <p className="mb-1">
                      <strong>University:</strong> {student?.university_name}
                    </p>
                    <p className="mb-1">
                      <strong>Admission No:</strong> {student?.admission_no}
                    </p>
                    <p className="mb-1">
                      <strong>Date of Birth:</strong>  {new Date(student?.date_of_birth).toLocaleDateString()}
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