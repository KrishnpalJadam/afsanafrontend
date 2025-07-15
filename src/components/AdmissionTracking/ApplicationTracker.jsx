import { useEffect, useState } from "react";
import api from "../../interceptors/axiosInterceptor";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { Modal, Button, Form, Badge } from "react-bootstrap";
import { saveAs } from "file-saver";

import BASE_URL from "../../Config";

const StudentList = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [travelInsuranceStatus, setTravelInsuranceStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [stepStatus, setStepStatus] = useState(""); // New state
  const [counselors, setCounselors] = useState([]); // Counselor list

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
const [followUpDate, setFollowUpDate] = useState("");
const [notes, setNotes] = useState("");

  // Fetch data
  const fetchApplications = async () => {
    try {
      const response = await api.get(`application`);
      setApplications(response.data);
      setFilteredApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

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
      filtered = filtered.filter(app => app.university_name === selectedUniversity);
    }

    if (selectedStudent) {
      filtered = filtered.filter(app => app.student_name === selectedStudent);
    }

    if (travelInsuranceStatus) {
      filtered = filtered.filter(app => {
        const travelProof = app.travel_insurance;
        const status = travelProof && !travelProof.includes("null") ? "Complete" : "Pending";
        return status === travelInsuranceStatus;
      });
    }

    // ✅ Step filter logic
    // ✅ Step filter logic
    if (stepStatus === "Application") {
      filtered = filtered.filter(app => app.Application_stage === "1");
    } else if (stepStatus === "Interview") {
      filtered = filtered.filter(app => app.Interview === "1");
    }
    else if (stepStatus === "Visa") {
      filtered = filtered.filter(app => app.Visa_process === "1");
    }




    setFilteredApplications(filtered);
  }, [selectedUniversity, selectedStudent, travelInsuranceStatus, stepStatus, applications]);

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

  const HandleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/application/${id}`);
        await Swal.fire('Deleted!', 'Your application has been deleted.', 'success');

        // 👇 Refresh the list after successful delete
        fetchApplications();

      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    } else {
      Swal.fire('Cancelled', 'Your application is safe :)', 'info');
    }
  };
  // Calculate indexes
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const handleStatusToggle = async (appId, currentStatus) => {
    try {
      const newStatus = currentStatus === 0 ? 1 : 0;
      await api.patch(`application/${appId}`, { status: newStatus });

      fetchApplications()
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };


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


  const handleOpenAssignModal = (application) => {
    setSelectedApplication(application);
    setSelectedCounselor(null);
      setFollowUpDate("");
  setNotes("");
    setShowAssignModal(true);
  };
  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    setSelectedCounselor(null); // Reset selected counselor when closing modal
  };



  const handleAssignCounselor = async () => {
    if (!selectedCounselor || !selectedApplication) {
      alert("Please select all fields.");
      return;
    }

    const payload = {
      application_id: selectedApplication.id,
      counselor_id: selectedCounselor.id,
   follow_up: followUpDate,
    notes: notes
    };

    try {
      const res = await api.patch(`${BASE_URL}assignCounselorapllication`, payload);
      if (res.status === 200) {
        Swal.fire("Success", "Counselor assigned successfully!", "success");
        setShowAssignModal(false);
        fetchApplications(); // Refresh list
      }
    } catch (error) {
      console.error("Assignment error:", error);
      Swal.fire("Error", "Failed to assign counselor.", "error");
    }
  };
const handleDownloadCSV = () => {
  const csvHeaders = ["ID", "Student Name", "University Name", "Travel Insurance", "Proof of Income", "Counselor", "Status"];

  const csvRows = filteredApplications.map(app => [
    app.id,
    app.student_name,
    app.university_name,
    app.travel_insurance || "N/A",
    app.proof_of_income || "N/A",
    app.counselor_name || "Unassigned",
    app.status === 1 ? "Verified" : "Pending"
  ]);

  const csvContent = [csvHeaders, ...csvRows].map(e => e.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "applications.csv");
};
const handleResetFilters = () => {
  setSelectedUniversity("");
  setSelectedStudent("");
  setTravelInsuranceStatus("");
  setStepStatus("");
};


  return (
    <div className="container mt-4">
      <h3 className="mb-4">Application Tracker</h3>

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
        <div className="col-md-3">
          <label>Step</label>
          <select
            className="form-select"
            value={stepStatus}
            onChange={(e) => setStepStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="Application">Application Stage</option>
            <option value="Interview">Interview Stage</option>
            <option value="Visa">Visa Process Stage</option>
          </select>
        </div>

      </div>
<div className="d-flex justify-content-between mb-3">
  <button className="btn btn-outline-secondary" onClick={handleResetFilters}>
    Reset Filters
  </button>

  <button className="btn btn-success" onClick={handleDownloadCSV}>
    Download CSV
  </button>
</div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr className="text-center">
              <th>#</th>
              <th>Student Name</th>
              <th>University Name</th>
              {/* <th>Registration Fee</th>
              <th>Application Fee</th> */}
              <th>Travel Insurance</th>
              <th>Proof of Income</th>
              <th>Assign to</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.length > 0 ? (
              currentItems?.map((app, index) => (
                <tr key={app.id}>
                  <td>{index + 1}</td>
                  <td>{app.student_name}</td>
                  <td>{app.university_name}</td>
                  <td>{getStatusBadge(app.travel_insurance)}</td>
                  <td>{getStatusBadge(app.proof_of_income)}</td>

                  <td>
                    {app.counselor_id ? (
                      <span className="badge bg-info">
                        {app.counselor_name || "Assigned"}
                      </span>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleOpenAssignModal(app)}
                        disabled={app.counselor_id}
                      >
                        Assign Counselor
                      </button>
                    )}
                  </td>

                  <td>
                    <Badge bg={app.status === 1 ? "success" : "secondary"}>
                      {app.status === 1 ? "Verified" : "Pending"}
                    </Badge>
                    <button
                      className="btn btn-sm btn-warning ms-2"
                      onClick={() => handleStatusToggle(app.id, app.status)}
                    >
                      {app.status === 1 ? "Mark Pending" : "Verify"}
                    </button>
                  </td>

                  <td>
                    <Link to={`/student/${app.id}`}>
                      <button className="btn btn-primary btn-sm">View</button>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => HandleDelete(app.id)}
                    >
                      Delete
                    </button>
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


    </div>
  );
};

export default StudentList;
