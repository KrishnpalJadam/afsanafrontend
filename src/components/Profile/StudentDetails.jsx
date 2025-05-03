import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Config";

const StudentDetails = () => {
  const [show, setShow] = useState(false); // State for modal visibility
  const [selectedStudent, setSelectedStudent] = useState(null); // State for selected student
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedCourse, setSelectedCourse] = useState(""); // State for selected class
  const [selectedSection, setSelectedSection] = useState(""); // State for selected section
  const [student, setStudentsData] = useState([]);

  // Sample student data
  const students = [
    {
      admissionNo: 1001,
      name: "Hudson",
      idNo: "0201",
      course: "University of California, Berkeley",
      fatherName: "Emrys",
      dob: "02/06/2019",
      gender: "Male",
      category: "General",
      mobile: "16514840184",
    },
    {
      admissionNo: 1020,
      name: "Marlie",
      idNo: "0204",
      course: "University of California, Berkeley",
      fatherName: "Lester",
      dob: "05/22/2019",
      gender: "Female",
      category: "General",
      mobile: "6595084801",
    },
    {
      admissionNo: 120036,
      name: "Ayan Desai",
      idNo: "23620",
      course: "Massachusetts Institute of Technology",
      fatherName: "Abhinand",
      dob: "10/15/2015",
      gender: "Male",
      category: "General",
      mobile: "9067875674",
    },
    {
      admissionNo: 2152,
      name: "Kaylen",
      idNo: "0205",
      course: "Massachusetts Institute of Technology",
      fatherName: "Lyndon",
      dob: "06/19/2019",
      gender: "Female",
      category: "General",
      mobile: "54180185420",
    },
    {
      admissionNo: 7663,
      name: "Paul S. Bealer",
      idNo: "6230",
      course: "Stanford University",
      fatherName: "McMahon",
      dob: "08/13/2005",
      gender: "Male",
      category: "General",
      mobile: "789067867",
    },
    {
      admissionNo: 96302,
      name: "Jacob Bethell",
      idNo: "221002",
      course: "Stanford University",
      fatherName: "Brydon",
      dob: "08/19/2016",
      gender: "Male",
      category: "General",
      mobile: "065758878",
    },
    {
      admissionNo: 96302,
      name: "Jacob Bethell",
      idNo: "221002",
      course: "Stanford University",
      fatherName: "Brydon",
      dob: "08/19/2016",
      gender: "Male",
      category: "General",
      mobile: "065758878",
    },
    {
      admissionNo: 96302,
      name: "Jacob Bethell",
      idNo: "221002",
      course: "Stanford University",
      fatherName: "Brydon",
      dob: "08/19/2016",
      gender: "Male",
      category: "General",
      mobile: "065758878",
    },
    {
      admissionNo: 96302,
      name: "Jacob Bethell",
      idNo: "221002",
      course: "Stanford University",
      fatherName: "Brydon",
      dob: "08/19/2016",
      gender: "Male",
      category: "General",
      mobile: "065758878",
    },
  ];
  useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.get(`${BASE_URL}/students`);
         setStudentsData(response.data);
       } catch (error) {
         console.error(error);
       }
     }
    
  },[])

  // Function to handle search
  const filteredStudents = students.filter((student) => {
    const matchesSearchQuery =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.idNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.admissionNo.toString().includes(searchQuery);

    const matchesCourse = selectedCourse
      ? student.course.includes(selectedCourse)
      : true;
    const matchesSection = selectedSection
      ? student.course.includes(`(${selectedSection})`)
      : true;

    return matchesSearchQuery && matchesCourse && matchesSection;
  });

  // Function to handle modal show
  const handleShow = (student) => {
    setSelectedStudent(student);
    setShow(true);
  };

  // Function to handle modal close
  const handleClose = () => setShow(false);

  return (
    <div className="container pt-3">
      <div style={{ display: "flex", justifyContent: "space-between" }}>


        <div>
          <h2 className="mb-3">Select Criteria</h2>
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
            <option>University of California, Berkeley</option>
            <option>University of California, Berkeley</option>
            <option>Massachusetts Institute of Technology	</option>
            <option>Massachusetts Institute of Technology	</option>
            <option>Stanford University</option>
            <option>Stanford University</option>
          </select>
        </div>


        <div className="col-md-5">
          <label className="form-label">Search By Keyword</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search By Student Name, Roll Number, Enroll Number, etc."
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
            {filteredStudents.map((student, index) => (
              <tr key={index} className="text-nowrap">
                <td>
                  <Link
                    to={{
                      pathname: `/studentProfile/${student.admissionNo}`,
                      state: { selectedStudent: student },
                    }}
                    className="text-decoration-none text-nowrap"
                  >
                    {student.name}
                  </Link>
                </td>
                <td>{student.admissionNo}</td>
                <td>{student.idNo}</td>
                <td>{student.course}</td>
                <td>{student.fatherName}</td>
                <td>{student.dob}</td>
                <td>{student.gender}</td>
                <td>{student.category}</td>
                <td>{student.mobile}</td>
                <td>
                  <button
                    className="btn btn-light btn-sm me-1"
                    onClick={() => handleShow(student)}
                  >
                    ☰
                  </button>
                  <button className="btn btn-light btn-sm me-1">✎</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for student details (if needed) */}
      {selectedStudent && (
        <div
          className={`modal ${show ? "show" : ""}`}
          style={{ display: show ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedStudent.name}'s Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <p>Admission No: {selectedStudent.admissionNo}</p>
                <p>Roll No: {selectedStudent.rollNo}</p>
                <p>Class: {selectedStudent.course}</p>
                <p>Father's Name: {selectedStudent.fatherName}</p>
                <p>Date of Birth: {selectedStudent.dob}</p>
                <p>Gender: {selectedStudent.gender}</p>
                <p>Category: {selectedStudent.category}</p>
                <p>Mobile: {selectedStudent.mobile}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
                />
              </div>
              <div className="modal-body">
                <form className="student-form">
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
                      >
                        <option selected="" disabled="">
                          Select university
                        </option>
                        <option value="University of California, Berkeley">
                          University of California, Berkeley
                        </option>
                        <option value="Massachusetts Institute of Technology">
                          Massachusetts Institute of Technology
                        </option>
                        <option value="Stanford University">
                          Stanford University
                        </option>
                        <option value="other">Other</option>
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
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 student-form-group">
                      <label className="student-form-label">Gender</label>
                      <div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="genderMale"
                            defaultValue="Male"
                          />
                          <label className="form-check-label" htmlFor="genderMale">
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="genderFemale"
                            defaultValue="Female"
                          />
                          <label className="form-check-label" htmlFor="genderFemale">
                            Female
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="genderOther"
                            defaultValue="Other"
                          />
                          <label className="form-check-label" htmlFor="genderOther">
                            Other
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 student-form-group">
                      <label htmlFor="category" className="student-form-label">
                        Category
                      </label>
                      <select
                        className="form-select student-form-select"
                        id="category"
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
                        defaultValue={""}
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
                        multiple=""
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
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn student-form-btn btn-primary"
                      >
                        Submit
                      </button>
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
