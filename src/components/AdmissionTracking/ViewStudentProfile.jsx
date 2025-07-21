// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Card, Table, Button, Badge } from "react-bootstrap";
// import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaFilePdf } from "react-icons/fa";
// import api from "../../interceptors/axiosInterceptor";

// const ApplicationDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [application, setApplication] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch application data
//   const fetchApplication = async () => {
//     try {
//       // Try fetching by application ID
//       const res = await api.get(`application/${id}`);
//       setApplication(res.data);
//     } catch (error) {
//       console.warn("First API failed, trying studentApplication...", error?.response?.data || error);

//       try {
//         // Try fetching by student ID
//         const fallback = await api.get(`studentApplication/${id}`);
//         if (Array.isArray(fallback.data)) {
//           setApplication(fallback.data[0]); // extract first item if array
//         } else {
//           setApplication(fallback.data);
//         }
//       } catch (secondError) {
//         console.error("Second API failed:", secondError?.response?.data || secondError);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApplication();
//   }, [id]);

//   // Check if a field is completed
//   const isCompleted = (value) => {
//     return value && !String(value).includes("null");
//   };

//   // Check if a document link is valid for viewing
//   const canViewDocument = (value) => {
//     return typeof value === "string" && (
//       value.includes("uploads") || value.includes("res.cloudinary.com")
//     );
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   // Loading state
//   if (loading) return <div className="text-center mt-5">Loading...</div>;

//   // If no application found
//   if (!application) return <div className="text-danger mt-5">Application not found.</div>;

//   return (
//     <div className="container mt-5">
//       <Button variant="secondary" onClick={handleBack} className="mb-4">
//         <FaArrowLeft /> Back
//       </Button>

//       {/* Student and University Info */}
//       <Card className="mb-4">
//         <Card.Body>
//           <h4>{application.student_name}</h4>
//           <p><strong>University:</strong> {application.university_name}</p>
//           <p><strong>Registration Date:</strong> {application.registration_date ? new Date(application.registration_date).toLocaleDateString() : "-"}</p>
//           <p><strong>Application Submission Date:</strong> {application.application_submission_date ? new Date(application.application_submission_date).toLocaleDateString() : "-"}</p>
//         </Card.Body>
//       </Card>

//       {/* Documents & Status */}
//       <Card>
//         <Card.Header><h5>Application Documents & Status</h5></Card.Header>
//         <Table responsive bordered hover>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Document/Status</th>
//               <th>Status</th>
//               <th>View</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(application).slice(0, 47).map(([key, value], index) => {
//               // Skip meta fields
//               if (["id", "student_id", "student_name", "university_name", "university_id", "registration_date", "application_submission_date"].includes(key)) {
//                 return null;
//               }

//               // Format label nicely
//               const label = key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

//               // List of fields considered as documents (you can extend this list as needed)
//               const documentFields = [
//                 "accommodation_proof", "airplane_ticket_booking", "appendix_form_completed", "bank_statement",
//                 "birth_certificate", "conditional_offer_letter", "english_language_proof", "europass_cv",
//                 "european_photo", "fee_confirmation_document", "final_university_offer_letter", "final_offer_letter",
//                 "financial_support_declaration", "health_insurance", "invoice_with_conditional_offer",
//                 "motivation_letter", "passport_copy_prepared", "police_clearance_certificate",
//                 "previous_studies_certificates", "proof_of_income", "proof_of_relationship",
//                 "residence_permit_form", "travel_insurance", "tuition_fee_transfer_proof",
//               ];

//               const isDocument = documentFields.includes(key);

//               return (
//                 <tr key={key}>
//                   <td>{index + 1}</td>
//                   <td>{label}</td>
//                   <td>
//                     {isDocument ? (
//                       canViewDocument(value) ? (
//                         <Badge bg="success">
//                           <FaCheckCircle /> Completed
//                         </Badge>
//                       ) : (
//                         <Badge bg="warning text-dark">
//                           <FaTimesCircle /> Pending
//                         </Badge>
//                       )
//                     ) : (() => {
//                       // Convert value to readable label
//                       let label =
//                         (key === "flight_booking_confirmed" && (value == "1" ? "Confirmed" : "Pending")) ||
//                         (key === "online_enrollment_completed" && (value == "1" ? "Completed" : "Pending")) ||
//                         (key === "accommodation_confirmation" && (value == "1" ? "Received" : "Pending")) ||
//                         (key === "Application_stage" && (value == "1" ? "Completed" : "Pending")) ||
//                         (key === "Interview" && (value == "1" ? "Done" : "Pending")) ||
//                         (key === "Visa_process" && (value == "1" ? "Started" : "Pending")) ||
//                         value;

//                       // Set badge color
//                       let badgeVariant =
//                         label === "Confirmed" || label === "Completed" || label === "Received" || label === "Done" || label === "Started"
//                           ? "success"
//                           : label === "Pending"
//                             ? "warning text-dark"
//                             : "secondary";

//                       return <Badge bg={badgeVariant}>{label}</Badge>;
//                     })()}
//                   </td>

//                   <td>
//                     {isDocument && canViewDocument(value) ? (
//                       <a href={value} target="_blank" rel="noreferrer">
//                         <FaFilePdf /> View
//                       </a>
//                     ) : (
//                       "-"
//                     )}

//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>

//         </Table>
//       </Card>
//     </div>
//   );
// };

