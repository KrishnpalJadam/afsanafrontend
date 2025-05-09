import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Table, Button, Badge } from "react-bootstrap";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaFilePdf } from "react-icons/fa";
import api from "../../interceptors/axiosInterceptor";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch application data
  const fetchApplication = async () => {
    try {
      const res = await api.get(`application/${id}`);
      setApplication(res.data);
    } catch (error) {
      console.error("Error fetching application", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [id]);

  // Check if a field is completed
  const isCompleted = (value) => {
    return value && !String(value).includes("null");
  };

  // Check if a document link is valid for viewing
  const canViewDocument = (value) => {
    return typeof value === "string" && value.includes("uploads");
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Loading state
  if (loading) return <div className="text-center mt-5">Loading...</div>;

  // If no application found
  if (!application) return <div className="text-danger mt-5">Application not found.</div>;

  return (
    <div className="container mt-5">
      <Button variant="secondary" onClick={handleBack} className="mb-4">
        <FaArrowLeft /> Back
      </Button>

      {/* Student and University Info */}
      <Card className="mb-4">
        <Card.Body>
          <h4>{application.student_name}</h4>
          <p><strong>University:</strong> {application.university_name}</p>
          <p><strong>Registration Date:</strong> {application.registration_date ? new Date(application.registration_date).toLocaleDateString() : "-"}</p>
          <p><strong>Application Submission Date:</strong> {application.application_submission_date ? new Date(application.application_submission_date).toLocaleDateString() : "-"}</p>
        </Card.Body>
      </Card>

      {/* Documents & Status */}
      <Card>
        <Card.Header><h5>Application Documents & Status</h5></Card.Header>
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Document/Status</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(application).map(([key, value], index) => {
              // Skip meta fields
              if (["id", "student_id", "student_name", "university_name", "university_id", "registration_date", "application_submission_date"].includes(key)) {
                return null;
              }

              // Format label nicely
              const label = key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

              return (
                <tr key={key}>
                  <td>{index + 1}</td>
                  <td>{label}</td>
                  <td>
                    {isCompleted(value) ? (
                      <Badge bg="success">
                        <FaCheckCircle /> Completed
                      </Badge>
                    ) : (
                      <Badge bg="warning text-dark">
                        <FaTimesCircle /> Pending
                      </Badge>
                    )}
                  </td>
                  <td>
                    {isCompleted(value) && canViewDocument(value) ? (
                      <a href={value} target="_blank" rel="noreferrer">
                        <FaFilePdf /> View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default ApplicationDetails;
