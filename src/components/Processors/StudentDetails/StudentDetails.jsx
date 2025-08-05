import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import { saveAs } from "file-saver";
import api from "../../../interceptors/axiosInterceptor";
import BASE_URL from "../../../Config";

const ProcessorStudentDetails = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [travelInsuranceStatus, setTravelInsuranceStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [stepStatus, setStepStatus] = useState("");
  const [counselors, setCounselors] = useState([]);
  const [processors, setProcessors] = useState([]);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedProcessor, setSelectedProcessor] = useState(null);
  const [followUpDate, setFollowUpDate] = useState("");
  const [notes, setNotes] = useState("");
  const [assignType, setAssignType] = useState("counselor");
  const navigate = useNavigate();

  // Fetch data
  const fetchApplications = async () => {
    const processor_id = localStorage.getItem("user_id");

    try {
      const response = await api.get(
        `auth/getAssignedStudentsinProcessordashboard?processor_id=${processor_id}`
      );
      console.log("Api Response:", response.data);

      if (response.data) {
        setApplications(response.data.users);
        setFilteredApplications(response.data.users);
      } else {
        setApplications([]);
        setFilteredApplications([]);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      setApplications([]);
      setFilteredApplications([]);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Unique Universities & Students
  const uniqueUniversities = [
    ...new Set(applications.map((app) => app?.university_name || "")),
  ].filter(Boolean);

  const uniqueStudents = [
    ...new Set(applications.map((app) => app?.student_name || "")),
  ].filter(Boolean);

  // Filter Change
  useEffect(() => {
    let filtered = [...applications];

    if (selectedUniversity) {
      filtered = filtered.filter(
        (app) => app?.university_name === selectedUniversity
      );
    }

    if (selectedStudent) {
      filtered = filtered.filter(
        (app) => app?.student_name === selectedStudent
      );
    }

    if (travelInsuranceStatus) {
      filtered = filtered.filter((app) => {
        const travelProof = app?.travel_insurance;
        const status =
          travelProof && !travelProof.includes("null") ? "Complete" : "Pending";
        return status === travelInsuranceStatus;
      });
    }

    if (stepStatus === "Application") {
      filtered = filtered.filter((app) => app?.Application_stage === "1");
    } else if (stepStatus === "Interview") {
      filtered = filtered.filter((app) => app?.Interview === "1");
    } else if (stepStatus === "Visa") {
      filtered = filtered.filter((app) => app?.Visa_process === "1");
    }

    setFilteredApplications(filtered);
  }, [
    selectedUniversity,
    selectedStudent,
    travelInsuranceStatus,
    stepStatus,
    applications,
  ]);

  // Status Badge Color Function
  const getStatusBadge = (value) => {
    const status = value && !value.includes("null") ? "Complete" : "Pending";
    const colorClass =
      status === "Complete" ? "badge bg-success" : "badge bg-danger";
    return <span className={colorClass}>{status}</span>;
  };

  const HandleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/application/${id}`);
        await Swal.fire(
          "Deleted!",
          "Your application has been deleted.",
          "success"
        );
        fetchApplications();
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    } else {
      Swal.fire("Cancelled", "Your application is safe :)", "info");
    }
  };

  // Calculate indexes
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const handleStatusToggle = async (appId, currentStatus) => {
    try {
      const newStatus = currentStatus === 0 ? 1 : 0;
      await api.patch(`application/${appId}`, { status: newStatus });
      fetchApplications();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const res = await api.get(`${BASE_URL}counselor`);
        setCounselors(res.data || []);
      } catch (err) {
        console.error("Failed to fetch counselors", err);
        setCounselors([]);
      }
    };

    const fetchProcessors = async () => {
      try {
        const res = await api.get(`${BASE_URL}getAllProcessors`);
        setProcessors(res.data || []);
      } catch (err) {
        console.error("Failed to fetch processors", err);
        setProcessors([]);
      }
    };

    fetchCounselors();
    fetchProcessors();
  }, []);

  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    setSelectedCounselor(null);
    setSelectedProcessor(null);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Assign Student Details</h3>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr className="text-center">
              <th>#</th>
              <th>Student Name</th>
              <th>Identifying Name</th>
              <th>Mother Name</th>
              <th>University Name</th>
              <th>Father Name</th>
              <th>Date of Birth</th>
              <th>Gender </th>
              <th>Category </th>
              <th>Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems?.map((app, index) => (
                <tr key={app.id}>
                  <td>{index + 1}</td>
                  <td
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => navigate(`/processorDetailsTable/${app.id}`)}
                  >
                    {app.full_name}
                  </td>
                  <td>{app.identifying_name}</td>
                  <td>{app.mother_name}</td>
                  <td>{app.university_id}</td>
                  <td>{app.father_name}</td>
                  <td>{app.date_of_birth}</td>
                  <td>{app.gender}</td>
                  <td>{app.category}</td>
                  <td>{app.mobile_number}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
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
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            </li>

            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ProcessorStudentDetails;