// export default ApplicationDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Table, Button, Badge } from "react-bootstrap";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaFilePdf,
} from "react-icons/fa";
import api from "../../interceptors/axiosInterceptor";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1); // Step: 1=Application, 2=Interview, 3=Visa

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await api.get(`application/${id}`);
        setApplication(res.data);
      } catch (error) {
        try {
          const fallback = await api.get(`studentApplication/${id}`);
          setApplication(
            Array.isArray(fallback.data) ? fallback.data[0] : fallback.data
          );
        } catch (err) {
          console.error("Failed to fetch application data", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const documentFields = [
    "accommodation_proof",
    "airplane_ticket_booking",
    "appendix_form_completed",
    "bank_statement",
    "birth_certificate",
    "conditional_offer_letter",
    "english_language_proof",
    "europass_cv",
    "european_photo",
    "fee_confirmation_document",
    "final_university_offer_letter",
    "final_offer_letter",
    "financial_support_declaration",
    "health_insurance",
    "invoice_with_conditional_offer",
    "motivation_letter",
    "passport_copy_prepared",
    "police_clearance_certificate",
    "previous_studies_certificates",
    "proof_of_income",
    "proof_of_relationship",
    "residence_permit_form",
    "travel_insurance",
    "tuition_fee_transfer_proof",
  ];

  const applicationFields = [
    "registration_date",
    "application_submission_date",
    "passport_copy_prepared",
    "english_language_proof",
    "conditional_offer_letter",
    "fee_confirmation_document",
  ];

  const interviewFields = [
    "motivation_letter",
    "europass_cv",
    "interview_date",
    "interview_feedback",
  ];

  const visaFields = [
    "health_insurance",
    "travel_insurance",
    "residence_permit_form",
    "flight_booking_confirmed",
    "visa_status",
    "police_clearance_certificate",
    "tuition_fee_transfer_proof",
  ];

  const getFieldsForStep = () => {
    if (step === 1) return applicationFields;
    if (step === 2) return interviewFields;
    if (step === 3) return visaFields;
    return [];
  };

  const canViewDocument = (value) =>
    typeof value === "string" &&
    (value.includes("uploads") || value.includes("res.cloudinary.com"));

  const getFieldLabel = (key) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const getBadge = (key, value) => {
    if (documentFields.includes(key)) {
      return canViewDocument(value) ? (
        <Badge bg="success">
          <FaCheckCircle /> Completed
        </Badge>
      ) : (
        <Badge bg="warning text-dark">
          <FaTimesCircle /> Pending
        </Badge>
      );
    }

    let label =
      (key === "flight_booking_confirmed" &&
        (value === "1" ? "Confirmed" : "Pending")) ||
      (key === "online_enrollment_completed" &&
        (value === "1" ? "Completed" : "Pending")) ||
      (key === "accommodation_confirmation" &&
        (value === "1" ? "Received" : "Pending")) ||
      (key === "Application_stage" &&
        (value === "1" ? "Completed" : "Pending")) ||
      (key === "Interview" && (value === "1" ? "Done" : "Pending")) ||
      (key === "Visa_process" && (value === "1" ? "Started" : "Pending")) ||
      value;

    const badgeVariant = [
      "Confirmed",
      "Completed",
      "Received",
      "Done",
      "Started",
    ].includes(label)
      ? "success"
      : label === "Pending"
      ? "warning text-dark"
      : "secondary";

    return <Badge bg={badgeVariant}>{label}</Badge>;
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!application)
    return <div className="text-danger mt-5">Application not found.</div>;
  // ✅ Determine if steps are complete
  const isApplicationComplete = applicationFields.every((k) => application[k]);
  const isInterviewComplete = interviewFields.every((k) => application[k]);

  return (
    <div className="container mt-5">
      <Button variant="secondary" onClick={handleBack} className="mb-4">
        <FaArrowLeft /> Back
      </Button>

      {/* Student Info */}
      <Card className="mb-3">
        <Card.Body>
          <h4>
            <strong>Student Name:</strong> {application.student_name}
          </h4>
          <div className="row">
            <div className="col-md-4">
              <p>
                <strong>University:</strong> {application.university_name}
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <strong>Identifying Name:</strong>{" "}
                {application.identify_name}
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <strong>Registration Date:</strong>{" "}
                {application.registration_date
                  ? new Date(application.registration_date).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p>
                <strong>Application Submission Date:</strong>{" "}
                {application.application_submission_date
                  ? new Date(
                      application.application_submission_date
                    ).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Stepper Navigation */}
      <div className="mb-4">
        {/* Professional Stepper UI */}
        <ul className="stepper">
          <li
            className={step === 1 ? "active" : step > 1 ? "completed" : ""}
            onClick={() => setStep(1)}
            style={{ cursor: "pointer" }}
          >
            <div className="step-icon">
              {step > 1 ? <FaCheckCircle /> : "1"}
            </div>
            <span>Application</span>
          </li>
          <li
            className={step === 2 ? "active" : step > 2 ? "completed" : ""}
            onClick={() => setStep(2)}
            style={{ cursor: "pointer" }}
          >
            <div className="step-icon">
              {step > 2 ? <FaCheckCircle /> : "2"}
            </div>
            <span>Interview</span>
          </li>
          <li
            className={step === 3 ? "active" : ""}
            onClick={() => setStep(3)}
            style={{ cursor: "pointer" }}
          >
            <div className="step-icon">3</div>
            <span>Visa Process</span>
          </li>
        </ul>
      </div>

      {/* Status Table */}
      <Card>
        <Card.Header>
          <h5>
            {step === 1 ? "Application" : step === 2 ? "Interview" : "Visa"}{" "}
            Stage Details
          </h5>
        </Card.Header>
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Field</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {getFieldsForStep().map((key, index) => {
              const value = application[key];
              return (
                <tr key={key}>
                  <td>{index + 1}</td>
                  <td>{getFieldLabel(key)}</td>
                  <td>{getBadge(key, value)}</td>
                  <td>
                    {documentFields.includes(key) && canViewDocument(value) ? (
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
