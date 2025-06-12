import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import BASE_URL from "../Config";
import api from "../interceptors/axiosInterceptor";

const Inquirydemo = () => {
  const initialInquiryState = {
    inquiryType: "",
    source: "Whatsapp",
    branch: "",
    name: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
    course: "",
    country: "",
    city: "",
    dateOfInquiry: "",
    address: "",
    presentAddress: "",
    education: {
      ssc: { gpa: "", year: "" },
      hsc: { gpa: "", year: "" },
      bachelor: { cgpa: "", year: "" },
      master: { cgpa: "", year: "" },
      boardUniversity: "",
      medium: ""
    },
    program: {
      studyLevel: "",
      studyField: "",
      intake: "",
      budget: ""
    },
    englishProficiency: {
      testType: "",
      overall: "",
      reading: "",
      writing: "",
      speaking: "",
      listening: ""
    },
    jobExperience: { company: "", jobTitle: "", duration: "" },
    studyGap: "",
    visaRefusal: "No",
    refusalReason: "",
    preferredCountries: [],
    consent: false,
  };

  const [inquiry, setInquiry] = useState(initialInquiryState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "preferredCountries") {
      setInquiry((prev) => ({
        ...prev,
        preferredCountries: checked
          ? [...prev.preferredCountries, value]
          : prev.preferredCountries.filter((item) => item !== value),
      }));
    } else if (type === "checkbox") {
      setInquiry({ ...inquiry, [name]: checked });
    } else {
      setInquiry({ ...inquiry, [name]: value });
    }
  };

  const handleNestedChange = (section, field, value) => {
    setInquiry((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      inquiry_type: inquiry.inquiryType,
      source: inquiry.source,
      branch: inquiry.branch,
      full_name: inquiry.name,
      phone_number: inquiry.phone,
      email: inquiry.email,
      gender: inquiry.gender,
      dob: inquiry.dob,
      course_name: inquiry.course,
      country: inquiry.country,
      city: inquiry.city,
      date_of_inquiry: inquiry.dateOfInquiry,
      address: inquiry.address,
      present_address: inquiry.presentAddress,
      education_background: inquiry.education,
      program_info: inquiry.program,
      english_proficiency: inquiry.englishProficiency,
      company_name: inquiry.jobExperience.company,
      job_title: inquiry.jobExperience.jobTitle,
      job_duration: inquiry.jobExperience.duration,
      study_gap: inquiry.studyGap,
      visa_refusal: inquiry.visaRefusal,
      refusal_reason: inquiry.refusalReason,
      preferred_countries: inquiry.preferredCountries,
      consent: inquiry.consent
    };

    try {
      const res = await api.post(`${BASE_URL}inquiries`, requestData);
      if (res.status === 200) {
        Swal.fire("Success", "Inquiry submitted successfully", "success");
        setInquiry(initialInquiryState);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Submission failed", "error");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Student Inquiry Form</h3>
      <Form onSubmit={handleSubmit}>

        {/* Inquiry Details */}
        <h5 className="mt-3">Inquiry Details</h5>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Inquiry Type</Form.Label>
              <Form.Select name="inquiryType" value={inquiry.inquiryType} onChange={handleChange} required>
                <option value="">Select</option>
                <option>Student Visa</option>
                <option>Visit Visa</option>
                <option>Work Visa</option>
                <option>Short Visa</option>
                <option>German Course</option>
                <option>English Course</option>
                <option>Others</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Source</Form.Label>
              <Form.Select name="source" value={inquiry.source} onChange={handleChange} required>
                <option>Whatsapp</option>
                <option>Facebook</option>
                <option>YouTube</option>
                <option>Website</option>
                <option>Referral</option>
                <option>Event</option>
                <option>Agent</option>
                <option>Office Visit</option>
                <option>Hotline</option>
                <option>Seminar</option>
                <option>Expo</option>
                <option>Other</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Branch</Form.Label>
              <Form.Control type="text" name="branch" value={inquiry.branch} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        {/* Personal Details */}
        <h5>Personal Details</h5>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="name" value={inquiry.name} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={inquiry.phone} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={inquiry.email} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" value={inquiry.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" name="dob" value={inquiry.dob} onChange={handleChange} />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Preferred Countries</Form.Label>
              <div>
                {["UK", "Germany", "Canada", "USA", "Malaysia"].map((country) => (
                  <Form.Check inline key={country} type="checkbox" label={country} value={country}
                    checked={inquiry.preferredCountries.includes(country)}
                    onChange={handleChange} name="preferredCountries" />
                ))}
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Consent */}
        <Form.Check type="checkbox" label="I confirm that all the information provided is correct."
          name="consent" checked={inquiry.consent} onChange={handleChange} required />

        <div className="text-end mt-3">
          <Button type="submit" variant="primary">Submit Inquiry</Button>
        </div>

      </Form>
    </div>
  );
};

export default Inquirydemo;
