import { useEffect, useState } from "react";
import api from "../../../interceptors/axiosInterceptor";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { Modal, Button, Form, Badge } from "react-bootstrap";
import { saveAs } from "file-saver";
import BASE_URL from "../../../Config";


const StudentDocument = () => {
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
  const [assignType, setAssignType] = useState("counselor"); // 'counselor' or 'processor'

  // Fetch data
 const fetchApplications = async () => {
  const processor_id = localStorage.getItem("user_id"); // fix: use string key

  try {
    const response = await api.get(`getAplicationBYProcessorID/${processor_id}`); // fix: add slash
    console.log(response);

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

    if (stepStatus === "Application") {
      filtered = filtered.filter(app => app.Application_stage === "1");
    } else if (stepStatus === "Interview") {
      filtered = filtered.filter(app => app.Interview === "1");
    } else if (stepStatus === "Visa") {
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

 

  // Calculate indexes
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
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
        setCounselors(res.data);
      } catch (err) {
        console.error("Failed to fetch counselors", err);
      }
    };

    const fetchProcessors = async () => {
      try {
        const res = await api.get(`${BASE_URL}getAllProcessors`);
        setProcessors(res.data);
      } catch (err) {
        console.error("Failed to fetch processors", err);
      }
    };

    fetchCounselors();
    fetchProcessors();
  }, []);

  const handleOpenAssignModal = (application, type) => {
  
    setSelectedApplication(application);
    setAssignType(type);
    setSelectedCounselor(null);
    setSelectedProcessor(null);
    setFollowUpDate("");
    setNotes("");
    setShowAssignModal(true);
  };

  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    setSelectedCounselor(null);
    setSelectedProcessor(null);
  };

 const handleAssign = async () => {
  if (!selectedApplication?.id) {
    alert("No student/application selected");
    return;
  }

  if (assignType === "counselor" && !selectedCounselor?.id) {
    alert("Please select a counselor");
    return;
  }

  if (assignType === "processor" && !selectedProcessor?.id) {
    alert("Please select a processor");
    return;
  }

  const payload = {
    ...(assignType === "counselor"
      ? {
          application_id: selectedApplication.id,
          counselor_id: selectedCounselor.id,
          follow_up: followUpDate,
          notes: notes
        }
      : {
          application_id: selectedApplication.id,
        processor_id: selectedProcessor.id
        })
  };

  console.log("Payload sent to API:", payload);

  try {
    const endpoint =
      assignType === "counselor"
        ? `${BASE_URL}assignCounselorapllication`
        : `${BASE_URL}assignassignProcessorapllication`;

    const res = await api.patch(endpoint, payload);

    if (res.status === 200) {
      Swal.fire(
        "Success",
        `${assignType === "counselor" ? "Counselor" : "Processor"} assigned successfully!`,
        "success"
      );
      setShowAssignModal(false);
      fetchApplications();
    }
  } catch (error) {
    console.error("Assignment error:", error.response?.data || error.message);
    Swal.fire("Error", `Failed to assign ${assignType}`, "error");
  }
};


  const handleDownloadCSV = () => {
    const csvHeaders = ["ID", "Student Name", "University Name"];

    const csvRows = filteredApplications.map(app => [
      app.id,
      app.student_name,
      app.university_name,
    
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
      <h3 className="mb-4">Student Document</h3>

      {/* Filters */}
    

    

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr className="text-center">
              <th>#</th>
              <th>Student Name</th>
              <th>Identifying Name</th>
              <th>University Name</th>
             
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.length > 0 ? (
              currentItems?.map((app, index) => (
                <tr key={app.id}>
                  <td>{index + 1}</td>
                  <td>{app.student_name}</td>
                  <td>{app.studentidentify_name}</td>
                  <td>{app.university_name}</td>
                 

                  <td>
                    <Link to={`/student/${app.id}`}>
                      <button className="btn btn-primary btn-sm">View</button>
                    </Link>
                   
                  </td>
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

      <Modal show={showAssignModal} onHide={handleCloseAssignModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{assignType === "counselor" ? "Counselor" : "Processor"} Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplication && (
            <>
              <p><strong>Student:</strong> {selectedApplication.student_name}</p>
              <p><strong>University:</strong> {selectedApplication.university_name}</p>

              <Form.Group className="mb-3">
                <Form.Label>Select {assignType === "counselor" ? "Counselor" : "Processor"} *</Form.Label>
                <Form.Select
                  value={
                    assignType === "counselor" 
                      ? selectedCounselor?.id || "" 
                      : selectedProcessor?.id || ""
                  }
                  onChange={(e) => {
                    const list = assignType === "counselor" ? counselors : processors;
                    const selected = list.find(c => c.id.toString() === e.target.value);
                    if (assignType === "counselor") {
                      setSelectedCounselor(selected);
                    } else {
                      setSelectedProcessor(selected);
                    }
                  }}
                >
                  <option value="">-- Select {assignType === "counselor" ? "Counselor" : "Processor"} --</option>
                  {(assignType === "counselor" ? counselors : processors).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.full_name}
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
          <Button variant="secondary" onClick={handleCloseAssignModal}>Cancel</Button>
          <Button variant="primary" onClick={handleAssign}>Assign</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentDocument;