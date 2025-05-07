import React, { useState } from "react";
import { Alert, Form, ListGroup, Button } from "react-bootstrap";

const AdmissionTracking = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    fatherName: "",
    category: "",
    highSchool: "",
    highSchoolYear: "",
    highSchoolGrade: "",
    undergraduate: "",
    certifications: "",
    desiredProgram: "",
    preferredUniversity: "",
    startDate: "",
    terms: false,
  });

  const [documents, setDocuments] = useState({
    passport: [],
    academicRecords: [],
    visaDocuments: [],
  });

  const [currentStep, setCurrentStep] = useState(1); // Track current step

  const handleFileChange = (event, category) => {
    const selectedFiles = Array.from(event.target.files);
    setDocuments((prevDocs) => ({
      ...prevDocs,
      [category]: [...prevDocs[category], ...selectedFiles],
    }));
  };

  const removeFile = (category, index) => {
    setDocuments((prevDocs) => ({
      ...prevDocs,
      [category]: prevDocs[category].filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.fullName &&
          formData.dob &&
          formData.gender &&
          formData.phone &&
          formData.email &&
          formData.address &&
          formData.fatherName &&
          formData.category
        );
      case 2:
        return (
          formData.highSchool &&
          formData.highSchoolYear &&
          formData.highSchoolGrade
        );
      case 3:
        return formData.desiredProgram && formData.preferredUniversity && formData.startDate;
      case 4:
        return documents.passport.length > 0 && documents.academicRecords.length > 0 && documents.visaDocuments.length > 0;
      case 5:
        return formData.terms;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("Please fill out all required fields before proceeding.");
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="container p-3">
      <h4 className="fw-bold mb-4">Admission Form</h4>
      <form onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="card p-4 mb-4">
            <h4>Personal Information</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="gender">Gender</label>
                <select
                  className="form-control"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="address">Residential Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="fatherName">Father Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fatherName"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Educational Background */}
        {currentStep === 2 && (
          <div className="card p-4 mb-4">
            <h4>Educational Background</h4>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="highSchool">High School</label>
                <input
                  type="text"
                  className="form-control"
                  id="highSchool"
                  name="highSchool"
                  value={formData.highSchool}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="highSchoolYear">Year</label>
                <input
                  type="text"
                  className="form-control"
                  id="highSchoolYear"
                  name="highSchoolYear"
                  value={formData.highSchoolYear}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="highSchoolGrade">Grade</label>
                <input
                  type="text"
                  className="form-control"
                  id="highSchoolGrade"
                  name="highSchoolGrade"
                  value={formData.highSchoolGrade}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="undergraduate">Undergraduate (if applicable)</label>
                <input
                  type="text"
                  className="form-control"
                  id="undergraduate"
                  name="undergraduate"
                  value={formData.undergraduate}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="certifications">Additional Certifications/Courses</label>
                <input
                  type="text"
                  className="form-control"
                  id="certifications"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Program & Course Selection */}
        {currentStep === 3 && (
          <div className="card p-4 mb-4">
            <h4>Program & Course Selection</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="desiredProgram">Desired Program</label>
                <input
                  type="text"
                  className="form-control"
                  id="desiredProgram"
                  name="desiredProgram"
                  value={formData.desiredProgram}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="preferredUniversity">Preferred University/College</label>
                <input
                  type="text"
                  className="form-control"
                  id="preferredUniversity"
                  name="preferredUniversity"
                  value={formData.preferredUniversity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="startDate">Preferred Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Document Upload */}
        {currentStep === 4 && (
          <div className="card p-4 mb-4">
            <h4>Document Upload</h4>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                Upload Passport
              </Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => handleFileChange(e, "passport")}
              />
              <ListGroup className="mt-2">
                {documents.passport.map((file, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {file.name}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFile("passport", index)}
                    >
                      Remove
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                Upload Academic Records
              </Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => handleFileChange(e, "academicRecords")}
              />
              <ListGroup className="mt-2">
                {documents.academicRecords.map((file, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {file.name}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFile("academicRecords", index)}
                    >
                      Remove
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                Upload Visa Documents
              </Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => handleFileChange(e, "visaDocuments")}
              />
              <ListGroup className="mt-2">
                {documents.visaDocuments.map((file, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {file.name}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFile("visaDocuments", index)}
                    >
                      Remove
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Form.Group>
          </div>
        )}

        {/* Step 5: Declaration & Consent */}
        {currentStep === 5 && (
          <div className="card p-4 mb-4">
            <h4>Declaration & Consent</h4>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="terms">
                I agree to the terms and conditions
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-4">
          {currentStep > 1 && (
            <Button variant="secondary" onClick={prevStep}>
              Back
            </Button>
          )}
          {currentStep < 5 ? (
            <Button variant="primary" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button variant="success" type="submit">
              Submit Application
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdmissionTracking;