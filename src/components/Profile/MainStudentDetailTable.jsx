import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Tabs, Tab } from "react-bootstrap";
import api from "../../interceptors/axiosInterceptor";
import BASE_URL from "../../Config";
import { Link } from "react-router-dom";
import { FaAnglesRight } from "react-icons/fa6";
import { FaFileDownload } from 'react-icons/fa';
import axios from "axios";

const MainStudentDetailTable = () => {
  const [student, setStudent] = useState(null);
     const [documentsList, setDocumentsList] = useState([]);
const studentId = localStorage.getItem("student_id");
  useEffect(() => {
    const id = localStorage.getItem("student_id");
    api
      .get(`${BASE_URL}auth/getStudentById/${id}`)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Helper to show a label-value pair in two columns, only if value exists
  const InfoRow = ({ label, value }) =>
    value ? (
      <Row className="mb-2 align-items-center">
        <Col md={4} className="fw-bold">{label}</Col>
        <Col md={8}>{value}</Col>
      </Row>
    ) : null;

  // Helper for array sections (like applicant_info, etc.)
  const ArraySection = ({ data, fields }) =>
    data && data.length > 0
      ? data.map((item, idx) => (
          <Card key={idx} className="mb-3 border">
            <Card.Body>
              {fields.map(
                ({ label, key }) =>
                  item[key] && <InfoRow key={key} label={label} value={item[key]} />
              )}
            </Card.Body>
          </Card>
        ))
      : null;


      useEffect(() => {
  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}getDocuments/${studentId}`);
      
      // Ensure data is array
      if (Array.isArray(res.data)) {
        setDocumentsList(res.data);
      } else if (typeof res.data === "object") {
        setDocumentsList([res.data]); // Single object ko array me convert kare
      } else {
        setDocumentsList([]);
      }
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  };

  if (studentId) {
    fetchDocuments();
  }
}, [studentId]);

  const handleDownload = (url) => {
    if (!url) {
      alert("Document not available.");
      return;
    }
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "document");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  return (
    <Container className="mt-4">
      <Tabs defaultActiveKey="personal" className="mb-4">
        <Tab eventKey="personal" title="Personal Info">
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <InfoRow label="Full Name:" value={student?.full_name} />
                  <InfoRow label="Father Name:" value={student?.father_name} />
                  <InfoRow label="Mother Name:" value={student?.mother_name} />
                  <InfoRow label="Mobile:" value={student?.mobile_number} />
                  <InfoRow label="Email:" value={student?.email} />
                  <InfoRow label="Date of Birth:" value={student?.date_of_birth} />
                  <InfoRow label="Gender:" value={student?.gender} />
                  <InfoRow label="Category:" value={student?.category} />
                </Col>
                <Col md={6}>
                  <InfoRow label="Address:" value={student?.address} />
                  <InfoRow label="Identifying Name:" value={student?.identifying_name} />
                  <InfoRow label="Present Address:" value={student?.present_address} />
                  <InfoRow label="Tin No:" value={student?.tin_no} />
                  <InfoRow label="Marital Status:" value={student?.marital_status} />
                  <InfoRow label="Spouse’s Occupation:" value={student?.spouse_occupation} />
                  <InfoRow label="Spouse’s Monthly Income:" value={student?.spouse_monthly_income} />
                  <InfoRow label="Number of Children:" value={student?.number_of_children} />
                  <InfoRow label="Sponsor Name:" value={student?.sponsor_name} />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Applicant Info */}
          {student?.applicant_info && student.applicant_info.length > 0 && (
            <Card className="mb-4">
              <Card.Header as="h2" className="bg-light">
                Applicant Information
              </Card.Header>
              <Card.Body>
                <ArraySection
                  data={student.applicant_info}
                  fields={[
                    { label: "Institute Name & Address:", key: "institute_name" },
                    { label: "Degree:", key: "degree" },
                    { label: "Group/Department:", key: "group_department" },
                    { label: "Result:", key: "result" },
                    { label: "Duration:", key: "duration" },
                    { label: "Status:", key: "status" },
                  ]}
                />
              </Card.Body>
            </Card>
          )}

          {/* EPT Info */}
          {student?.english_proficiency_info && student.english_proficiency_info.length > 0 && (
            <Card className="mb-4">
              <Card.Header as="h2" className="bg-light">
                English Proficiency Test (EPT) Score
              </Card.Header>
              <Card.Body>
                <ArraySection
                  data={student.english_proficiency_info}
                  fields={[
                    { label: "EPT Name:", key: "ept_name" },
                    { label: "Expiry Date:", key: "expiry_date" },
                    { label: "Overall Score:", key: "overall_score" },
                    { label: "Listening:", key: "listening" },
                    { label: "Reading:", key: "reading" },
                    { label: "Speaking:", key: "speaking" },
                    { label: "Writing:", key: "writing" },
                  ]}
                />
              </Card.Body>
            </Card>
          )}

          {/* Job/Professional Info */}
          {student?.job_professional_info && student.job_professional_info.length > 0 && (
            <Card className="mb-4">
              <Card.Header as="h2" className="bg-light">
                Applicant’s Job/Professional Details
              </Card.Header>
              <Card.Body>
                <ArraySection
                  data={student.job_professional_info}
                  fields={[
                    { label: "Company & Designation:", key: "company_designation" },
                    { label: "Monthly Income:", key: "monthly_income" },
                    { label: "Payment Method:", key: "payment_method" },
                    { label: "Bank Name & Account Type:", key: "bank_account_type" },
                    { label: "Employment Duration:", key: "employment_duration" },
                  ]}
                />
              </Card.Body>
            </Card>
          )}

          {/* Travel & Passport Details */}
          {(student?.refused_countries ||
            student?.travel_history ||
            student?.passport_1_no ||
            student?.passport_2_no ||
            student?.passport_3_no) && (
            <Card className="mb-4">
              <Card.Header as="h2" className="bg-light">
                Travel & Passport Details
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <InfoRow label="Previously Refused Countries:" value={student?.refused_countries} />
                    <InfoRow label="Travel History:" value={student?.travel_history} />
                    <InfoRow label="Current Passport No.:" value={student?.passport_1_no} />
                    <InfoRow label="Passport 1 Expiry:" value={student?.passport_1_expiry} />
                  </Col>
                  <Col md={6}>
                    <InfoRow label="Passport 2 No.:" value={student?.passport_2_no} />
                    <InfoRow label="Passport 2 Expiry:" value={student?.passport_2_expiry} />
                    <InfoRow label="Passport 3 No.:" value={student?.passport_3_no} />
                    <InfoRow label="Passport 3 Expiry:" value={student?.passport_3_expiry} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          {/* Business Details */}
          {(student?.business_name_license ||
            student?.business_monthly_income ||
            student?.personal_savings ||
            student?.business_income_details ||
            student?.tax_returns_tin) && (
            <Card className="mb-4">
              <Card.Header as="h2" className="bg-light">
                Business Details (If Any)
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <InfoRow label="Business Name & License Nos:" value={student?.business_name_license} />
                    <InfoRow label="Monthly Income & Current Balance:" value={student?.business_monthly_income} />
                    <InfoRow label="Personal Savings:" value={student?.personal_savings} />
                  </Col>
                  <Col md={6}>
                    <InfoRow label="Business Income Bank Name & Type:" value={student?.business_income_details} />
                    <InfoRow label="Tax Returns (3 years) & TIN Certificate:" value={student?.tax_returns_tin} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          {/* Sponsor's Information */}
          {(student?.sponsor_email ||
            student?.sponsor_relationship ||
            student?.sponsor_occupation ||
            student?.sponsor_job_position_company ||
            student?.sponsor_employment_duration ||
            student?.sponsor_status ||
            student?.sponsor_bin ||
            student?.sponsor_tax_docs ||
            student?.sponsor_address ||
            student?.sponsor_phone) && (
            <Card className="mb-4">
              <Card.Header as="h2" className="bg-light">
                Sponsor’s Information
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <InfoRow label="Sponsor Name:" value={student?.sponsor_name} />
                    <InfoRow label="Email:" value={student?.sponsor_email} />
                    <InfoRow label="Relationship:" value={student?.sponsor_relationship} />
                    <InfoRow label="Occupation:" value={student?.sponsor_occupation} />
                    <InfoRow label="Job Position, Company:" value={student?.sponsor_job_position_company} />
                  </Col>
                  <Col md={6}>
                    <InfoRow label="Employment Duration:" value={student?.sponsor_employment_duration} />
                    <InfoRow label="Status:" value={student?.sponsor_status} />
                    <InfoRow label="Business TIN/BIN:" value={student?.sponsor_bin} />
                    <InfoRow label="Tax Documents Available:" value={student?.sponsor_tax_docs ? "Yes" : "No"} />
                    <InfoRow label="Present Address:" value={student?.sponsor_address} />
                    <InfoRow label="Phone:" value={student?.sponsor_phone} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          {/* Sponsor's Business Details */}
          {(student?.sponsor_business_name_type ||
            student?.sponsor_income_monthly ||
            student?.sponsor_income_yearly ||
            student?.sponsor_license_no ||
            student?.sponsor_income_mode ||
            student?.sponsor_bank_details) && (
            <Card className="mb-4">
              <Card.Header as="h2" className="bg-light">
                Sponsor’s Business Details
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <InfoRow label="Business Name & Type:" value={student?.sponsor_business_name_type} />
                    <InfoRow label="Income (Monthly):" value={student?.sponsor_income_monthly} />
                    <InfoRow label="Income (Yearly):" value={student?.sponsor_income_yearly} />
                  </Col>
                  <Col md={6}>
                    <InfoRow label="License No.:" value={student?.sponsor_license_no} />
                    <InfoRow label="Income Received via:" value={student?.sponsor_income_mode} />
                    <InfoRow label="Bank Details:" value={student?.sponsor_bank_details} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          {/* Information for Cover Letter */}
          {(student?.visa_refusal_explanation ||
            student?.name_age_mismatch ||
            student?.study_gap_explanation ||
            student?.deportation_details) && (
            <Card className="mb-4">
              <Card.Header as="h2" className="bg-light">
                Information for Cover Letter
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <InfoRow label="Visa Refusal Explanation:" value={student?.visa_refusal_explanation} />
                    <InfoRow label="Any Name/Age Mismatches:" value={student?.name_age_mismatch} />
                  </Col>
                  <Col md={6}>
                    <InfoRow label="Study Gap Explanation:" value={student?.study_gap_explanation} />
                    <InfoRow label="Deportation Details:" value={student?.deportation_details} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          {/* If no data at all */}
          {!student && (
            <Card className="mb-4">
              <Card.Body>
                <p className="text-center text-muted">No student data available.</p>
              </Card.Body>
            </Card>
          )}
        </Tab>
      <Tab eventKey="Document" title="Student Document">
        <div>
          <div className="table-responsive mt-4">
      <table className="table table-bordered inquiry-table text-nowrap text-center align-middle">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Passport</th>
            <th>Birth Certificate</th>
            <th>Income</th>
            <th>Study Certificates</th>
            <th>Bank Statement</th>
          </tr>
        </thead>
       <tbody>
  {documentsList.map((doc, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td onClick={() => handleDownload(doc.passport_copy_prepared)} style={{ cursor: "pointer" }}>
        <FaFileDownload />
      </td>
      <td onClick={() => handleDownload(doc.birth_certificate)} style={{ cursor: "pointer" }}>
        <FaFileDownload />
      </td>
      <td onClick={() => handleDownload(doc.proof_of_income)} style={{ cursor: "pointer" }}>
        <FaFileDownload />
      </td>
      <td onClick={() => handleDownload(doc.previous_studies_certificates)} style={{ cursor: "pointer" }}>
        <FaFileDownload />
      </td>
      <td onClick={() => handleDownload(doc.bank_statement)} style={{ cursor: "pointer" }}>
        <FaFileDownload />
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
        </div>
      </Tab>
      </Tabs>
        
      
      <div className="text-center">
        <Link className="btn btn-primary" to="/myapplication">
          More Details <FaAnglesRight className="ms-2" />
        </Link>
      </div>
    </Container>
  );
};

export default MainStudentDetailTable;