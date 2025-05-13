import React, { useState } from "react";
import { Form, Row, Col, Modal, Button } from "react-bootstrap";
 // Ensure axios is imported correctly
import Swal from 'sweetalert2'; // For SweetAlert messages
import BASE_URL from "../Config";
import api from "../interceptors/axiosInterceptor";
const InquiryForm = () => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [newInquiry, setNewInquiry] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    course: "",
    source: "Whatsapp",
    inquiryType: "",
    branch: "",
    assignee: "",
    country: "",
    dateOfInquiry: "",
    presentAddress: "",
    education: [],
    englishProficiency: [],
    jobExperience: {
      company: "",
      jobTitle: "",
      duration: "",
    },
    preferredCountries: [],
  });

  const handleCloseInquiryModal = () => {
    setShowInquiryModal(false);
    setNewInquiry({
      name: "",
      email: "",
      phone: "",
      city: "",
      address: "",
      course: "",
      source: "Whatsapp",
      inquiryType: "",
      branch: "",
      assignee: "",
      country: "",
      dateOfInquiry: "",
      presentAddress: "",
      education: [],
      englishProficiency: [],
      jobExperience: {
        company: "",
        jobTitle: "",
        duration: "",
      },
      preferredCountries: [],
    });
  };

  const handleInquiryInputChange = (e) => {
    const { name, value } = e.target;
    setNewInquiry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name, value, checked) => {
    setNewInquiry((prev) => {
      const newArray = checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value);
      return { ...prev, [name]: newArray };
    });
  };

  const handleJobExpChange = (field, value) => {
    setNewInquiry((prev) => ({
      ...prev,
      jobExperience: { ...prev.jobExperience, [field]: value },
    }));
  };

  const handleAddInquiry = async (e) => {
    e.preventDefault();

    const requestData = {
      user_id: 1,
      inquiry_type: newInquiry.inquiryType,
      source: newInquiry.source,
      branch: newInquiry.branch,
      full_name: newInquiry.name,
      phone_number: newInquiry.phone,
      email: newInquiry.email,
      course_name: newInquiry.course,
      country: newInquiry.country,
      city: newInquiry.city,
      date_of_inquiry: newInquiry.dateOfInquiry,
      address: newInquiry.address,
      present_address: newInquiry.presentAddress,
      education_background: newInquiry.education,
      english_proficiency: newInquiry.englishProficiency,
      company_name: newInquiry.jobExperience.company,
      job_title: newInquiry.jobExperience.jobTitle,
      job_duration: newInquiry.jobExperience.duration,
      preferred_countries: newInquiry.preferredCountries,
    };

    try {
      const response = await api.post(`${BASE_URL}inquiries`, requestData);
      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Inquiry submitted successfully.',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          handleCloseInquiryModal(); // Close the modal after success
        });
      } else {
        Swal.fire({
          title: 'Success!',
          text: 'Inquiry submitted successfully.',
          icon: 'success',
          confirmButtonText: 'Close',
        });
      }
    } catch (error) {
      console.error("Error during inquiry submission:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    }
  };

  return (
    <div>
      <h4> New Inquiry Form</h4>

    {/* Modal for Adding New Inquiry */}
      {/* <Modal
        show={showInquiryModal}
        onHide={handleCloseInquiryModal}
        centered
        size="lg "
      >
        <Modal.Header closeButton>
          <Modal.Title>New Inquiry Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
        </Modal.Body>
      </Modal> */}





<Form onSubmit={handleAddInquiry}>
            {/* Inquiry Info */}
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="inquiryType">
                  <Form.Label>Inquiry Type</Form.Label>
                  <Form.Select
                    name="inquiryType"
                    value={newInquiry.inquiryType}
                    onChange={handleInquiryInputChange}
                    required
                  >
                    <option value="">Select Inquiry Type</option>
                    <option value="studentVisa">Student Visa</option>
                    <option value="touristVisa">Visit Visa</option>
                    <option value="workVisa">Work Visa</option>
                    <option value="germanCourse">German Course</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="source">
                  <Form.Label>Source</Form.Label>
                  <Form.Select
                    name="source"
                    value={newInquiry.source}
                    onChange={handleInquiryInputChange}
                    required
                  >
                    <option value="Whatsapp">WhatsApp</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Website">Website</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="branch">
                  <Form.Label>Branch</Form.Label>
                  <Form.Select
                    name="branch"
                    value={newInquiry.branch}
                    onChange={handleInquiryInputChange}
                    required
                  >
                    <option value="">Select Branch</option>
                    <option value="dhaka">Dhaka</option>
                    <option value="sylhet">Sylhet</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Personal Information */}
            <h5 className="mt-4 mb-3">Personal Information</h5>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    name="name"
                    value={newInquiry.name}
                    onChange={handleInquiryInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    name="phone"
                    value={newInquiry.phone}
                    onChange={handleInquiryInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={newInquiry.email}
                    onChange={handleInquiryInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="name">
                  <Form.Label>Courses Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Course"
                    name="course"
                    value={newInquiry.course}
                    onChange={handleInquiryInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter country"
                    name="country"
                    value={newInquiry.country}
                    onChange={handleInquiryInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    name="city"
                    value={newInquiry.city}
                    onChange={handleInquiryInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="dateOfInquiry">
                  <Form.Label>Date of Inquiry</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfInquiry"
                    value={newInquiry.dateOfInquiry}
                    onChange={handleInquiryInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    name="address"
                    value={newInquiry.address}
                    onChange={handleInquiryInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="presentAddress">
                  <Form.Label>Present Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter present address"
                    name="presentAddress"
                    value={newInquiry.presentAddress}
                    onChange={handleInquiryInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Educational Background */}
            <h5 className="mt-4 mb-3">Educational Background</h5>
            <Row className="mb-3">
              <Col md={12}>
                {["SSC", "HSC", "Bachelor", "Masters"].map((edu) => (
                  <Form.Check
                    inline
                    type="checkbox"
                    label={edu}
                    id={`edu-${edu.toLowerCase()}`}
                    key={edu}
                    checked={newInquiry.education.includes(edu)}
                    onChange={(e) =>
                      handleCheckboxChange("education", edu, e.target.checked)
                    }
                  />
                ))}
              </Col>
            </Row>

            {/* English Proficiency */}
            <h5 className="mt-4 mb-3">English Proficiency</h5>
            <Row className="mb-3">
              <Col md={12}>
                {["Reading", "Writing", "Speaking", "Listening"].map(
                  (skill) => (
                    <Form.Check
                      inline
                      type="checkbox"
                      label={skill}
                      id={`skill-${skill.toLowerCase()}`}
                      key={skill}
                      checked={newInquiry.englishProficiency.includes(skill)}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "englishProficiency",
                          skill,
                          e.target.checked
                        )
                      }
                    />
                  )
                )}
              </Col>
            </Row>

            {/* Job Experience */}
            <h5 className="mt-4 mb-3">Job Experience</h5>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="company">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Company Name"
                    value={newInquiry.jobExperience.company}
                    onChange={(e) =>
                      handleJobExpChange("company", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="jobTitle">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Job Title"
                    value={newInquiry.jobExperience.jobTitle}
                    onChange={(e) =>
                      handleJobExpChange("jobTitle", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="duration">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., 2 years"
                    value={newInquiry.jobExperience.duration}
                    onChange={(e) =>
                      handleJobExpChange("duration", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Preferred Countries */}
            <h5 className="mt-4 mb-3">Preferred Countries</h5>
            <Row className="mb-3">
              <Col md={12}>
                {["Germany", "Canada", "UK", "USA"].map((country) => (
                  <Form.Check
                    inline
                    type="checkbox"
                    label={country}
                    id={`country-${country.toLowerCase()}`}
                    key={country}
                    checked={newInquiry.preferredCountries.includes(country)}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "preferredCountries",
                        country,
                        e.target.checked
                      )
                    }
                  />
                ))}
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="danger" onClick={handleCloseInquiryModal} className="me-2">
                Clear
              </Button>
              <Button variant="secondary" type="submit">
                Submit Inquiry
              </Button>
            </div>
          </Form>

    </div>
  );
};

export default InquiryForm;
