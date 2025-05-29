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
      // Try fetching by application ID
      const res = await api.get(`application/${id}`);
      setApplication(res.data);
    } catch (error) {
      console.warn("First API failed, trying studentApplication...", error?.response?.data || error);

      try {
        // Try fetching by student ID
        const fallback = await api.get(`studentApplication/${id}`);
        if (Array.isArray(fallback.data)) {
          setApplication(fallback.data[0]); // extract first item if array
        } else {
          setApplication(fallback.data);
        }
      } catch (secondError) {
        console.error("Second API failed:", secondError?.response?.data || secondError);
      }
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
            {Object.entries(application).slice(0, 47).map(([key, value], index) => {
              // Skip meta fields
              if (["id", "student_id", "student_name", "university_name", "university_id", "registration_date", "application_submission_date"].includes(key)) {
                return null;
              }

              // Format label nicely
              const label = key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

              // List of fields considered as documents (you can extend this list as needed)
              const documentFields = [
                "accommodation_proof", "airplane_ticket_booking", "appendix_form_completed", "bank_statement",
                "birth_certificate", "conditional_offer_letter", "english_language_proof", "europass_cv",
                "european_photo", "fee_confirmation_document", "final_university_offer_letter", "final_offer_letter",
                "financial_support_declaration", "health_insurance", "invoice_with_conditional_offer",
                "motivation_letter", "passport_copy_prepared", "police_clearance_certificate",
                "previous_studies_certificates", "proof_of_income", "proof_of_relationship",
                "residence_permit_form", "travel_insurance", "tuition_fee_transfer_proof",
              ];

              const isDocument = documentFields.includes(key);

              return (
                <tr key={key}>
                  <td>{index + 1}</td>
                  <td>{label}</td>
                  <td>
                    {isDocument ? (
                      value && value.includes("uploads") ? (
                        <Badge bg="success">
                          <FaCheckCircle /> Completed
                        </Badge>
                      ) : (
                        <Badge bg="warning text-dark">
                          <FaTimesCircle /> Pending
                        </Badge>
                      )
                    ) : (() => {
                      // Convert value to readable label
                      let label =
                        (key === "flight_booking_confirmed" && (value == "1" ? "Confirmed" : "Pending")) ||
                        (key === "online_enrollment_completed" && (value == "1" ? "Completed" : "Pending")) ||
                        (key === "accommodation_confirmation" && (value == "1" ? "Received" : "Pending")) ||
                        (key === "Application_stage" && (value == "1" ? "Completed" : "Pending")) ||
                        (key === "Interview" && (value == "1" ? "Done" : "Pending")) ||
                        (key === "Visa_process" && (value == "1" ? "Started" : "Pending")) ||
                        value;

                      // Set badge color
                      let badgeVariant =
                        label === "Confirmed" || label === "Completed" || label === "Received" || label === "Done" || label === "Started"
                          ? "success"
                          : label === "Pending"
                            ? "warning text-dark"
                            : "secondary";

                      return <Badge bg={badgeVariant}>{label}</Badge>;
                    })()}
                  </td>


                  <td>
                    {isDocument && value && value.includes("uploads") ? (
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
