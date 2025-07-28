import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import api from "../../interceptors/axiosInterceptor";
import BASE_URL from "../../Config";
import Swal from "sweetalert2";

const Visaprocesing = () => {
  const [activeStep, setActiveStep] = useState("application");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [recordId, setRecordId] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [selectedUniversityId, setSelectedUniversityId] = useState(null);

  const steps = [
    { key: "application", label: "Application", icon: "bi-person" },
    { key: "interview", label: "Documents", icon: "bi-file-earmark" },
    { key: "visa", label: "Embassy Docs", icon: "bi-building" },
    { key: "fee", label: "Fee Payment", icon: "bi-credit-card" },
    { key: "zoom", label: "Interview", icon: "bi-camera-video" },
    { key: "conditionalOffer", label: "Offer Letter", icon: "bi-file-text" },
    { key: "tuitionFee", label: "Tuition Fee", icon: "bi-cash-stack" },
    { key: "mainofferletter", label: "Final Offer", icon: "bi-file-check" },
    { key: "embassydocument", label: "Embassy Docs", icon: "bi-folder" },
    { key: "embassyappoint", label: "Appointment", icon: "bi-calendar" },
    { key: "embassyinterview", label: "Interview", icon: "bi-mic" },
    { key: "visaStatus", label: "Visa Status", icon: "bi-passport" },
  ];

  // Load student data and check existing visa process record
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const studentId = localStorage.getItem("student_id");

        // Get student basic info
        const studentResponse = await api.get(
          `${BASE_URL}auth/getStudentById/${studentId}`
        );
          Swal.fire({
                title: "Processing...",
                html: "Please wait while we submit your data.",
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading();
        
                  // Simulate API call (replace with your actual API call)
                  setTimeout(() => {
                    // This is where your API success would be
                    Swal.fire({
                      title: "Success!",
                      text: "Data submitted successfully!",
                      icon: "success",
                      confirmButtonText: "OK",
                    });
                  },true); // Remove this timeout and replace with your API call
                },
              });
        const studentData = studentResponse.data;

        // Check if visa process record exists
        try {
          const visaProcessResponse = await api.get(
            `${BASE_URL}getVisaProcessByStudentId/VisaProcess/${studentId}`
          );
            Swal.fire({
                  title: "Processing...",
                  html: "Please wait while we submit your data.",
                  allowOutsideClick: false,
                  didOpen: () => {
                    Swal.showLoading();
          
                    // Simulate API call (replace with your actual API call)
                    setTimeout(() => {
                      // This is where your API success would be
                      Swal.fire({
                        title: "Success!",
                        text: "Data submitted successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                      });
                    }, 2000); // Remove this timeout and replace with your API call
                  },
                });
          // const visaProcessResponse = await api.get(`${BASE_URL}api/getVisaProcessByStudent/${studentId}`);
          const visaData = visaProcessResponse.data;
          console.log(visaData);

          if (visaData) {
            setRecordId(visaData.id);
            setFormData(visaData);

            // Determine completed steps
            const completed = [];
            if (visaData.full_name) completed.push("application");
            if (visaData.passport_doc) completed.push("interview");
            if (visaData.university_name) completed.push("visa");
            if (visaData.fee_amount) completed.push("fee");
            if (visaData.interview_date) completed.push("zoom");
            if (visaData.conditional_offer_upload)
              completed.push("conditionalOffer");
            if (visaData.tuition_fee_amount) completed.push("tuitionFee");
            if (visaData.main_offer_upload) completed.push("mainofferletter");
            if (visaData.motivation_letter) completed.push("embassydocument");
            if (visaData.appointment_location) completed.push("embassyappoint");
            if (visaData.embassy_result) completed.push("embassyinterview");
            if (visaData.visa_status) completed.push("visaStatus");

            setCompletedSteps(completed);
          }
        } catch (e) {
          console.log("No existing visa process record found");
        }

        // Set initial form data
        setFormData((prev) => ({
          ...prev,
          full_name: studentData.full_name || "",
          email: studentData.email || "",
          phone: studentData.mobile_number || "",
          date_of_birth: studentData.date_of_birth
            ? studentData.date_of_birth.split("T")[0]
            : "",
          passport_no: studentData.id_no || "",
        }));
      } catch (err) {
        console.error("Failed to load initial data:", err);
        setError("Failed to load initial data");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const studentId = localStorage.getItem("student_id");

    try {
      const formDataToSend = new FormData();

      // Prepare the data object with proper formatting
      const submissionData = {
        ...formData,
        // Convert dates to ISO string format if they exist
        date_of_birth: formData.date_of_birth
          ? new Date(formData.date_of_birth).toISOString()
          : null,
        registration_date: formData.registration_date
          ? new Date(formData.registration_date).toISOString()
          : null,
        student_id: studentId,
        // Add other date fields if needed
      };

      // Remove the 'message' key if it exists
      delete submissionData.message;
      delete submissionData.affectedRows;
      delete submissionData.updatedFields;
      delete submissionData.created_at;

      // Remove undefined/null values and prepare FormData
      Object.entries(submissionData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          if (value instanceof File) {
            formDataToSend.append(key, value, value.name);
          } else if (typeof value === "object") {
            formDataToSend.append(key, JSON.stringify(value));
          } else {
            formDataToSend.append(key, value);
          }
        }
      });

      // Debug: Log what's being sent
      const formDataObj = {};
      formDataToSend.forEach((value, key) => (formDataObj[key] = value));
      console.log("Form data being sent:", formDataObj);

      let response;

      if (activeStep === "application") {
        // First step - create new record with POST
        response = await api.post(
          `${BASE_URL}createVisaProcess`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

          Swal.fire({
                title: "Processing...",
                html: "Please wait while we submit your data.",
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading();
        
                  // Simulate API call (replace with your actual API call)
                  setTimeout(() => {
                    // This is where your API success would be
                    Swal.fire({
                      title: "Success!",
                      text: "Data submitted successfully!",
                      icon: "success",
                      confirmButtonText: "OK",
                    });
                  }, 2000); // Remove this timeout and replace with your API call
                },
              });

        if (!response.data.id) {
          throw new Error("No ID returned from server after creation");
        }

        setRecordId(response.data.id);
        setCompletedSteps((prev) => [...prev, "application"]);
      } else {
        // Subsequent steps - update existing record with PUT
        if (!recordId) {
          throw new Error("No record ID available for update");
        }

        response = await api.put(
          `${BASE_URL}createVisaProcess/${recordId}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
          Swal.fire({
                title: "Processing...",
                html: "Please wait while we submit your data.",
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading();
        
                  // Simulate API call (replace with your actual API call)
                  setTimeout(() => {
                    // This is where your API success would be
                    Swal.fire({
                      title: "Success!",
                      text: "Data submitted successfully!",
                      icon: "success",
                      confirmButtonText: "OK",
                    });
                  }, 2000); // Remove this timeout and replace with your API call
                },
              });

        if (!completedSteps.includes(activeStep)) {
          setCompletedSteps((prev) => [...prev, activeStep]);
        }
      }

      // Update form data with response
      setFormData((prev) => ({
        ...prev,
        ...response.data,
      }));

      setSuccess(
        `${
          steps.find((s) => s.key === activeStep).label
        } data saved successfully!`
      );

      // Auto-advance to next step if available
      const currentIndex = steps.findIndex((step) => step.key === activeStep);
      if (currentIndex < steps.length - 1) {
        setTimeout(() => {
          setActiveStep(steps[currentIndex + 1].key);
          setSuccess(null);
        }, 1500);
      }
    } catch (err) {
      console.error("Submission error:", err);

      let errorMessage = "Failed to save data";

      if (err.response) {
        // Handle MySQL syntax errors specifically
        if (
          err.response.data?.error?.includes(
            "You have an error in your SQL syntax"
          )
        ) {
          errorMessage = "Data format error. Please check your inputs.";
        } else if (err.response.data?.error?.includes("Unknown column")) {
          errorMessage = "Invalid data field detected. Please contact support.";
        } else {
          errorMessage =
            err.response.data?.message ||
            err.response.statusText ||
            errorMessage;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    api
      .get(`${BASE_URL}universities`)
      .then((res) => {
        setUniversities(res.data);
        if (res.data.length > 0) {
          setSelectedUniversityId(res.data[0].id);
        }
      })
        
      .catch((err) => console.error("Error fetching universities:", err));
  }, []);

  const renderStepper = () => (
    <Card className="mb-4 border-0 shadow-sm">
     <div className="d-flex justify-content-between align-items-center p-3 ">
  <h5>Check Application Journey</h5>
  <Form.Group className="mb-0 d-flex">
    <Form.Select
      name="university_id"
      value={selectedUniversityId}
      onChange={(e) => setSelectedUniversityId(e.target.value)}
    >
      <option value="">-- Select University For Status Check --</option>
      {universities.map((uni) => (
        <option key={uni.id} value={uni.id}>
          {uni.name}
        </option>
      ))}
    </Form.Select>
  </Form.Group>
</div>

<h2 className="text-center mt-3">
  {selectedUniversityId
    ? universities.find((uni) => uni.id.toString() === selectedUniversityId)?.name
      ? `${universities.find((uni) => uni.id.toString() === selectedUniversityId).name} - Visa Processing CRM Workflow`
      : 'Select University'
    : 'Select University'}
</h2>

      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-center overflow-auto py-2">
          {steps.map((step, index) => {
            const isActive = activeStep === step.key;
            const isCompleted = completedSteps.includes(step.key);
            const isDisabled =
              index > 0 && !completedSteps.includes(steps[index - 1].key);

            return (
              <div
                className={`text-center position-relative flex-shrink-0 ${
                  isDisabled ? "opacity-50" : ""
                }`}
                style={{ minWidth: "80px" }}
                key={step.key}
              >
                {index !== 0 && (
                  <div
                    className="position-absolute top-50 start-0 translate-middle-y w-100"
                    style={{
                      height: "2px",
                      backgroundColor: isCompleted ? "#28a745" : "#e9ecef",
                      zIndex: 0,
                    }}
                  />
                )}

                <div
                  className={`rounded-circle d-flex align-items-center justify-content-center mx-auto ${
                    isActive
                      ? "bg-primary"
                      : isCompleted
                      ? "bg-success"
                      : "bg-light"
                  }`}
                  style={{
                    width: "36px",
                    height: "36px",
                    color: isActive || isCompleted ? "white" : "#858796",
                    zIndex: 1,
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    border: isActive ? "2px solid #4e73df" : "none",
                    boxShadow: isActive
                      ? "0 0 0 4px rgba(78, 115, 223, 0.25)"
                      : "none",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => !isDisabled && setActiveStep(step.key)}
                  role="button"
                >
                  {isCompleted ? (
                    <i className="bi bi-check-lg fs-6"></i>
                  ) : (
                    <i className={`bi ${step.icon} fs-6`}></i>
                  )}
                </div>

                <div
                  className={`mt-2 small text-wrap ${
                    isActive ? "text-primary fw-bold" : "text-muted"
                  }`}
                  style={{ fontSize: "0.75rem" }}
                >
                  {step.label}
                </div>
              </div>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );

  const renderApplicationSection = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-primary text-white py-3">
        <h5 className="mb-0">Student Application Details</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="full_name"
                  onChange={handleChange}
                  value={formData.full_name || ""}
                  placeholder="Enter full name"
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email || ""}
                  placeholder="Enter email address"
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone || ""}
                  placeholder="Enter phone number"
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="date_of_birth"
                  onChange={handleChange}
                  value={formData.date_of_birth || ""}
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Passport No / NID</Form.Label>
                <Form.Control
                  type="text"
                  name="passport_no"
                  onChange={handleChange}
                  value={formData.passport_no || ""}
                  placeholder="Enter passport number or NID"
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Applied Program</Form.Label>
                <Form.Control
                  type="text"
                  name="applied_program"
                  onChange={handleChange}
                  value={formData.applied_program || ""}
                  placeholder="Enter program name"
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Intake</Form.Label>
                <Form.Control
                  type="text"
                  name="intake"
                  onChange={handleChange}
                  value={formData.intake || ""}
                  placeholder="Enter intake session"
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Assigned Counselor</Form.Label>
                <Form.Control
                  type="text"
                  name="assigned_counselor"
                  onChange={handleChange}
                  value={formData.assigned_counselor || ""}
                  placeholder="Enter counselor name"
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Registration Date</Form.Label>
                <Form.Control
                  type="date"
                  name="registration_date"
                  onChange={handleChange}
                  value={
                    formData.registration_date
                      ? formData.registration_date.split("T")[0]
                      : ""
                  }
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Source</Form.Label>
                <Form.Control
                  type="text"
                  name="source"
                  onChange={handleChange}
                  value={formData.source || ""}
                  placeholder="Enter source of registration"
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="primary"
              type="submit"
              className="px-4 py-2 rounded-pill shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Saving...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-save me-2"></i>Save Details
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderInterviewSection = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-primary text-white py-3">
        <h5 className="mb-0">Document Upload</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Row>
            {[
              { name: "passport_doc", label: "Passport" },
              { name: "photo_doc", label: "Photo" },
              { name: "ssc_doc", label: "SSC Certificate" },
              { name: "hsc_doc", label: "HSC Transcript" },
              { name: "bachelor_doc", label: "Bachelor's Certificate" },
              { name: "ielts_doc", label: "IELTS/English Certificate" },
              { name: "cv_doc", label: "CV" },
              { name: "sop_doc", label: "SOP" },
              { name: "medical_doc", label: "Medical Certificate" },
              { name: "other_doc", label: "Other Documents" },
            ].map((item, index) => (
              <Col md={6} key={index}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold d-flex align-items-center">
                    <i className="bi bi-file-earmark-arrow-up me-2 text-primary"></i>
                    {item.label}
                  </Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="file"
                      name={item.name}
                      onChange={handleFileChange}
                      className="border-0 border-bottom rounded-0"
                    />
                    {formData[item.name] &&
                      typeof formData[item.name] === "string" && (
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="ms-2 rounded-circle"
                          href={formData[item.name]}
                          target="_blank"
                        >
                          <i className="bi bi-eye"></i>
                        </Button>
                      )}
                  </div>
                </Form.Group>
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="primary"
              type="submit"
              className="px-4 py-2 rounded-pill shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Uploading...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-upload me-2"></i>Upload Documents
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderVisaProcessSection = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-primary text-white py-3">
        <h5 className="mb-0">Embassy Documents Submission</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">University Name</Form.Label>
                <Form.Control
                  type="text"
                  name="university_name"
                  onChange={handleChange}
                  value={formData.university_name || ""}
                  placeholder="Enter university name"
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Program</Form.Label>
                <Form.Control
                  type="text"
                  name="program_name"
                  onChange={handleChange}
                  value={formData.program_name || ""}
                  placeholder="Enter program name"
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Submission Date</Form.Label>
                <Form.Control
                  type="date"
                  name="submission_date"
                  onChange={handleChange}
                  value={
                    formData.submission_date
                      ? formData.submission_date.split("T")[0]
                      : ""
                  }
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Method</Form.Label>
                <Form.Control
                  type="text"
                  name="submission_method"
                  onChange={handleChange}
                  value={formData.submission_method || ""}
                  placeholder="Online/Offline"
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Proof of Submission</Form.Label>
                <Form.Control
                  type="file"
                  name="application_proof"
                  onChange={handleFileChange}
                  className="border-0 border-bottom rounded-0"
                />
                {formData.application_proof &&
                  typeof formData.application_proof === "string" && (
                    <small className="text-muted">
                      Current file:{" "}
                      <a href={formData.application_proof} target="_blank">
                        View
                      </a>
                    </small>
                  )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Application ID</Form.Label>
                <Form.Control
                  type="text"
                  name="application_id"
                  onChange={handleChange}
                  value={formData.application_id || ""}
                  placeholder="Enter application ID"
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Status</Form.Label>
                <Form.Select
                  name="application_status"
                  onChange={handleChange}
                  value={formData.application_status || ""}
                  className="border-0 border-bottom rounded-0"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Pending">Pending</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="primary"
              type="submit"
              className="px-4 py-2 rounded-pill shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Saving...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-send me-2"></i>Submit to Embassy
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderFeePaymentSection = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-primary text-white py-3">
        <h5 className="mb-0">Application Fee Payment</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Amount</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">$</span>
                  <Form.Control
                    type="number"
                    name="fee_amount"
                    onChange={handleChange}
                    value={formData.fee_amount || ""}
                    placeholder="Enter amount paid"
                    className="border-0 border-bottom rounded-0"
                    required
                  />
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Payment Method</Form.Label>
                <Form.Select
                  name="fee_method"
                  onChange={handleChange}
                  value={formData.fee_method || ""}
                  className="border-0 border-bottom rounded-0"
                  required
                >
                  <option value="">Select method</option>
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Credit Card">Credit Card</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Payment Date</Form.Label>
                <Form.Control
                  type="date"
                  name="fee_date"
                  onChange={handleChange}
                  value={
                    formData.fee_date ? formData.fee_date.split("T")[0] : ""
                  }
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Proof of Payment</Form.Label>
                <Form.Control
                  type="file"
                  name="fee_proof"
                  onChange={handleFileChange}
                  className="border-0 border-bottom rounded-0"
                />
                {formData.fee_proof &&
                  typeof formData.fee_proof === "string" && (
                    <small className="text-muted">
                      Current file:{" "}
                      <a href={formData.fee_proof} target="_blank">
                        View
                      </a>
                    </small>
                  )}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Status</Form.Label>
                <Form.Select
                  name="fee_status"
                  onChange={handleChange}
                  value={formData.fee_status || ""}
                  className="border-0 border-bottom rounded-0"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Partial">Partial</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="primary"
              type="submit"
              className="px-4 py-2 rounded-pill shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Processing...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-credit-card me-2"></i>Process Payment
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderZoomInterviewForm = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-primary text-white py-3">
        <h5 className="mb-0">University Interview Details</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Date / Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="interview_date"
                  onChange={handleChange}
                  value={
                    formData.interview_date
                      ? new Date(formData.interview_date)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Platform</Form.Label>
                <Form.Control
                  type="text"
                  name="interview_platform"
                  onChange={handleChange}
                  value={formData.interview_platform || ""}
                  placeholder="e.g., Zoom, Google Meet"
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Status</Form.Label>
                <Form.Select
                  name="interview_status"
                  onChange={handleChange}
                  value={formData.interview_status || ""}
                  className="border-0 border-bottom rounded-0"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Interviewer</Form.Label>
                <Form.Control
                  type="text"
                  name="interviewer_name"
                  onChange={handleChange}
                  value={formData.interviewer_name || ""}
                  placeholder="Enter interviewer's name"
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Recording</Form.Label>
                <Form.Control
                  type="file"
                  name="interview_recording"
                  onChange={handleFileChange}
                  className="border-0 border-bottom rounded-0"
                />
                {formData.interview_recording &&
                  typeof formData.interview_recording === "string" && (
                    <small className="text-muted">
                      Current file:{" "}
                      <a href={formData.interview_recording} target="_blank">
                        View
                      </a>
                    </small>
                  )}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Result</Form.Label>
                <Form.Select
                  name="interview_result"
                  onChange={handleChange}
                  value={formData.interview_result || ""}
                  className="border-0 border-bottom rounded-0"
                >
                  <option value="">Select result</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Result Date</Form.Label>
                <Form.Control
                  type="date"
                  name="interview_result_date"
                  onChange={handleChange}
                  value={
                    formData.interview_result_date
                      ? formData.interview_result_date.split("T")[0]
                      : ""
                  }
                  className="border-0 border-bottom rounded-0"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="interview_feedback"
                  onChange={handleChange}
                  value={formData.interview_feedback || ""}
                  placeholder="Enter interview feedback"
                  className="border-0 border-bottom rounded-0"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Summary</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="interview_summary"
                  onChange={handleChange}
                  value={formData.interview_summary || ""}
                  placeholder="Enter interview summary"
                  className="border-0 border-bottom rounded-0"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="primary"
              type="submit"
              className="px-4 py-2 rounded-pill shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Saving...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-calendar-check me-2"></i>Save Interview
                  Details
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderConditionalOfferLetterForm = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-primary text-white py-3">
        <h5 className="mb-0">Conditional Offer Letter</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Offer Letter Upload</Form.Label>
                <Form.Control
                  type="file"
                  name="conditional_offer_upload"
                  onChange={handleFileChange}
                  className="border-0 border-bottom rounded-0"
                />
                {formData.conditional_offer_upload &&
                  typeof formData.conditional_offer_upload === "string" && (
                    <small className="text-muted">
                      Current file:{" "}
                      <a
                        href={formData.conditional_offer_upload}
                        target="_blank"
                      >
                        View
                      </a>
                    </small>
                  )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Issue Date</Form.Label>
                <Form.Control
                  type="date"
                  name="conditional_offer_date"
                  onChange={handleChange}
                  value={
                    formData.conditional_offer_date
                      ? formData.conditional_offer_date
                      : ""
                  }
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Conditions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="conditional_conditions"
                  onChange={handleChange}
                  value={formData.conditional_conditions || ""}
                  placeholder="Enter any conditions"
                  className="border-0 border-bottom rounded-0"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Status</Form.Label>
                <Form.Select
                  name="conditional_offer_status"
                  onChange={handleChange}
                  value={formData.conditional_offer_status || ""}
                  className="border-0 border-bottom rounded-0"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Pending">Pending</option>
                  <option value="Received">Received</option>
                  <option value="Declined">Declined</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="primary"
              type="submit"
              className="px-4 py-2 rounded-pill shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Saving...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-file-earmark-text me-2"></i>Save Offer
                  Details
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderTuitionFeePaymentForm = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-primary text-white py-3">
        <h5 className="mb-0">Tuition Fee Payment</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Amount</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">$</span>
                  <Form.Control
                    type="number"
                    name="tuition_fee_amount"
                    onChange={handleChange}
                    value={formData.tuition_fee_amount || ""}
                    placeholder="Enter tuition fee amount"
                    className="border-0 border-bottom rounded-0"
                    required
                  />
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Payment Date</Form.Label>
                <Form.Control
                  type="date"
                  name="tuition_fee_date"
                  onChange={handleChange}
                  value={
                    formData.tuition_fee_date ? formData.tuition_fee_date : ""
                  }
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Proof of Payment</Form.Label>
                <Form.Control
                  type="file"
                  name="tuition_fee_proof"
                  onChange={handleFileChange}
                  className="border-0 border-bottom rounded-0"
                />
                {formData.tuition_fee_proof &&
                  typeof formData.tuition_fee_proof === "string" && (
                    <small className="text-muted">
                      Current file:{" "}
                      <a href={formData.tuition_fee_proof} target="_blank">
                        View
                      </a>
                    </small>
                  )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Status</Form.Label>
                <Form.Select
                  name="tuition_fee_status"
                  onChange={handleChange}
                  value={formData.tuition_fee_status || ""}
                  className="border-0 border-bottom rounded-0"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Partial">Partial</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="tuition_comments"
                  onChange={handleChange}
                  value={formData.tuition_comments || ""}
                  placeholder="Enter any remarks or notes"
                  className="border-0 border-bottom rounded-0"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="primary"
              type="submit"
              className="px-4 py-2 rounded-pill shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Processing...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-cash-stack me-2"></i>Record Payment
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderMainOfferLetterForm = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-primary text-white py-3">
        <h5 className="mb-0">Main Offer Letter</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Offer Letter Upload</Form.Label>
                <Form.Control
                  type="file"
                  name="main_offer_upload"
                  onChange={handleFileChange}
                  className="border-0 border-bottom rounded-0"
                />
                {formData.main_offer_upload &&
                  typeof formData.main_offer_upload === "string" && (
                    <small className="text-muted">
                      Current file:{" "}
                      <a href={formData.main_offer_upload} target="_blank">
                        View
                      </a>
                    </small>
                  )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Date</Form.Label>
                <Form.Control
                  type="date"
                  name="main_offer_date"
                  onChange={handleChange}
                  value={
                    formData.main_offer_date ? formData.main_offer_date : ""
                  }
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Status</Form.Label>
                <Form.Select
                  name="main_offer_status"
                  onChange={handleChange}
                  value={formData.main_offer_status || ""}
                  className="border-0 border-bottom rounded-0"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Pending">Pending</option>
                  <option value="Received">Received</option>
                  <option value="Declined">Declined</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="primary"
              type="submit"
              className="px-4 py-2 rounded-pill shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Saving...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-file-earmark-check me-2"></i>Save Offer
                  Letter
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderEmbassyDocumentPreparationForm = () => {
    const documentFields = [
      { name: "motivation_letter", label: "Motivation Letter" },
      { name: "europass_cv", label: "Europass CV" },
      { name: "bank_statement", label: "Bank Statement" },
      { name: "birth_certificate", label: "Birth Certificate" },
      { name: "tax_proof", label: "Tax Proof" },
      { name: "business_docs", label: "Business Documents" },
      { name: "ca_certificate", label: "CA Certificate" },
      { name: "health_insurance", label: "Health/Travel Insurance" },
      { name: "residence_form", label: "Residence Form" },
      { name: "flight_booking", label: "Flight Booking" },
      { name: "police_clearance", label: "Police Clearance" },
      { name: "family_certificate", label: "Family Certificate" },
      { name: "application_form", label: "Application Form" },
    ];

    return (
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-primary text-white py-3">
          <h5 className="mb-0">Embassy Document Preparation</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Row>
              {documentFields.map((field, idx) => (
                <Col md={6} key={idx}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold d-flex align-items-center">
                      <i className="bi bi-file-earmark me-2 text-primary"></i>
                      {field.label}
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name={field.name}
                      onChange={handleFileChange}
                      className="border-0 border-bottom rounded-0"
                    />
                    {formData[field.name] &&
                      typeof formData[field.name] === "string" && (
                        <small className="text-muted">
                          Current file:{" "}
                          <a href={formData[field.name]} target="_blank">
                            View
                          </a>
                        </small>
                      )}
                  </Form.Group>
                </Col>
              ))}
            </Row>

            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="primary"
                type="submit"
                className="px-4 py-2 rounded-pill shadow-sm"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="ms-2">Uploading...</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-folder-check me-2"></i>Complete
                    Documentation
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  };

  const renderEmbassyAppointmentForm = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-primary text-white py-3">
        <h5 className="mb-0">Embassy Appointment</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Location</Form.Label>
                <Form.Control
                  type="text"
                  name="appointment_location"
                  onChange={handleChange}
                  value={formData.appointment_location || ""}
                  placeholder="Enter embassy location"
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Date / Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="appointment_datetime"
                  onChange={handleChange}
                  value={
                    formData.appointment_datetime
                      ? new Date(formData.appointment_datetime)
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Appointment Letter</Form.Label>
                <Form.Control
                  type="file"
                  name="appointment_letter"
                  onChange={handleFileChange}
                  className="border-0 border-bottom rounded-0"
                />
                {formData.appointment_letter &&
                  typeof formData.appointment_letter === "string" && (
                    <small className="text-muted">
                      Current file:{" "}
                      <a href={formData.appointment_letter} target="_blank">
                        View
                      </a>
                    </small>
                  )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Status</Form.Label>
                <Form.Select
                  name="appointment_status"
                  onChange={handleChange}
                  value={formData.appointment_status || ""}
                  className="border-0 border-bottom rounded-0"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="primary"
              type="submit"
              className="px-4 py-2 rounded-pill shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Saving...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-calendar-plus me-2"></i>Schedule
                  Appointment
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderEmbassyInterviewResultForm = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-primary text-white py-3">
        <h5 className="mb-0">Embassy Interview Result</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Result Date</Form.Label>
                <Form.Control
                  type="date"
                  name="embassy_result_date"
                  onChange={handleChange}
                  value={
                    formData.embassy_result_date
                      ? formData.embassy_result_date
                      : ""
                  }
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Result</Form.Label>
                <Form.Select
                  name="embassy_result"
                  onChange={handleChange}
                  value={formData.embassy_result || ""}
                  className="border-0 border-bottom rounded-0"
                  required
                >
                  <option value="">Select result</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="embassy_feedback"
                  onChange={handleChange}
                  value={formData.embassy_feedback || ""}
                  placeholder="Enter feedback from the embassy"
                  className="border-0 border-bottom rounded-0"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="embassy_notes"
                  onChange={handleChange}
                  value={formData.embassy_notes || ""}
                  placeholder="Enter any additional notes"
                  className="border-0 border-bottom rounded-0"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Summary</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="embassy_summary"
                  onChange={handleChange}
                  value={formData.embassy_summary || ""}
                  placeholder="Summary of the embassy interview"
                  className="border-0 border-bottom rounded-0"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="primary"
              type="submit"
              className="px-4 py-2 rounded-pill shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Saving...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-clipboard-check me-2"></i>Record Results
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderVisaStatusForm = () => (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-primary text-white py-3">
        <h5 className="mb-0">Visa Status</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Status</Form.Label>
                <Form.Select
                  name="visa_status"
                  onChange={handleChange}
                  value={formData.visa_status || ""}
                  className="border-0 border-bottom rounded-0"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Decision Date</Form.Label>
                <Form.Control
                  type="date"
                  name="decision_date"
                  onChange={handleChange}
                  value={formData.decision_date ? formData.decision_date : ""}
                  className="border-0 border-bottom rounded-0"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Visa Sticker Upload</Form.Label>
                <Form.Control
                  type="file"
                  name="visa_sticker_upload"
                  onChange={handleFileChange}
                  className="border-0 border-bottom rounded-0"
                />
                {formData.visa_sticker_upload &&
                  typeof formData.visa_sticker_upload === "string" && (
                    <small className="text-muted">
                      Current file:{" "}
                      <a href={formData.visa_sticker_upload} target="_blank">
                        View
                      </a>
                    </small>
                  )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Appeal Status</Form.Label>
                <Form.Select
                  name="appeal_status"
                  onChange={handleChange}
                  value={formData.appeal_status || ""}
                  className="border-0 border-bottom rounded-0"
                >
                  <option value="">Select appeal status</option>
                  <option value="Not Required">Not Required</option>
                  <option value="Appealed">Appealed</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Rejection Reason</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="rejection_reason"
                  onChange={handleChange}
                  value={formData.rejection_reason || ""}
                  placeholder="Enter reason if rejected"
                  className="border-0 border-bottom rounded-0"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="primary"
              type="submit"
              className="px-4 py-2 rounded-pill shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Updating...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-passport me-2"></i>Update Visa Status
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

  return (
    <div className="py-4 p-5" style={{ backgroundColor: "#f8f9fc" }}>
      {renderStepper()}

      {loading && !formData && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading data...</p>
        </div>
      )}

      {!loading && (
        <>
          {activeStep === "application" && renderApplicationSection()}
          {activeStep === "interview" && renderInterviewSection()}
          {activeStep === "visa" && renderVisaProcessSection()}
          {activeStep === "fee" && renderFeePaymentSection()}
          {activeStep === "zoom" && renderZoomInterviewForm()}
          {activeStep === "conditionalOffer" &&
            renderConditionalOfferLetterForm()}
          {activeStep === "tuitionFee" && renderTuitionFeePaymentForm()}
          {activeStep === "mainofferletter" && renderMainOfferLetterForm()}
          {activeStep === "embassydocument" &&
            renderEmbassyDocumentPreparationForm()}
          {activeStep === "embassyappoint" && renderEmbassyAppointmentForm()}
          {activeStep === "embassyinterview" &&
            renderEmbassyInterviewResultForm()}
          {activeStep === "visaStatus" && renderVisaStatusForm()}
        </>
      )}
    </div>
  );
};

export default Visaprocesing;
