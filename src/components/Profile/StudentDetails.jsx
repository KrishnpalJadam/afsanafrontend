import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import BASE_URL from "../../Config";
import { FaTrash } from "react-icons/fa";
import api from "../../interceptors/axiosInterceptor";
import { hasPermission } from "../../authtication/permissionUtils";

const StudentDetails = () => {
  const [show, setShow] = useState(false); // State for modal visibility
  const [selectedStudent, setSelectedStudent] = useState(null); // State for selected student
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedCourse, setSelectedCourse] = useState(""); // State for selected class
  // const [selectedSection, setSelectedSection] = useState(""); // State for selected section
  const [student, setStudentsData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
const [editStudentId, setEditStudentId] = useState(null);
const [universities, setUniversities] = useState([]);
 
// Fetch universities
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await api.get(`${BASE_URL}universities`);
      console.log("university",response.data); // To check if data is correct
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
    student_name: "",
    father_name: "",
    admission_no: "",
    id_no: "",
    mobile_number: "",
    university_id: "",
    date_of_birth: "",
    gender: "",
    category: "",
    address: "",
    full_name: "",
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
      student_name: "",
      father_name: "",
      admission_no: "",
      id_no: "",
      mobile_number: "",
      university_id: "",
      date_of_birth: "",
      gender: "",
      category: "",
      address: "",
      full_name: "",
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
       for (let [key, value] of formPayload.entries()) {
        console.log(`${key}:`, value);
      }
      const res = await api({
        method,
        url,
        data: formPayload,
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      alert(isEditing ? "Student updated" : "Student created");
      setFormData({
        user_id:  user_id,
        student_name: "",
        father_name: "",
        admission_no: "",
        id_no: "",
        mobile_number: "",
        university_id: "",
        date_of_birth: "",
        gender: "",
        category: "",
        address: "",
        full_name: "",
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
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get(`${BASE_URL}auth/getAllStudents`);
        setStudentsData(response.data);
        console.log("student", response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();

  }, [])

  const handleDelete = (id) => {
    const deleteTask =  async () => {
       try {
         const response = await fetch(`${BASE_URL}auth/deleteStudent/${id}`, {
           method: "DELETE",
         });
         const data = await response.json();
         console.log(data);
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
  const filtered_student = student.filter((item)=>{
       return item?.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  })
  
 
  return (
    <div className="container pt-3">
      <div style={{ display: "flex", justifyContent: "space-between" }}>


        <div>
          <h2 className="mb-3">All Students</h2>
        </div>
        <div>
          {/* <!-- Trigger Button --> */}
          <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#studentFormModal">
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
            {
              universities?.map((item)=>{
       return <option key={item?.id} value={item?.id}>{item?.name}</option>
              })
            }
            
             
          </select>
        </div>


        <div className="col-md-5">
          <label className="form-label">Search By Keyword</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search By Student Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="col-md-2 d-flex">
          <button className="btn btn-secondary mt-4 w-100" style={{ backgroundColor: "gray", border: "none" }}>
            <i className="fas fa-search"></i> Search
          </button>
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
              <th>Student Name</th>
              <th>Admission No</th>
              <th>ID No.</th>
              <th>University Name</th>
              <th>Father Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Category</th>
              <th>Mobile Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered_student?.map((student, index) => (
              <tr key={index} className="text-nowrap">
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
                <td>{student?.university_id}</td>
                <td>{student?.father_name}</td>
                <td>{new Date(student?.date_of_birth).toLocaleDateString()}</td>
                <td>{student?.gender}</td>
                <td>{student?.category}</td>
                <td>{student?.mobile_number}</td>
                <td>
                  {/* <button
                    className="btn btn-light btn-sm me-1"
                    onClick={() => handleShow(student)}
                  >
                    ☰
                  </button> */}
                  <button className="btn btn-light btn-sm me-1"
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
                  
                  >✎</button>
                  <button className="btn btn-light btn-sm me-1" onClick={()=>{handleDelete(student?.id)}}> <FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
                        value={formData.student_name}
                        onChange={(e) =>
                          setFormData({ ...formData, student_name: e.target.value, full_name: e.target.value })
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
                          {universities ?.map((uni) => (
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
                  <div className="row">
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
                  </div>
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
                        {isEditing==true?<button
                        type="submit"
                        className="btn student-form-btn btn-primary"
                      >
                        update
                      </button>:<button
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

export default StudentDetails;