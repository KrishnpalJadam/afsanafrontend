import React, { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ManaDetails() {
  const [show, setShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleShow = (student) => {
    setSelectedStudent(student);
    setShow(true);
  };

  const students = [
    {
      admissionNo: 1001,
      name: "hina Khan",
      rollNo: "0201",
      university: "Corvinus University of Budapest, Hungary",
      fatherName: "Emrys",
      dob: "02/06/2019",
      gender: "Male",
      category: "General",
      mobile: "16514840184",
    },
    {
      admissionNo: 1020,
      name: "Marlie dubois",
      rollNo: "0204",
      university: "Eötvös Loránd University, Hungary",
      fatherName: "Lester",
      dob: "05/22/2019",
      gender: "Female",
      category: "General",
      mobile: "6595084801",
    },
    {
      admissionNo: 120036,
      name: "sanjana patel",
      rollNo: "23620",
      university: "Pázmány Péter Catholic University, Hungary",
      fatherName: "Abhinand",
      dob: "10/15/2015",
      gender: "Male",
      category: "General",
      mobile: "9067875674",
    },
  ];

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
        {students.map((student) => (
          <Col md={12} key={student.admissionNo}>
            <Link
              to={{
                pathname: `/studentProfile/${student.admissionNo}`,
                state: { selectedStudent: student },
              }}
              className="text-decoration-none"
            >
              <Card className="mb-3 shadow-sm">
                <Card.Body className="d-flex align-items-center">
                  <img
                    src="https://randomuser.me/api/portraits/women/2.jpg"
                    alt="Profile"
                    className="rounded-circle border me-3"
                  />
                  <div className="flex-grow-1">
                    <h5 className="text-primary">{student.name}</h5>
                    <p className="mb-1">
                      <strong>University:</strong> {student.university}
                    </p>
                    <p className="mb-1">
                      <strong>Admission No:</strong> {student.admissionNo}
                    </p>
                    <p className="mb-1">
                      <strong>Date of Birth:</strong> {student.dob}
                    </p>
                    <p className="mb-1">
                      <strong>Gender:</strong> {student.gender}
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
