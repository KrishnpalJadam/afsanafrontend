import { useEffect, useState } from "react";
import api from "../../interceptors/axiosInterceptor";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const MyApplication = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [travelInsuranceStatus, setTravelInsuranceStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [studentid, setStudentId] = useState("");
      
  useEffect(() => {
    const is_id = localStorage.getItem("student_id");
    if (is_id) {
      setStudentId(is_id);
    }
  }, []);

  // Fetch applications when studentid is set
useEffect(() => {
  if (studentid) {
    fetchApplications();
  }
}, [studentid]);

  // Fetch data
  const fetchApplications = async () => {
    try {
      const response = await api.get(`studentApplication/${studentid}`);
      setApplications(response.data);
      setFilteredApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  // Unique Universities & Students
  const uniqueUniversities = [
    ...new Set(applications.map((app) => app.university_name)),
  ];

  const uniqueStudents = [
    ...new Set(applications.map((app) => app.student_name)),
  ];

  // Filter Change
  useEffect(() => {
    let filtered = [...applications];

    if (selectedUniversity) {
      filtered = filtered.filter(
        (app) => app.university_name === selectedUniversity
      );
    }

    if (selectedStudent) {
      filtered = filtered.filter(
        (app) => app.student_name === selectedStudent
      );
    }

    if (travelInsuranceStatus) {
      filtered = filtered.filter((app) => {
        const travelProof = app.travel_insurance;
        const status =
          travelProof && !travelProof.includes("null") ? "Complete" : "Pending";
        return status === travelInsuranceStatus;
      });
    }

    setFilteredApplications(filtered);
  }, [selectedUniversity, selectedStudent, travelInsuranceStatus, applications]);

  // Status Badge Color Function
  const getStatusBadge = (value) => {
    const status =
      value && !value.includes("null") ? "Complete" : "Pending";
    const colorClass =
      status === "Complete"
        ? "badge bg-success"
        : "badge bg-danger";
    return <span className={colorClass}>{status}</span>;
  };


// Calculate indexes
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);


  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Application </h3>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-3">
          <label>University</label>
          <select
            className="form-select"
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}>
            <option value="">All</option>
            {uniqueUniversities.map((uni, index) => (
              <option key={index} value={uni}>
                {uni}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label>Student</label>
          <select
            className="form-select"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}>
            <option value="">All</option>
            {uniqueStudents.map((student, index) => (
              <option key={index} value={student}>
                {student}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label>Travel Insurance Status</label>
          <select className="form-select"
            value={travelInsuranceStatus}
            onChange={(e) => setTravelInsuranceStatus(e.target.value)}>
            <option value="">All</option>
            <option value="Complete">Complete</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Student Name</th>
              <th>University Name</th>
              <th>Registration Fee</th>
              <th>Application Fee</th>
              <th>Travel Insurance</th>
              <th>Proof of Income</th>
           <th>Status</th>   
              <th>Action</th>
            </tr>
          </thead>
      <tbody>
  {currentItems?.length > 0 ? (
    currentItems?.map((app) => (
      <tr key={app.id}>
        <td>{app.student_name}</td>
        <td>{app.university_name}</td>
        <td>{app.registration_fee_payment || "N/A"}</td>
        <td>{app.application_fee_payment || "N/A"}</td>
        <td>{getStatusBadge(app.travel_insurance)}</td>
        <td>{getStatusBadge(app.proof_of_income)}</td>
        <td>
          <span
            className={`badge ${
              app.status === 1 ? "bg-success" : "bg-secondary" }`}>
            {app.status === 1 ? "Verified" : "Pending"}
          </span>
        </td>
        <td>
          <Link to={`/student/${app.id}`}>
            <button className="btn btn-primary btn-sm">View</button>
          </Link>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8" className="text-center">
        No applications found.
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
      {totalPages > 1 && (
  <nav className="mt-3">
    <ul className="pagination justify-content-center">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
      </li>
      
      {[...Array(totalPages)].map((_, i) => (
        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
          <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </li>
    </ul>
  </nav>
)}

    </div>
  );
};

export default MyApplication;
