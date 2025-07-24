import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../Config";
import { FaTrash } from "react-icons/fa";
import api from "../../interceptors/axiosInterceptor";
import { CiEdit } from "react-icons/ci";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const StudentDetails = () => {
  const [show, setShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [student, setStudentsData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [assignType, setAssignType] = useState("counselor");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedProcessor, setSelectedProcessor] = useState(null);
  const [followUpDate, setFollowUpDate] = useState("");
  const [notes, setNotes] = useState("");

  // Fetch universities
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

  const user_id = localStorage.getItem("user_id");
  const [formData, setFormData] = useState({
    user_id: user_id,
    full_name: "",
    father_name: "",
    identifying_name: "",
    mother_name: "",
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
      user_id: user_id,
      full_name: "",
      father_name: "",
      identifying_name: "",
      mother_name: "",
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
    setPhoto(null);
    setDocuments([]);
    setSelectedStudent(null);
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

      Swal.fire("Success", isEditing ? "Student updated successfully" : "Student created successfully", "success");
      resetForm();
      setShow(false);
      
      // Reload students
      const { data } = await api.get(`${BASE_URL}auth/getAllStudents`);
      setStudentsData(data);
    } catch (err) {
      console.error("Error:", err);
      Swal.fire("Error", "Operation failed", "error");
    }
  };

  // Fetch all students with processor and counselor names
  const fetchStudents = async () => {
    try {
      const response = await api.get(`${BASE_URL}auth/getAllStudents`);
      
      // Enhance student data with processor and counselor names
      const enhancedStudents = await Promise.all(
        response.data.map(async (student) => {
          let enhancedStudent = { ...student };
          
          if (student.processor_id) {
            try {
              const processorRes = await api.get(`${BASE_URL}getProcessorById/${student.processor_id}`);
              enhancedStudent.processorName = processorRes.data.full_name;
            } catch (error) {
              console.error("Error fetching processor details:", error);
            }
          }
          
          if (student.counselor_id) {
            try {
              const counselorRes = await api.get(`${BASE_URL}auth/getUser/${student.counselor_id}`);
              enhancedStudent.counselorName = counselorRes.data.user.full_name;
            } catch (error) {
              console.error("Error fetching counselor details:", error);
            }
          }
          
          return enhancedStudent;
        })
      );
      
      setStudentsData(enhancedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
      Swal.fire("Error", "Failed to fetch students", "error");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Confirm Delete",
      text: "Are you sure you want to delete this student?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete"
    });
    
    if (result.isConfirmed) {
      try {
        await api.delete(`${BASE_URL}auth/deleteStudent/${id}`);
        Swal.fire("Deleted", "Student removed successfully", "success");
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
        Swal.fire("Error", "Delete operation failed", "error");
      }
    }
  };

  // Fetch counselors and processors
  useEffect(() => {
    const fetchCounselorsAndProcessors = async () => {
      try {
        // Fetch counselors
        const counselorsRes = await api.get(`${BASE_URL}counselor`);
        setCounselors(counselorsRes.data);
        
        // Fetch processors
        const processorsRes = await api.get(`${BASE_URL}getAllProcessors`);
        setProcessors(processorsRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        Swal.fire("Error", "Failed to fetch staff data", "error");
      }
    };
    fetchCounselorsAndProcessors();
  }, []);

  const handleOpenAssignModal = (student, type) => {
    setAssignType(type);
    setSelectedApplication({
      id: student.id,
      student_name: student.full_name,
      university_name: student.university_name
    });
    
    // Reset selections
    setSelectedCounselor(null);
    setSelectedProcessor(null);
    setFollowUpDate("");
    setNotes("");
    setShowAssignModal(true);
  };

  const handleAssignSubmit = async () => {
    if (!selectedApplication) return;
    
    if (assignType === "counselor") {
      if (!selectedCounselor) {
        Swal.fire("Warning", "Please select a counselor", "warning");
        return;
      }
      if (!followUpDate) {
        Swal.fire("Warning", "Please select a follow-up date", "warning");
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
          fetchStudents();
          setSelectedCounselor(null);
          setFollowUpDate("");
          setNotes("");
        }
      } catch (error) {
        console.error("Assignment error:", error);
        Swal.fire("Error", "Failed to assign counselor", "error");
      }
    } else {
      // Processor assignment
      if (!selectedProcessor) {
        Swal.fire("Warning", "Please select a processor", "warning");
        return;
      }

      const payload = {
        student_id: selectedApplication.id,
        processor_id: selectedProcessor.id
      };

      try {
        const res = await api.patch(`${BASE_URL}StudentAssignToProcessor`, payload);
        
        if (res.status === 200) {
          Swal.fire("Success", "Processor assigned successfully!", "success");
          setShowAssignModal(false);
          fetchStudents();
          setSelectedProcessor(null);
        }
      } catch (error) {
        console.error("Assignment error:", error);
        Swal.fire("Error", "Failed to assign processor", "error");
      }
    }
  };

  const filtered_student = student.filter((item) => {
    const matchesSearch = 
      item?.mobile_number?.toString().includes(searchQuery) ||
      item?.identifying_name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesUniversity = selectedCourse === "" || item?.university_id == selectedCourse;
    
    return matchesSearch && matchesUniversity;
  });

  useEffect(() => {
    if (formData.full_name && formData.university_id) {
      const university = universities.find(u => u.id.toString() === formData.university_id.toString());
      const universityName = university ? university.name : "";
      const identifying = `${formData.full_name} ${universityName} Deb`;
      setFormData((prev) => ({
        ...prev,
        identifying_name: identifying,
      }));
    }
  }, [formData.full_name, formData.university_id, universities]);

  return (
    <div className="container pt-3">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2 className="mb-3">All Students</h2>
        </div>
        <div>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => {
              resetForm();
              setShow(true);
            }}
          >
            + Add Student
          </button>
        </div>
      </div>

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
              <option key={item?.id} value={item?.id}>{item?.name}</option>
            ))}
          </select>
        </div>

        <div className="col-md-5">
          <label className="form-label">Search By Mobile Number / Identifying Name</label>
          <input
            type="text"
            className="form-control p-1"
            placeholder="Search by mobile number / identifying name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ul className="nav nav-tabs mt-4">
        <li className="nav-item">
          <Link className="nav-link active" to="/studentDetails">
            List View
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/manaDetails">
            Details View
          </Link>
        </li>
      </ul>

      <div className="table-responsive mt-3">
        <table className="table table-striped table-bordered text-center">
          <thead className="table-light text-nowrap">
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Identifying Name</th>
              <th>Mother Name</th>
              <th>University Name</th>
              <th>Father Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Category</th>
              <th>Mobile Number</th>
              <th>Counselor</th>
              <th>Processor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered_student?.map((student, index) => (
              <tr key={index} className="text-nowrap">
                <td>{index + 1}</td>
                <td>
                  <Link
                    to={`/studentProfile/${student?.id}`}
                    className="text-decoration-none text-nowrap"
                  >
                    {student?.full_name}
                  </Link>
                </td>
                <td>{student?.identifying_name}</td>
                <td>{student?.mother_name}</td>
                <td>{student?.university_name}</td>
                <td>{student?.father_name}</td>
                <td>{new Date(student?.date_of_birth).toLocaleDateString()}</td>
                <td>{student?.gender}</td>
                <td>{student?.category}</td>
                <td>{student?.mobile_number}</td>

                <td>
                  {student.counselor_id ? (
                    <span
                      className="badge bg-info"
                      role="button"
                      onClick={() => handleOpenAssignModal(student, "counselor")}
                    >
                      {student.counselorName || "Assigned"}
                    </span>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleOpenAssignModal(student, "counselor")}
                    >
                      Assign Counselor
                    </button>
                  )}
                </td>

                <td>
                  {student.processor_id ? (
                    <span
                      className="badge bg-info"
                      role="button"
                      onClick={() => handleOpenAssignModal(student, "processor")}
                    >
                      {student.processorName || "Assigned"}
                    </span>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleOpenAssignModal(student, "processor")}
                    >
                      Assign Processor
                    </button>
                  )}
                </td>

                <td>
                  <button
                    className="btn btn-primary btn-sm me-1"
                    onClick={() => {
                      setFormData({ ...student });
                      setEditStudentId(student.id);
                      setIsEditing(true);
                      setShow(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-1"
                    onClick={() => handleDelete(student?.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assign Modal */}
      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {assignType === "counselor" ? "Counselor" : "Processor"} Assignment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplication && (
            <>
              <p><strong>Student:</strong> {selectedApplication.student_name}</p>
              <p><strong>University:</strong> {selectedApplication.university_name}</p>

              <Form.Group className="mb-3">
                <Form.Label>
                  Select {assignType === "counselor" ? "Counselor" : "Processor"} *
                </Form.Label>
                <Form.Select
                  value={
                    assignType === "counselor" 
                      ? selectedCounselor?.id || "" 
                      : selectedProcessor?.id || ""
                  }
                  onChange={(e) => {
                    const list = assignType === "counselor" ? counselors : processors;
                    const selected = list.find(c => c.id.toString() === e.target.value);
                    assignType === "counselor" 
                      ? setSelectedCounselor(selected)
                      : setSelectedProcessor(selected);
                  }}
                >
                  <option value="">-- Select {assignType === "counselor" ? "Counselor" : "Processor"} --</option>
                  {(assignType === "counselor" ? counselors : processors).map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.full_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {assignType === "counselor" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Follow-Up Date *</Form.Label>
                    <Form.Control
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
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
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAssignSubmit}>
            {assignType === "counselor" 
              ? (selectedCounselor ? "Update Counselor" : "Assign Counselor")
              : (selectedProcessor ? "Update Processor" : "Assign Processor")}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Student Form Modal */}
      <Modal show={show} onHide={() => setShow(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Student" : "Add New Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Student Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter student name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Father Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter father name"
                  value={formData.father_name}
                  onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Mother Name *</label>
                <input
                  type="text"
                  value={formData.mother_name}
                  className="form-control"
                  placeholder="Enter mother name"
                  onChange={(e) => setFormData({ ...formData, mother_name: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter student's email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Password {!isEditing && "*"}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!isEditing}
                />
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Date of Birth *</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                  required
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Mobile Number *</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter mobile number"
                  value={formData.mobile_number}
                  onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">University Name *</label>
                <select
                  className="form-select"
                  value={formData.university_id}
                  onChange={(e) => setFormData({ ...formData, university_id: e.target.value })}
                  required
                >
                  <option value="">Select university</option>
                  {universities?.map((uni) => (
                    <option key={uni.id} value={uni.id}>
                      {uni.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Student Identifying Name *</label>
                <input
                  type="text"
                  value={formData.identifying_name}
                  className="form-control"
                  onChange={(e) => setFormData({ ...formData, identifying_name: e.target.value })}
                  placeholder="e.g., Rahim Harvard Deb"
                  required
                />
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Gender *</label>
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
                        required
                      />
                      <label className="form-check-label">{g}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Category *</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Select category</option>
                  <option value="General">General</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="OBC">OBC</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label">Address *</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Enter complete address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {isEditing ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudentDetails;