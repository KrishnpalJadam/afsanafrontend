// import React, { useState } from "react";
// import {
//   Container,
//   Table,
//   Card,
//   Badge,
//   Button,
//   Modal,
//   Form,
//   Alert,
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const CounselorApplications = () => {
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [selectedAppId, setSelectedAppId] = useState(null);
//   const [newStatus, setNewStatus] = useState("");
//   const navigate = useNavigate();

//   const [applications, setApplications] = useState([
//     {
//       id: 1,
//       student: "Rahul Sharma",
//       email: "rahul@example.com",
//       university: "University of Toronto",
//       program: "BSc CS",
//       status: "Submitted",
//     },
//     {
//       id: 2,
//       student: "Neha Verma",
//       email: "neha@example.com",
//       university: "Oxford University",
//       program: "MSc Civil Engineering",
//       status: "In Review",
//     },
//     {
//       id: 3,
//       student: "Aman Singh",
//       email: "aman@example.com",
//       university: "UBC",
//       program: "MBA",
//       status: "Approved",
//     },
//   ]);

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Submitted":
//         return <Badge bg="secondary">{status}</Badge>;
//       case "In Review":
//         return <Badge bg="info">{status}</Badge>;
//       case "Approved":
//         return <Badge bg="success">{status}</Badge>;
//       case "Rejected":
//         return <Badge bg="danger">{status}</Badge>;
//       default:
//         return <Badge bg="dark">{status}</Badge>;
//     }
//   };

//   const handleOpenModal = (id) => {
//     setSelectedAppId(id);
//     setShowStatusModal(true);
//   };

//   const handleStatusUpdate = () => {
//     const updated = applications.map((app) =>
//       app.id === selectedAppId ? { ...app, status: newStatus } : app
//     );
//     setApplications(updated);
//     setShowStatusModal(false);
//     setNewStatus("");
//   };

//   return (
//     <Container className="mt-4">
//       <h3 className="mb-4">Student Applications</h3>

//       <Card>
//         <Card.Body>
//           <Table bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Student</th>
//                 <th>Email</th>
//                 <th>University</th>
//                 <th>Program</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applications.map((app, index) => (
//                 <tr key={app.id}>
//                   <td>{index + 1}</td>
//                   <td>{app.student}</td>
//                   <td>{app.email}</td>
//                   <td>{app.university}</td>
//                   <td>{app.program}</td>
//                   <td>{getStatusBadge(app.status)}</td>
//                   <td>
//                     <Button
//                       size="sm"
//                       variant="outline-primary"
//                       className="me-2"
//                       onClick={() => handleOpenModal(app.id)}
//                     >
//                       Update Status
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline-secondary"
//                       className="me-2"
//                       onClick={() => navigate(`/timeline/${app.id}`)}
//                     >
//                       View Timeline
//                     </Button>
//                     <Button size="sm" variant="outline-success">
//                       Upload Docs
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>

//       {/* Update Status Modal */}
//       <Modal
//         show={showStatusModal}
//         onHide={() => setShowStatusModal(false)}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Update Application Status</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group>
//             <Form.Label>Select New Status</Form.Label>
//             <Form.Select
//               value={newStatus}
//               onChange={(e) => setNewStatus(e.target.value)}
//             >
//               <option value="">Select Status</option>
//               <option value="Submitted">Submitted</option>
//               <option value="In Review">In Review</option>
//               <option value="Approved">Approved</option>
//               <option value="Rejected">Rejected</option>
//             </Form.Select>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleStatusUpdate}>
//             Update
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default CounselorApplications;











import { useEffect, useState } from "react";
import api from "../../interceptors/axiosInterceptor";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { Badge } from "react-bootstrap";

const CounselorApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [travelInsuranceStatus, setTravelInsuranceStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch data
  const fetchApplications = async () => {
    try {
      const response = await api.get(`application`);
      console.log(response.data)
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
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>#</th>
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
              currentItems?.map((app, index) => (
                <tr key={app.id}>
                  <td>{index + 1}</td>
                  <td>{app.student_name}</td>
                  <td>{app.university_name}</td>
                  <td>{app.registration_fee_payment || "N/A"}</td>
                  <td>{app.application_fee_payment || "N/A"}</td>
                  <td>{getStatusBadge(app.travel_insurance)}</td>
                  <td>{getStatusBadge(app.proof_of_income)}</td>
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
                    <Link to={`/student/${app.id}`}><button className="btn btn-primary btn-sm">View</button></Link>
                    {/* <button className="btn btn-danger btn-sm  ms-2 " onClick={() => HandleDelete(app.id)}>Delete</button> */}
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

export default CounselorApplications;
