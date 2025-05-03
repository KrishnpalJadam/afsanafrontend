import React, { useState } from "react";
import { Alert, Form, ListGroup, Button } from "react-bootstrap"; // Import missing components

const AdmissionTracking = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
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

  const handleUpload = () => {
    // Simulating file upload process
    alert("Files uploaded successfully!");
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
    console.log("Form submitted:", formData);
    // Add submission logic here (e.g., API call)
  };

  return (
    <div className="container p-3"  > 
      <h4 className="fw-bold mb-4">Admission Form</h4>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
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
              <label htmlFor="address">Father Name</label>
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
              <label htmlFor="address">Category</label>
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
          </div>
        </div>

        {/* Educational Background */}
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
              <label htmlFor="undergraduate">
                Undergraduate (if applicable)
              </label>
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
              <label htmlFor="certifications">
                Additional Certifications/Courses
              </label>
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

        {/* Program & Course Selection */}
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
              <label htmlFor="preferredUniversity">
                Preferred University/College
              </label>
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

        {/* Document Upload */}
        <h2>Document Upload</h2>
        {/* Passport Upload */}
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

        {/* Academic Records Upload */}
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

        {/* Visa Documents Upload */}
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

        {/* Declaration & Consent */}
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

        <button type="submit" className="btn btn-primary" style={{backgroundColor:"gray" , color:"black", border:"none"}}>
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default AdmissionTracking;
