import { useState } from "react";
import { Form, Button, Col, Row, ProgressBar, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BmuUniversity.css"; // Same CSS as BMU

const initialData = {
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: "",
  passportNumber: "",
  sscCertificate: null,
  hscCertificate: null,
  bachelorsCertificate: null,
  englishProof: null,
  passportCopy: null,
  birthCertificate: null,
  europassCV: null,
  policeClearance: null,
  financialSupport: null,
  familyCertificate: null,
  incomeProof: null,
  motivationLetter: null,
  residencePermitForm: null,
  offerLetter: null,
  bankStatement: null,
  accommodationProof: null,
  airplaneTicket: null,
  travelInsurance: null,
  healthInsurance: null,
  invoiceProof: null,
  tuitionProof: null,
  visaServiceProof: null,
  flightConfirmation: null,
  appendix14: null,
};

const DebrecenMultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);
  const handleSubmit = () => console.log("Debrecen Form Submitted:", formData);

  const progress = (step / 8) * 100; // We can increase this if you want more steps

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
      <h2 className="form-title">University of Debrecen - Application Form</h2>
      <ProgressBar now={progress} className="mb-4 step-progress-bar " />

      {step === 1 && (
        <>
          <h4>👤 Personal Information</h4>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Passport Number</Form.Label>
                <Form.Control
                  type="text"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3 d-flex justify-content-end">
            <Button onClick={handleNext}>Next</Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h4>🎓 Educational Background</h4>
          {renderUploadCard("📄", "SSC Certificate", "sscCertificate")}
          {renderUploadCard("📄", "HSC Certificate", "hscCertificate")}
          {renderUploadCard(
            "📄",
            "Bachelor’s Certificate",
            "bachelorsCertificate"
          )}
          <div className="d-flex justify-content-between mt-3">
            <Button onClick={handlePrevious}>Previous</Button>{" "}
            <Button onClick={handleNext}>Next</Button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h4>📖 Language Proficiency</h4>
          {renderUploadCard(
            "🌐",
            "Proof of English Proficiency",
            "englishProof"
          )}
          <div className="d-flex justify-content-between mt-3">
            <Button onClick={handlePrevious}>Previous</Button>{" "}
            <Button onClick={handleNext}>Next</Button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h4>📄 Document Uploads</h4>
          {renderUploadCard("🛂", "Passport Copy", "passportCopy")}
          {renderUploadCard(
            "📜",
            "Birth Certificate (Attested)",
            "birthCertificate"
          )}
          {renderUploadCard("📄", "Europass CV", "europassCV")}
          {renderUploadCard(
            "🔍",
            "Police Clearance Certificate",
            "policeClearance"
          )}
          {renderUploadCard(
            "📝",
            "Declaration of Financial Support (Affidavit)",
            "financialSupport"
          )}
          {renderUploadCard(
            "🧾",
            "Family Certificate (Proof of Relationship)",
            "familyCertificate"
          )}
          {renderUploadCard(
            "💼",
            "Proof of Income (TIN, Tax, Trade)",
            "incomeProof"
          )}
          <div className="d-flex justify-content-between mt-3">
            <Button onClick={handlePrevious}>Previous</Button>{" "}
            <Button onClick={handleNext}>Next</Button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <h4>📑 Admission & Visa Documents</h4>
          {renderUploadCard("📝", "Motivation Letter", "motivationLetter")}
          {renderUploadCard(
            "📄",
            "Offer Letter (Conditional/Final)",
            "offerLetter"
          )}
          {renderUploadCard(
            "📄",
            "Residence Permit Form + Appendix 14",
            "residencePermitForm"
          )}
          {renderUploadCard(
            "🏦",
            "Bank Statement (Last 6 Months)",
            "bankStatement"
          )}
          {renderUploadCard(
            "🏠",
            "Proof of Accommodation",
            "accommodationProof"
          )}
          {renderUploadCard("✈️", "Flight Ticket Booking", "airplaneTicket")}
          {renderUploadCard("🏥", "Travel Insurance", "travelInsurance")}
          {renderUploadCard("🏥", "Health Insurance", "healthInsurance")}
          <div className="d-flex justify-content-between mt-3">
            <Button onClick={handlePrevious}>Previous</Button>{" "}
            <Button onClick={handleNext}>Next</Button>
          </div>
        </>
      )}

      {step === 6 && (
        <>
          <h4>💰 Financial Documents</h4>
          {renderUploadCard("💰", "Invoice Payment Proof", "invoiceProof")}
          {renderUploadCard("💰", "Tuition Fee Payment Proof", "tuitionProof")}
          {renderUploadCard(
            "💰",
            "Visa Service Fee Payment Proof",
            "visaServiceProof"
          )}
          {renderUploadCard(
            "✈️",
            "Flight Booking Confirmation",
            "flightConfirmation"
          )}
           <div className="d-flex justify-content-between mt-3">
            <Button onClick={handlePrevious}>Previous</Button>{" "}
            <Button onClick={handleNext}>Next</Button>
          </div>
        </>
      )}

      {step === 7 && (
        <>
          <h4>📑 Additional Appendix Form</h4>
          {renderUploadCard("📄", "Appendix 14 Form", "appendix14")}
         <div className="d-flex justify-content-between mt-3">
            <Button onClick={handlePrevious}>Previous</Button>{" "}
            <Button onClick={handleNext}>Next</Button>
          </div>
        </>
      )}

      {step === 8 && (
        <>
          <h4>✅ Review & Submit</h4>
          <p>
            Please review all information and uploaded documents before
            submitting.
          </p>
          <Button onClick={handlePrevious}>Previous</Button>{" "}
          <Button onClick={handleSubmit}>Submit Application</Button>
        </>
      )}
    </div>
  );
};

export default DebrecenMultiStepForm;
