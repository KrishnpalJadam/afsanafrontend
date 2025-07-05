import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import BASE_URL from "../../Config";
import { FaTrash } from "react-icons/fa";
import api from "../../interceptors/axiosInterceptor";
import { hasPermission } from "../../authtication/permissionUtils";
import { CiEdit } from "react-icons/ci";
import { Button, Modal, Form, } from "react-bootstrap";
import Swal from "sweetalert2";
const CounslerStudentTable = () => {
  const [show, setShow] = useState(false); // State for modal visibility
  const [selectedStudent, setSelectedStudent] = useState(null); // State for selected student
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedCourse, setSelectedCourse] = useState(""); // State for selected class
  // const [selectedSection, setSelectedSection] = useState(""); // State for selected section
  const [student, setStudentsData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [counselors, setCounselors] = useState([]); // Counselor list

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [followUpDate, setFollowUpDate] = useState("");
  const [notes, setNotes] = useState("");

  // Fetch universities
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${BASE_URL}universities`);
        setUniversities(response.data); // Ensure the data is passed correctly
      } catch (error) {
        console.log("Error fetching universities:", error);
      }
    };
    fetchData();
  }, []);
  const user_id = localStorage.getItem("user_id")
  const [formData, setFormData] = useState({
    user_id: user_id,
    full_name: "",
    father_name: "",
    admission_no: "",
    id_no: "",
    mobile_number: "",
    university_id: "",
    date_of_birth: "",
    gender: "",
    category: "",
    address: "",

    role: "student",
    password: "",
    email: ""
  });

  const [photo, setPhoto] = useState(null);
  const [documents, setDocuments] = useState([]);

  const resetForm = () => {
    setIsEditing(false);
    setFormData({
      user_id: "",
      full_name: "",
      father_name: "",
      admission_no: "",
      id_no: "",
      mobile_number: "",
      university_id: "",
      date_of_birth: "",
      gender: "",
      category: "",
      address: "",

      role: "",
      password: "",
      email: "",
    });
    setPhoto(null);
    setDocuments([]);
    setSelectedStudent(null);
    window.location.reload(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    for (const key in formData) {
      formPayload.append(key, formData[key]);
    }

    if (photo) formPayload.append("photo", photo);
    documents.forEach((doc) => formPayload.append("documents", doc));

    const url = isEditing
      ? `${BASE_URL}auth/updateStudent/${editStudentId}`
      : `${BASE_URL}auth/createStudent`;

    const method = isEditing ? "put" : "post";


    try {
      const res = await api({
        method,
        url,
        data: formPayload,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(isEditing ? "Student updated" : "Student created");
      setFormData({
        user_id: user_id,
        full_name: "",
        father_name: "",
        admission_no: "",
        id_no: "",
        mobile_number: "",
        university_id: "",
        date_of_birth: "",
        gender: "",
        category: "",
        address: "",

        role: "student",
        password: "",
        email: "",
      });
      setPhoto(null);
      setDocuments([]);
      setIsEditing(false);
      setEditStudentId(null);
      setShow(false);
      document.getElementById("studentFormModal").classList.remove("show");
      document.getElementById("studentFormModal").style.display = "none";

      // Reload students
      const { data } = await api.get(`${BASE_URL}auth/getAllStudents`);
      setStudentsData(data);
      window.location.reload(true);

    } catch (err) {
      console.error("Error:", err);
      alert("Submission failed");
    }
  };
const counselor_id = localStorage.getItem("counselor_id")
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get(`${BASE_URL}auth/students/by-counselor/${counselor_id}`);
        setStudentsData(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();

  }, [])

  const handleDelete = (id) => {
    const deleteTask = async () => {
      try {
        const response = await fetch(`${BASE_URL}auth/deleteStudent/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          setStudentsData(student.filter((task) => task.id !== id));
        } else {
          console.error("Failed to delete task:", data);
        }
      } catch (error) {
        console.error("Error occurred while deleting the task:", error);
      }
    }
    deleteTask();
  };
  const filtered_student = student.filter((item) => {
    const matchesSearch = item?.full_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUniversity = selectedCourse === "" || item?.university_id == selectedCourse;
    return matchesSearch && matchesUniversity;
  });
  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const res = await api.get(`${BASE_URL}counselor`);  // Fetch counselor data
        setCounselors(res.data);  // Update the counselors state with data
        console.log(selectedCounselor);
      } catch (err) {
        console.error("Failed to fetch counselors", err);
      }
    };
    fetchCounselors();  // Call the function to fetch counselors
  }, []);  // This runs only once when the component mounts

  const handleAssignCounselor = async () => {
    if (!selectedCounselor || !selectedApplication) {
      alert("Please select all fields.");
      return;
    }

    const payload = {
      student_id: selectedApplication.id,
      counselor_id: selectedCounselor.id,
      follow_up: followUpDate,
      notes: notes
    };

    try {
      const res = await api.patch(`${BASE_URL}auth/StudentAssignToCounselor`, payload);
      if (res.status === 200) {
        Swal.fire("Success", "Counselor assigned successfully!", "success");
        setShowAssignModal(false);
        fetchApplications(); // Refresh list
      }
    } catch (error) {
      console.error("Assignment error:", error);
      Swal.fire("Success", "Counselor assigned successfully!", "success");
    }
  };
  const handleOpenAssignModal = (student) => {
    setSelectedApplication({
      id: student.id,
      student_name: student.full_name,
      university_name: student.university_name
    });
    setSelectedCounselor(null);
    setFollowUpDate("");
    setNotes("");
    setShowAssignModal(true);
  };

  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    setSelectedCounselor(null); // Reset selected counselor when closing modal
  };

  return (
    <div className="container pt-3">
    
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2 className="mb-3">All Students</h2>
        </div>
    
        <div className="col-md-3">
     
          <select
            className="form-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">All University</option>
            {
              universities?.map((item) => {
                return <option key={item?.id} value={item?.id}>{item?.name}</option>
              })
            }

          </select>
        </div>


        <div className="col-md-5">
        
          <input
            type="text"
            className="form-control"
            style={{height: "40px"}}
            placeholder="Search By Student Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>


    
      </div>

     

      <ul className="nav nav-tabs ">
        <li className="nav-item">
          <Link className="nav-link active" to="/studentDetails">
            List View
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/manaDetails">
            Details View
          </Link>
        </li> */}
      </ul>

      {/* <input
        type="text"
        className="form-control my-3"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      /> */}

      <div className="table-responsive mt-3">
        <table className="table table-striped table-bordered text-center">
          <thead className="table-light text-nowrap">
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Admission No</th>
              <th>ID No.</th>
              <th>University Name</th>
              <th>Father Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Category</th>
              <th>Mobile Number</th>
              {/* <th>Assign to</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered_student?.map((student, index) => (
              <tr key={index} className="text-nowrap">
                <td>{index + 1}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/studentProfile/${student?.id}`,
                      state: { selectedStudent: student },
                    }}
                    className="text-decoration-none text-nowrap"
                  >
                    {student?.full_name}
                  </Link>
                </td>
                <td>{student?.admission_no}</td>
                <td>{student?.id_no}</td>
                <td>{student?.university_name}</td>
                <td>{student?.father_name}</td>
                <td>{new Date(student?.date_of_birth).toLocaleDateString()}</td>
                <td>{student?.gender}</td>
                <td>{student?.category}</td>
                <td>{student?.mobile_number}</td>
            

                  {/* <td>
                    {student.counselor_id ? (
                      <span className="badge bg-info">
                        {student.counselor_name || "Assigned"}
                      </span>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleOpenAssignModal(student)}
                        disabled={student.counselor_id}
                      >
                        Assign Counselor
                      </button>
                    )}
                  </td> */}

              
                <td>
                  {/* <button
                    className="btn btn-light btn-sm me-1"
                    onClick={() => handleShow(student)}
                  >
                    ☰
                  </button> */}
                  <button className="btn btn-primary btn-sm me-1 "
                    onClick={() => {
                      setFormData({
                        ...student
                      });
                      setEditStudentId(student.id);
                      setIsEditing(true);
                      setPhoto(null);
                      setDocuments([]);
                      setShow(true);
                      document.getElementById("studentFormModal").classList.add("show");
                      document.getElementById("studentFormModal").style.display = "block";
                    }}

                  >Edit</button>
                  <button className="btn btn-danger btn-sm me-1" onClick={() => { handleDelete(student?.id) }}> <FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Assign Counselor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplication && (
            <>
              <p><strong>Student:</strong> {selectedApplication.student_name}</p>
              <p><strong>University:</strong> {selectedApplication.university_name}</p>

              <Form.Group className="mb-3">
                <Form.Label>Select Counselor *</Form.Label>
                <Form.Select
                  value={selectedCounselor?.id || ""}
                  onChange={(e) => {
                    const selected = counselors.find(c => c.id.toString() === e.target.value);
                    setSelectedCounselor(selected);
                  }}
                >
                  <option value="">-- Select Counselor --</option>
                  {counselors.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.full_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Follow-Up Date *</Form.Label>
                <Form.Control
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAssignCounselor}>Assign</Button>
        </Modal.Footer>
      </Modal>
      <>
        {/* Modal */}
        <div
          className="modal fade"
          id="studentFormModal"
          tabIndex={-1}
          aria-labelledby="studentFormModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content student-form-container">
              <div className="modal-header">
                <h5
                  className="modal-title student-form-title"
                  id="studentFormModalLabel"
                >
                  Student Information
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={resetForm}

                />
              </div>
              <div className="modal-body">
                <form className="student-form" onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="row">
                    <div className="col-md-6 student-form-group">
                      <label htmlFor="studentName" className="student-form-label">
                        Student Name
                      </label>
                      <input
                        type="text"
                        className="form-control student-form-input"
                        id="studentName"
                        placeholder="Enter student name"
                        value={formData.full_name}
                        onChange={(e) =>
                          setFormData({ ...formData, full_name: e.target.value, full_name: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6 student-form-group">
                      <label htmlFor="fatherName" className="student-form-label">
                        Father Name
                      </label>
                      <input
                        type="text"
                        className="form-control student-form-input"
                        id="fatherName"
                        placeholder="Enter father name"
                        value={formData.father_name}
                        onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 student-form-group">
                      <label htmlFor="studentName" className="student-form-label">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control student-form-input"
                        id="email"
                        placeholder="Enter student's email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6 student-form-group">
                      <label htmlFor="fatherName" className="student-form-label">
                        Enter Pasword
                      </label>
                      <input
                        type="text"
                        className="form-control student-form-input"
                        id="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 student-form-group">
                      <label htmlFor="admissionNo" className="student-form-label">
                        Admission No
                      </label>
                      <input
                        type="text"
                        className="form-control student-form-input"
                        id="admissionNo"
                        placeholder="Enter admission number"
                        value={formData.admission_no}
                        onChange={(e) => setFormData({ ...formData, admission_no: e.target.value })}
                      />
                    </div>
                    <div className="col-md-4 student-form-group">
                      <label htmlFor="idNo" className="student-form-label">
                        ID No.
                      </label>
                      <input
                        type="text"
                        className="form-control student-form-input"
                        id="idNo"
                        placeholder="Enter ID number"
                        value={formData.id_no}
                        onChange={(e) => setFormData({ ...formData, id_no: e.target.value })}
                      />
                    </div>
                    <div className="col-md-4 student-form-group">
                      <label htmlFor="mobileNumber" className="student-form-label">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        className="form-control student-form-input"
                        id="mobileNumber"
                        placeholder="Enter mobile number"
                        value={formData.mobile_number}
                        onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 student-form-group">
                      <label htmlFor="university" className="student-form-label">
                        University Name
                      </label>
                      <select
                        className="form-select student-form-select"
                        id="university"
                        value={formData.university_id}
                        onChange={(e) => setFormData({ ...formData, university_id: e.target.value })}
                      >
                        <option value="" disabled>

                          Select university
                        </option>
                        {universities?.map((uni) => (
                          <option key={uni.id} value={uni.id}>
                            {uni.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 student-form-group">
                      <label htmlFor="dob" className="student-form-label">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="form-control student-form-input"
                        id="dob"
                        value={formData.date_of_birth}
                        onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 student-form-group">
                      <label className="student-form-label">Gender</label>
                      <div>

                        {["Male", "Female", "Other"].map((g) => (
                          <div key={g} className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              value={g}
                              checked={formData.gender === g}
                              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            />
                            <label className="form-check-label">{g}</label>
                          </div>
                        ))}

                      </div>
                    </div>
                    <div className="col-md-6 student-form-group">
                      <label htmlFor="category" className="student-form-label">
                        Category
                      </label>
                      <select
                        className="form-select student-form-select"
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option selected="" disabled="">
                          Select category
                        </option>
                        <option value="General">General</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="OBC">OBC</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 student-form-group">
                      <label htmlFor="address" className="student-form-label">
                        Address
                      </label>
                      <textarea
                        className="form-control student-form-input"
                        id="address"
                        rows={3}
                        placeholder="Enter complete address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-md-6 student-form-group">
                      <label htmlFor="photo" className="student-form-label">
                        Upload Photo
                      </label>
                      <input
                        type="file"
                        className="form-control student-form-input"
                        id="photo"
                        onChange={(e) => setPhoto(e.target.files[0])}
                      />
                    </div>
                    <div className="col-md-6 student-form-group">
                      <label htmlFor="documents" className="student-form-label">
                        Upload Documents
                      </label>
                      <input
                        type="file"
                        className="form-control student-form-input"
                        id="documents"
                        multiple
                        onChange={(e) => setDocuments(Array.from(e.target.files))}
                      />
                      <div className="form-text">
                        You can upload multiple documents
                      </div>
                    </div>
                  </div> */}
                  <div className="student-form-actions d-flex justify-content-end">

                    <div>
                      <button
                        type="button"
                        className="btn student-form-btn student-form-btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={resetForm}
                      >
                        Cancel
                      </button>
                      {isEditing == true ? <button
                        type="submit"
                        className="btn student-form-btn btn-primary"
                      >
                        update
                      </button> : <button
                        type="submit"
                        className="btn student-form-btn btn-primary"
                      >
                        Submit
                      </button>}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>

    </div>
  );
};

export default CounslerStudentTable;