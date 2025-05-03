import React, { useState } from "react";
import { Form, Button, Col, Row, ProgressBar, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BmuUniversity.css"; // Same CSS from BMU

const initialData = {
  registrationFeeProof: null,
  registrationFeeAmount: "",
  totalTuitionFee: "",
  visaFeeAmount: "",
  accommodationFeeAmount: "",
  applicationFeeProof: null,
  interviewConfirmation: null,
  interviewOutcome: "",
  conditionalOfferLetter: null,
  tuitionFeeProof: null,
  finalOfferLetter: null,
  appendixForm: null,
  passportCopy: null,
  financialSupportDeclaration: null,
  familyCertificate: null,
  englishProof: null,
  incomeProof: null,
  airplaneTicket: null,
  policeClearance: null,
  europassCV: null,
  birthCertificate: null,
  bankStatement: null,
  accommodationProof: null,
  motivationLetter: null,
  academicCertificates: null,
  travelInsurance: null,
  passportPhoto: null,
  healthInsurance: null,
  visaServiceFeeProof: null,
  flightBookingConfirmation: null,
  onlineEnrollmentProof: null,
  enrollmentConfirmation: null,
};

const WekerleMultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);
  const handleSubmit = () => console.log("Wekerle Form Submitted:", formData);

  const progress = (step / 6) * 100;

  const renderUploadCard = (icon, label, name) => (
    <Card className="mb-3 upload-card">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <strong>
            {icon} {label}
          </strong>
        </div>
        <Form.Control type="file" name={name} onChange={handleFileChange} />
      </Card.Body>
    </Card>
  );

  return (
    <div className="application-form-container">
      <h2 className="form-title">
        University of Wekerle Business School - Application Form
      </h2>
      <ProgressBar now={progress} className="mb-4 step-progress-bar" />

      {step === 1 && (
        <>
          <h4>📂 Registration & File Opening</h4>
          {renderUploadCard(
            "💳",
            "Registration Fee Payment Proof",
            "registrationFeeProof"
          )}

          <div className="d-flex justify-content-between">
            <Button onClick={handlePrevious}>Previous</Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h4>📂 Application Status</h4>
          {renderUploadCard(
            "💳",
            "Application Fee Payment Proof",
            "applicationFeeProof"
          )}
          <div className="d-flex justify-content-between">
            <Button onClick={handlePrevious}>Previous</Button>{" "}
            <Button onClick={handleNext}>Next</Button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h4>📅 Interview & Offer Process</h4>
          {renderUploadCard(
            "📅",
            "Interview Confirmation",
            "interviewConfirmation"
          )}
          <Form.Group className="mt-3">
            <Form.Label>Interview Outcome</Form.Label>
            <Form.Control
              as="select"
              name="interviewOutcome"
              value={formData.interviewOutcome}
              onChange={handleChange}
            >
              <option>Select</option>
              <option>Accepted</option>
              <option>Foundation</option>
              <option>Rejected</option>
            </Form.Control>
          </Form.Group>
          {renderUploadCard(
            "📄",
            "Conditional Offer Letter",
            "conditionalOfferLetter"
          )}
          {renderUploadCard(
            "💳",
            "Tuition Fee Transfer Proof",
            "tuitionFeeProof"
          )}
          {renderUploadCard("📄", "Final Offer Letter", "finalOfferLetter")}
          <div className="d-flex justify-content-between">
            <Button onClick={handlePrevious}>Previous</Button>{" "}
            <Button onClick={handleNext}>Next</Button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h4>📑 Embassy Documents Submission</h4>
          {renderUploadCard(
            "📄",
            "Residence Permit Form + Appendix 14",
            "appendixForm"
          )}
          {renderUploadCard("🛂", "Passport Copy", "passportCopy")}
          {renderUploadCard(
            "📝",
            "Declaration of Financial Support",
            "financialSupportDeclaration"
          )}
          {renderUploadCard(
            "🧾",
            "Family Certificate (Proof of Relationship)",
            "familyCertificate"
          )}
          {renderUploadCard("🌐", "Proof of English Ability", "englishProof")}
          {renderUploadCard("💼", "Proof of Income", "incomeProof")}
          {renderUploadCard("✈️", "One-Way Airplane Ticket", "airplaneTicket")}
          {renderUploadCard(
            "🔍",
            "Police Clearance Certificate",
            "policeClearance"
          )}
          {renderUploadCard("📄", "Europass CV", "europassCV")}
          {renderUploadCard("📜", "Birth Certificate", "birthCertificate")}
          {renderUploadCard(
            "🏦",
            "Sponsor Bank Statement (6 Months)",
            "bankStatement"
          )}
          {renderUploadCard(
            "🏠",
            "Proof of Accommodation",
            "accommodationProof"
          )}
          {renderUploadCard("📝", "Motivation Letter", "motivationLetter")}
          {renderUploadCard(
            "🎓",
            "Academic Certificates (SSC, HSC, Bachelor)",
            "academicCertificates"
          )}
          {renderUploadCard("🩺", "Travel Insurance", "travelInsurance")}
          {renderUploadCard("📷", "European Passport Photo", "passportPhoto")}
          {renderUploadCard("🏥", "Health Insurance", "healthInsurance")}
          <div className="d-flex justify-content-between">
            <Button onClick={handlePrevious}>Previous</Button>{" "}
            <Button onClick={handleNext}>Next</Button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <h4>🎫 Visa Process & Post Approval</h4>
          {renderUploadCard(
            "💳",
            "Visa Service Fee Payment Proof",
            "visaServiceFeeProof"
          )}
          {renderUploadCard(
            "✈️",
            "Flight Booking Confirmation",
            "flightBookingConfirmation"
          )}
          {renderUploadCard(
            "💻",
            "Online Enrollment Proof",
            "onlineEnrollmentProof"
          )}
          {renderUploadCard(
            "📄",
            "Enrollment Confirmation",
            "enrollmentConfirmation"
          )}
          <div className="d-flex justify-content-between">
            <Button onClick={handlePrevious}>Previous</Button>{" "}
            <Button onClick={handleNext}>Next</Button>
          </div>
        </>
      )}

      {step === 6 && (
        <>
          <h4>✅ Final Review & Submit</h4>
          <p>
            Please review all uploaded files and information before submitting.
          </p>
          <div className="d-flex justify-content-between">
            <Button onClick={handlePrevious}>Previous</Button>{" "}
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default WekerleMultiStepForm;
