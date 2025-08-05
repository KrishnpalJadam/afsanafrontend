import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form ,
  Modal,
} from "react-bootstrap";
import api from "../../interceptors/axiosInterceptor";
import BASE_URL from "../../Config";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaAnglesRight } from "react-icons/fa6";

import axios from "axios";
import ProcessorStudentForm from "./ProcessorStudentDetails";

const initialApplicant = {
  institute_name: "",
  degree: "",
  group_department: "",
  result: "",
  duration: "",
  status: "",
};

const initialEPT = {
  ept_name: "",
  expiry_date: "",
  overall_score: "",
  listening: "",
  reading: "",
  speaking: "",
  writing: "",
};

const initialJob = {
  company_designation: "",
  monthly_income: "",
  payment_method: "",
  bank_account_type: "",
  employment_duration: "",
};

const ProcessorProfile = () => {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [form, setForm] = useState({});
  const [applicants, setApplicants] = useState([initialApplicant]);
  const [epts, setEPTs] = useState([initialEPT]);
  const [jobs, setJobs] = useState([initialJob]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

const [formData, setFormData] = useState({
  passport_copy_prepared: null,
  previous_studies_certificates: null,
  proof_of_income: null,
  birth_certificate: null,
  bank_statement: null,
});


  const navigate = useNavigate();

    

  useEffect(() => {
    api
      .get(`${BASE_URL}auth/getStudentById/${id}`)
      .then((response) => {
        setStudent(response.data);
        setForm({
          ...response.data,
        });
        setApplicants(response.data.applicant_info || [initialApplicant]);
        setEPTs(response.data.english_proficiency_info || [initialEPT]);
        setJobs(response.data.job_professional_info || [initialJob]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Handle input change for single fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle array fields
  const handleArrayChange = (setter, arr, idx, field, value) => {
    const updated = arr.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setter(updated);
  };

  // Add more for array fields
  const handleAddMore = (setter, arr, initial) => {
    setter([...arr, { ...initial }]);
  };

  // Remove item for array fields
  const handleRemove = (setter, arr, idx) => {
    if (arr.length === 1) return;
    const updated = arr.filter((_, i) => i !== idx);
    setter(updated);
  };

  // Save/Update Profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const id = localStorage.getItem("student_id");
    const {email,...restForm} = form; // Exclude email from the payload
    const payload = {
      ...restForm,
      academic_info: applicants,
      english_proficiency: epts,
      job_professional: jobs,
    };
    try {
      await api.put(`${BASE_URL}auth/students/${id}`, payload);
      alert("Profile updated successfully!");
      setShowProfileModal(false);
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  // Open modal
  const handleOpenProfileModal = () => {
    setShowProfileModal(true);
  };
  // Close modal
  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };
 const handleFileChange = (e) => {
  const { name, files } = e.target;

  setFormData((prevData) => ({
    ...prevData,
    [name]: files[0],
  }));
}




const handleUpload = async () => {
  

  const id = localStorage.getItem("student_id");
  if (!id) {
    alert("Student ID not found");
    return;
  }

  const data = new FormData();
  data.append("passport_copy_prepared", formData.passport_copy_prepared);
  data.append("previous_studies_certificates", formData.previous_studies_certificates);
  data.append("proof_of_income", formData.proof_of_income);
  data.append("birth_certificate", formData.birth_certificate);
  data.append("bank_statement", formData.bank_statement);

  try {
    const res = await axios.post(`${BASE_URL}postDocuments/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Upload Success:", res.data);
    alert("Documents uploaded successfully!");
    setShowModal(false);
  } catch (err) {
    console.error("Upload Failed:", err.response || err);
    alert("Document upload failed");
  }
};

  return (
    <Container className="mt-4">
      <Card className="shadow mb-4">
        <Card.Body>
          <Row>
            <Col md={12} className="text-center mt-3">
              <h3>{student?.full_name}</h3>
              <p>Email: {student?.email}</p>
              <p>Phone: {student?.mobile_number}</p>
              <div className="d-flex gap-2 justify-content-center">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleOpenProfileModal}
              >
                Student Profile
              </Button>
             <Button variant="outline-primary" size="sm" onClick={() => setShowModal(true)}>
  Document Upload
</Button>
</div>
            </Col>
          </Row>
        </Card.Body>
        <ProcessorStudentForm/>
      </Card>
<Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Upload Student Documents</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Passport</Form.Label>
        <Form.Control type="file" name="passport_copy_prepared" onChange={handleFileChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Certificates</Form.Label>
        <Form.Control type="file" name="previous_studies_certificates" onChange={handleFileChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Income</Form.Label>
        <Form.Control type="file" name="proof_of_income" onChange={handleFileChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Birth Certificate</Form.Label>
        <Form.Control type="file" name="birth_certificate" onChange={handleFileChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Bank Statement</Form.Label>
        <Form.Control type="file" name="bank_statement" onChange={handleFileChange} />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleUpload}>
      Upload
    </Button>
  </Modal.Footer>
</Modal>

  
      <Modal show={showProfileModal} onHide={handleCloseProfileModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container py-4">
            <form onSubmit={handleSubmit}>
              {/* Student Basic Information */}
              <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                  <h2 className="h4 mb-0">Student Basic Information</h2>
                </div>
                <div className="card-body">
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Full Name</label>
                      <input
                        type="text"
                        name="full_name"
                        className="form-control form-control-sm"
                        value={form.full_name || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Father Name</label>
                      <input
                        type="text"
                        name="father_name"
                        className="form-control form-control-sm"
                        value={form.father_name || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Mother Name</label>
                      <input
                        type="text"
                        name="mother_name"
                        className="form-control form-control-sm"
                        value={form.mother_name || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Mobile</label>
                      <input
                        type="text"
                        name="mobile_number"
                        className="form-control form-control-sm"
                        value={form.mobile_number || ""}
                        onChange={handleChange}
                      />
                    </div>
                   
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Date of Birth</label>
                      <input
                        type="date"
                        name="date_of_birth"
                        className="form-control form-control-sm"
                        value={form.date_of_birth || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Gender</label>
                      <select
                        name="gender"
                        className="form-select"
                        value={form.gender || ""}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Category</label>
                      <input
                        type="text"
                        name="category"
                        className="form-control form-control-sm"
                        value={form.category || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Tin No</label>
                      <input
                        type="text"
                        name="tin_no"
                        className="form-control form-control-sm"
                        value={form.tin_no || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Permanent Address</label>
                      <textarea
                        name="address"
                        className="form-control form-control-sm"
                        rows="1"
                        value={form.address || ""}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Identifying Name</label>
                      <input
                        type="text"
                        name="identifying_name"
                        className="form-control form-control-sm"
                        value={form.identifying_name || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Present Address</label>
                      <input
                        type="text"
                        name="present_address"
                        className="form-control"
                        value={form.present_address || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Marital Status</label>
                      <select
                        name="marital_status"
                        className="form-select"
                        value={form.marital_status || ""}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option>Single</option>
                        <option>Married</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Spouse’s Occupation</label>
                      <input
                        type="text"
                        name="spouse_occupation"
                        className="form-control form-control-sm"
                        value={form.spouse_occupation || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Spouse’s Monthly Income</label>
                      <input
                        type="number"
                        name="spouse_monthly_income"
                        className="form-control form-control-sm"
                        value={form.spouse_monthly_income || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Number of Children</label>
                      <input
                        type="number"
                        name="number_of_children"
                        className="form-control form-control-sm"
                        value={form.number_of_children || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Who Will Be Your Sponsor</label>
                      <input
                        type="text"
                        name="sponsor_name"
                        className="form-control form-control-sm"
                        value={form.sponsor_name || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Applicant Information (Add More) */}
              <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                  <h2 className="h4 mb-0">Applicant Information</h2>
                </div>
                <div className="card-body">
                  {applicants.map((item, idx) => (
                    <div key={idx} className="border rounded p-2 mb-2">
                      <div className="row g-3 mb-2">
                        <div className="col-md-4">
                          <label>Institute Name & Address</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.institute_name}
                            onChange={(e) =>
                              handleArrayChange(setApplicants, applicants, idx, "institute_name", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-4">
                          <label>Degree</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.degree}
                            onChange={(e) =>
                              handleArrayChange(setApplicants, applicants, idx, "degree", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-4">
                          <label>Group/Department</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.group_department}
                            onChange={(e) =>
                              handleArrayChange(setApplicants, applicants, idx, "group_department", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="row g-3 mb-2">
                        <div className="col-md-4">
                          <label>Result</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.result}
                            onChange={(e) =>
                              handleArrayChange(setApplicants, applicants, idx, "result", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-4">
                          <label>Duration (Start – End)</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.duration}
                            onChange={(e) =>
                              handleArrayChange(setApplicants, applicants, idx, "duration", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-4">
                          <label>Status</label>
                          <select
                            className="form-select"
                            value={item.status}
                            onChange={(e) =>
                              handleArrayChange(setApplicants, applicants, idx, "status", e.target.value)}>
                            <option value="">Select</option>
                            <option value="Pass">Pass</option>
                            <option value="Fail">Fail</option>
                            <option value="Retake">Retake</option>
                            <option value="Withdraw">Withdraw</option>
                          </select>
                        </div>
                      </div>
                      {applicants.length > 1 && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemove(setApplicants, applicants, idx)}>
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <div className="text-center">
                    <Button
                      type="button"
                      onClick={() => handleAddMore(setApplicants, applicants, initialApplicant)}
                    >
                      Add More
                    </Button>
                  </div>
                </div>
              </div>

              {/* English Proficiency Test (Add More) */}
              <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                  <h2 className="h4 mb-0">ENGLISH PROFICIENCY TEST (EPT) SCORE</h2>
                </div>
                <div className="card-body">
                  {epts.map((item, idx) => (
                    <div key={idx} className="border rounded p-2 mb-2">
                      <div className="row g-3 mb-2">
                        <div className="col-md-4">
                          <label>EPT Name</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.ept_name}
                            onChange={(e) =>
                              handleArrayChange(setEPTs, epts, idx, "ept_name", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-4">
                          <label>Expiry Date</label>
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            value={item.expiry_date}
                            onChange={(e) =>
                              handleArrayChange(setEPTs, epts, idx, "expiry_date", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-4">
                          <label>Overall Score</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.overall_score}
                            onChange={(e) =>
                              handleArrayChange(setEPTs, epts, idx, "overall_score", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="row g-3 mb-2">
                        <div className="col-md-3">
                          <label>Listening</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.listening}
                            onChange={(e) =>
                              handleArrayChange(setEPTs, epts, idx, "listening", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <label>Reading</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.reading}
                            onChange={(e) =>
                              handleArrayChange(setEPTs, epts, idx, "reading", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <label>Speaking</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.speaking}
                            onChange={(e) =>
                              handleArrayChange(setEPTs, epts, idx, "speaking", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <label>Writing</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.writing}
                            onChange={(e) =>
                              handleArrayChange(setEPTs, epts, idx, "writing", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      {epts.length > 1 && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemove(setEPTs, epts, idx)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <div className="text-center">
                    <Button
                      type="button"
                      onClick={() => handleAddMore(setEPTs, epts, initialEPT)}
                    >
                      Add More
                    </Button>
                  </div>
                </div>
              </div>

              {/* Job/Professional Details (Add More) */}
              <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                  <h2 className="h4 mb-0">APPLICANT’S JOB/PROFESSIONAL DETAILS</h2>
                </div>
                <div className="card-body">
                  {jobs.map((item, idx) => (
                    <div key={idx} className="border rounded p-2 mb-2">
                      <div className="row g-3 mb-2">
                        <div className="col-md-4">
                          <label>Company & Designation</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.company_designation}
                            onChange={(e) =>
                              handleArrayChange(setJobs, jobs, idx, "company_designation", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-4">
                          <label>Monthly Income</label>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            value={item.monthly_income}
                            onChange={(e) =>
                              handleArrayChange(setJobs, jobs, idx, "monthly_income", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-4">
                          <label>Payment Method</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.payment_method}
                            onChange={(e) =>
                              handleArrayChange(setJobs, jobs, idx, "payment_method", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="row g-3 mb-2">
                        <div className="col-md-6">
                          <label>Bank Name & Account Type</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.bank_account_type}
                            onChange={(e) =>
                              handleArrayChange(setJobs, jobs, idx, "bank_account_type", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <label>Employment Duration</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.employment_duration}
                            onChange={(e) =>
                              handleArrayChange(setJobs, jobs, idx, "employment_duration", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      {jobs.length > 1 && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemove(setJobs, jobs, idx)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <div className="text-center">
                    <Button
                      type="button"
                      onClick={() => handleAddMore(setJobs, jobs, initialJob)}
                    >
                      Add More
                    </Button>
                  </div>
                </div>
              </div>

              {/* Travel & Passport Details */}
              <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                  <h2 className="h4 mb-0">TRAVEL & PASSPORT DETAILS</h2>
                </div>
                <div className="card-body">
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label>Previously Refused Countries</label>
                      <input
                        type="text"
                        name="refused_countries"
                        className="form-control form-control-sm"
                        value={form.refused_countries || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Travel History (Country Name, Year)</label>
                      <input
                        type="text"
                        name="travel_history"
                        className="form-control form-control-sm"
                        value={form.travel_history || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Current Passport No.</label>
                      <input
                        type="text"
                        name="passport_1_no"
                        className="form-control form-control-sm"
                        value={form.passport_1_no || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label>Passport 1 Expiry</label>
                      <input
                        type="date"
                        name="passport_1_expiry"
                        className="form-control form-control-sm"
                        value={form.passport_1_expiry || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Passport 2 No.</label>
                      <input
                        type="text"
                        name="passport_2_no"
                        className="form-control form-control-sm"
                        value={form.passport_2_no || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label>Passport 2 Expiry</label>
                      <input
                        type="date"
                        name="passport_2_expiry"
                        className="form-control form-control-sm"
                        value={form.passport_2_expiry || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Passport 3 No.</label>
                      <input
                        type="text"
                        name="passport_3_no"
                        className="form-control form-control-sm"
                        value={form.passport_3_no || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label>Passport 3 Expiry</label>
                      <input
                        type="date"
                        name="passport_3_expiry"
                        className="form-control form-control-sm"
                        value={form.passport_3_expiry || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                  <h2 className="h4 mb-0">BUSINESS DETAILS (IF ANY)</h2>
                </div>
                <div className="card-body">
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label>Business Name & License Nos</label>
                      <input
                        type="text"
                        name="business_name_license"
                        className="form-control form-control-sm"
                        value={form.business_name_license || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Monthly Income & Current Balance</label>
                      <input
                        type="number"
                        name="business_monthly_income"
                        className="form-control form-control-sm"
                        value={form.business_monthly_income || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Personal Savings (Bank, Type, Branch, Amount)</label>
                      <input
                        type="text"
                        name="personal_savings"
                        className="form-control form-control-sm"
                        value={form.personal_savings || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label>Business Income Bank Name & Type</label>
                      <input
                        type="text"
                        name="business_income_details"
                        className="form-control form-control-sm"
                        value={form.business_income_details || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Tax Returns (3 years) & TIN Certificate</label>
                      <input
                        type="text"
                        name="tax_returns_tin"
                        className="form-control form-control-sm"
                        value={form.tax_returns_tin || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sponsor's Information */}
              <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                  <h2 className="h4 mb-0">SPONSOR’S INFORMATION</h2>
                </div>
                <div className="card-body">
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label>Name</label>
                      <input
                        type="text"
                        name="sponsor_name"
                        className="form-control form-control-sm"
                        value={form.sponsor_name || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Email</label>
                      <input
                        type="email"
                        name="sponsor_email"
                        className="form-control form-control-sm"
                        value={form.sponsor_email || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Relationship</label>
                      <input
                        type="text"
                        name="sponsor_relationship"
                        className="form-control form-control-sm"
                        value={form.sponsor_relationship || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label>Occupation</label>
                      <input
                        type="text"
                        name="sponsor_occupation"
                        className="form-control form-control-sm"
                        value={form.sponsor_occupation || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Job Position, Company</label>
                      <input
                        type="text"
                        name="sponsor_job_position_company"
                        className="form-control form-control-sm"
                        value={form.sponsor_job_position_company || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Employment Duration</label>
                      <input
                        type="text"
                        name="sponsor_employment_duration"
                        className="form-control form-control-sm"
                        value={form.sponsor_employment_duration || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label>Status</label>
                      <input
                        type="text"
                        name="sponsor_status"
                        className="form-control form-control-sm"
                        value={form.sponsor_status || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Business TIN/BIN (if any)</label>
                      <input
                        type="text"
                        name="sponsor_bin"
                        className="form-control form-control-sm"
                        value={form.sponsor_bin || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Tax Documents Available</label>
                      <select
                        name="sponsor_tax_docs"
                        className="form-select"
                        value={form.sponsor_tax_docs ? "true" : "false"}
                        onChange={handleChange}
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </div>
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label>Present Address</label>
                      <input
                        type="text"
                        name="sponsor_address"
                        className="form-control form-control-sm"
                        value={form.sponsor_address || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Phone</label>
                      <input
                        type="text"
                        name="sponsor_phone"
                        className="form-control form-control-sm"
                        value={form.sponsor_phone || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sponsor's Business Details */}
              <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                  <h2 className="h4 mb-0">SPONSOR’S BUSINESS DETAILS</h2>
                </div>
                <div className="card-body">
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label>Business Name & Type</label>
                      <input
                        type="text"
                        name="sponsor_business_name_type"
                        className="form-control form-control-sm"
                        value={form.sponsor_business_name_type || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Income (Monthly & Yearly)</label>
                      <input
                        type="number"
                        name="sponsor_income_monthly"
                        className="form-control form-control-sm"
                        value={form.sponsor_income_monthly || ""}
                        onChange={handleChange}
                        placeholder="Monthly"
                      />
                      <input
                        type="number"
                        name="sponsor_income_yearly"
                        className="form-control form-control-sm mt-1"
                        value={form.sponsor_income_yearly || ""}
                        onChange={handleChange}
                        placeholder="Yearly"
                      />
                    </div>
                    <div className="col-md-4">
                      <label>License No.</label>
                      <input
                        type="text"
                        name="sponsor_license_no"
                        className="form-control form-control-sm"
                        value={form.sponsor_license_no || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label>Income Received via (Cash/Bank)</label>
                      <input
                        type="text"
                        name="sponsor_income_mode"
                        className="form-control form-control-sm"
                        value={form.sponsor_income_mode || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Bank Details (if bank)</label>
                      <input
                        type="text"
                        name="sponsor_bank_details"
                        className="form-control form-control-sm"
                        value={form.sponsor_bank_details || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Information for Cover Letter */}
              <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                  <h2 className="h4 mb-0">INFORMATION FOR COVER LETTER</h2>
                </div>
                <div className="card-body">
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label>Visa Refusal Explanation</label>
                      <input
                        type="text"
                        name="visa_refusal_explanation"
                        className="form-control form-control-sm"
                        value={form.visa_refusal_explanation || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Any Name/Age Mismatches (Self or Parents)</label>
                      <input
                        type="text"
                        name="name_age_mismatch"
                        className="form-control form-control-sm"
                        value={form.name_age_mismatch || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label>Study Gap Explanation</label>
                      <input
                        type="text"
                        name="study_gap_explanation"
                        className="form-control form-control-sm"
                        value={form.study_gap_explanation || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Deportation Details (if any)</label>
                      <input
                        type="text"
                        name="deportation_details"
                        className="form-control form-control-sm"
                        value={form.deportation_details || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProfileModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProcessorProfile;