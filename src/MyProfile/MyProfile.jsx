import React, { useState, useEffect } from "react";
import {
  Card,
  ListGroup,
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Table,
} from "react-bootstrap";
import api from "../interceptors/axiosInterceptor";

const MyProfile = () => {
  const loginDetail = JSON.parse(localStorage.getItem("login_detail"));

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [userData, setUserData] = useState(null);
  const [academicInfo, setAcademicInfo] = useState([{}]);
  const [jobDetails, setJobDetails] = useState([{}]);
  const [businessDetails, setBusinessDetails] = useState([{}]);
  const [sponsorBusinessDetails, setSponsorBusinessDetails] = useState([{}]);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    date_of_birth: "",
    father_name: "",
    admission_no: "",
    id_no: "",
    category: "",
    university_id: "",
    // Additional fields
    tin_no: "",
    present_address: "",
    permanent_address: "",
    marital_status: "",
    spouse_occupation: "",
    spouse_income: "",
    children_count: "",
    sponsor: "",
    ept_name: "",
    ept_expiry: "",
    ept_score: "",
    ept_result: "",
    ept_listening: "",
    ept_reading: "",
    ept_speaking: "",
    ept_writing: "",
    refused_countries: "",
    travel_history: "",
    passport_no: "",
    passport_expiry: "",
    passport2_no: "",
    passport2_expiry: "",
    passport3_no: "",
    passport3_expiry: "",
    sponsor_name: "",
    sponsor_email: "",
    sponsor_relationship: "",
    sponsor_occupation: "",
    sponsor_job_position: "",
    sponsor_employment_duration: "",
    sponsor_status: "",
    sponsor_business_tin: "",
    sponsor_tax_documents: "",
    sponsor_address: "",
    sponsor_phone: "",
    visa_refusal_explanation: "",
    name_mismatch: "",
    study_gap_explanation: "",
    deportation_details: "",
  });

  const fetchUserData = async () => {
    if (!loginDetail) return;

    try {
      const res = await api.get(`auth/getUser/${loginDetail.id}`);
      if (res.data.user) {
        const user = res.data.user;
        setUserData(user);
        setFormData({
          full_name: user.full_name || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
          gender: user.gender || "",
          date_of_birth: user.date_of_birth
            ? user.date_of_birth.split("T")[0]
            : "",
          father_name: user.father_name || "",
          admission_no: user.admission_no || "",
          id_no: user.id_no || "",
          category: user.category || "",
          university_id: user.university_id || "",
          // Additional fields
          tin_no: user.tin_no || "",
          present_address: user.present_address || "",
          permanent_address: user.permanent_address || "",
          marital_status: user.marital_status || "",
          spouse_occupation: user.spouse_occupation || "",
          spouse_income: user.spouse_income || "",
          children_count: user.children_count || "",
          sponsor: user.sponsor || "",
          ept_name: user.ept_name || "",
          ept_expiry: user.ept_expiry || "",
          ept_score: user.ept_score || "",
          ept_result: user.ept_result || "",
          ept_listening: user.ept_listening || "",
          ept_reading: user.ept_reading || "",
          ept_speaking: user.ept_speaking || "",
          ept_writing: user.ept_writing || "",
          refused_countries: user.refused_countries || "",
          travel_history: user.travel_history || "",
          passport_no: user.passport_no || "",
          passport_expiry: user.passport_expiry || "",
          passport2_no: user.passport2_no || "",
          passport2_expiry: user.passport2_expiry || "",
          passport3_no: user.passport3_no || "",
          passport3_expiry: user.passport3_expiry || "",
          sponsor_name: user.sponsor_name || "",
          sponsor_email: user.sponsor_email || "",
          sponsor_relationship: user.sponsor_relationship || "",
          sponsor_occupation: user.sponsor_occupation || "",
          sponsor_job_position: user.sponsor_job_position || "",
          sponsor_employment_duration: user.sponsor_employment_duration || "",
          sponsor_status: user.sponsor_status || "",
          sponsor_business_tin: user.sponsor_business_tin || "",
          sponsor_tax_documents: user.sponsor_tax_documents || "",
          sponsor_address: user.sponsor_address || "",
          sponsor_phone: user.sponsor_phone || "",
          visa_refusal_explanation: user.visa_refusal_explanation || "",
          name_mismatch: user.name_mismatch || "",
          study_gap_explanation: user.study_gap_explanation || "",
          deportation_details: user.deportation_details || "",
        });

        // Set array data
        if (user.academic_info) setAcademicInfo(user.academic_info);
        if (user.job_details) setJobDetails(user.job_details);
        if (user.business_details) setBusinessDetails(user.business_details);
        if (user.sponsor_business_details) setSponsorBusinessDetails(user.sponsor_business_details);
      }
    } catch (error) {
      console.error("Failed to fetch user data: ", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    switch (arrayName) {
      case 'academic':
        const updatedAcademic = [...academicInfo];
        updatedAcademic[index] = { ...updatedAcademic[index], [field]: value };
        setAcademicInfo(updatedAcademic);
        break;
      case 'job':
        const updatedJob = [...jobDetails];
        updatedJob[index] = { ...updatedJob[index], [field]: value };
        setJobDetails(updatedJob);
        break;
      case 'business':
        const updatedBusiness = [...businessDetails];
        updatedBusiness[index] = { ...updatedBusiness[index], [field]: value };
        setBusinessDetails(updatedBusiness);
        break;
      case 'sponsorBusiness':
        const updatedSponsorBusiness = [...sponsorBusinessDetails];
        updatedSponsorBusiness[index] = { ...updatedSponsorBusiness[index], [field]: value };
        setSponsorBusinessDetails(updatedSponsorBusiness);
        break;
      default:
        break;
    }
  };

  const addNewRow = (arrayName) => {
    switch (arrayName) {
      case 'academic':
        setAcademicInfo([...academicInfo, {}]);
        break;
      case 'job':
        setJobDetails([...jobDetails, {}]);
        break;
      case 'business':
        setBusinessDetails([...businessDetails, {}]);
        break;
      case 'sponsorBusiness':
        setSponsorBusinessDetails([...sponsorBusinessDetails, {}]);
        break;
      default:
        break;
    }
  };

  const removeRow = (arrayName, index) => {
    switch (arrayName) {
      case 'academic':
        if (academicInfo.length > 1) {
          const updated = [...academicInfo];
          updated.splice(index, 1);
          setAcademicInfo(updated);
        }
        break;
      case 'job':
        if (jobDetails.length > 1) {
          const updated = [...jobDetails];
          updated.splice(index, 1);
          setJobDetails(updated);
        }
        break;
      case 'business':
        if (businessDetails.length > 1) {
          const updated = [...businessDetails];
          updated.splice(index, 1);
          setBusinessDetails(updated);
        }
        break;
      case 'sponsorBusiness':
        if (sponsorBusinessDetails.length > 1) {
          const updated = [...sponsorBusinessDetails];
          updated.splice(index, 1);
          setSponsorBusinessDetails(updated);
        }
        break;
      default:
        break;
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      academic_info: academicInfo,
      job_details: jobDetails,
      business_details: businessDetails,
      sponsor_business_details: sponsorBusinessDetails,
      user_id: loginDetail.id
    };

    try {
      const res = await api.put(
        `auth/updateUser/${loginDetail.id}`,
        dataToSend
      );
      if (res.status === 200) {
        alert("Profile updated successfully!");
        fetchUserData();
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("An error occurred while updating the profile.");
    }
  };

  const renderItem = (label, name, isTextArea = false) => {
    return (
      <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4 border-0 border-bottom">
        <span className="fw-semibold text-secondary">{label}</span>
        {isTextArea ? (
          <Form.Control
            as="textarea"
            rows={2}
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            style={{ width: '60%' }}
          />
        ) : (
          <Form.Control
            type="text"
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            style={{ width: '60%' }}
          />
        )}
      </ListGroup.Item>
    );
  };

  const renderAcademicTable = () => {
    return (
      <Table bordered className="mb-0">
        <thead className="table-light">
          <tr>
            <th>Institute Name & Address</th>
            <th>Degree</th>
            <th>Group/Department</th>
            <th>Result</th>
            <th>Duration (Start–End DD/MM/YYYY)</th>
            <th>Fail/Retake/Withdraw/Transfer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {academicInfo.map((item, index) => (
            <tr key={index}>
              <td>
                <Form.Control
                  type="text"
                  value={item.institute || ""}
                  onChange={(e) => handleArrayChange('academic', index, 'institute', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.degree || ""}
                  onChange={(e) => handleArrayChange('academic', index, 'degree', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.department || ""}
                  onChange={(e) => handleArrayChange('academic', index, 'department', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.result || ""}
                  onChange={(e) => handleArrayChange('academic', index, 'result', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.duration || ""}
                  onChange={(e) => handleArrayChange('academic', index, 'duration', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.fail_retake || ""}
                  onChange={(e) => handleArrayChange('academic', index, 'fail_retake', e.target.value)}
                />
              </td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => removeRow('academic', index)}
                  disabled={academicInfo.length <= 1}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const renderJobDetailsTable = () => {
    return (
      <Table bordered className="mb-0">
        <thead className="table-light">
          <tr>
            <th>Company & Designation</th>
            <th>Monthly Income</th>
            <th>Payment Method</th>
            <th>Bank Name & Account Type</th>
            <th>Employment Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobDetails.map((item, index) => (
            <tr key={index}>
              <td>
                <Form.Control
                  type="text"
                  value={item.company || ""}
                  onChange={(e) => handleArrayChange('job', index, 'company', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.income || ""}
                  onChange={(e) => handleArrayChange('job', index, 'income', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.payment_method || ""}
                  onChange={(e) => handleArrayChange('job', index, 'payment_method', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.bank_details || ""}
                  onChange={(e) => handleArrayChange('job', index, 'bank_details', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.duration || ""}
                  onChange={(e) => handleArrayChange('job', index, 'duration', e.target.value)}
                />
              </td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => removeRow('job', index)}
                  disabled={jobDetails.length <= 1}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const renderBusinessDetailsTable = () => {
    return (
      <Table bordered className="mb-0">
        <thead className="table-light">
          <tr>
            <th>Business Name & License No.</th>
            <th>Monthly Income & Current Balance</th>
            <th>Personal Savings (Bank, Type, Branch, Amount)</th>
            <th>Business Income Bank Name & Type</th>
            <th>Tax Returns (3 years) & TIN Certificate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {businessDetails.map((item, index) => (
            <tr key={index}>
              <td>
                <Form.Control
                  type="text"
                  value={item.business_name || ""}
                  onChange={(e) => handleArrayChange('business', index, 'business_name', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.income_balance || ""}
                  onChange={(e) => handleArrayChange('business', index, 'income_balance', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.personal_savings || ""}
                  onChange={(e) => handleArrayChange('business', index, 'personal_savings', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.bank_details || ""}
                  onChange={(e) => handleArrayChange('business', index, 'bank_details', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.tax_returns || ""}
                  onChange={(e) => handleArrayChange('business', index, 'tax_returns', e.target.value)}
                />
              </td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => removeRow('business', index)}
                  disabled={businessDetails.length <= 1}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const renderSponsorBusinessDetailsTable = () => {
    return (
      <Table bordered className="mb-0">
        <thead className="table-light">
          <tr>
            <th>Business Name</th>
            <th>Type</th>
            <th>Income (Monthly & Yearly)</th>
            <th>License No.</th>
            <th>Income Received via (Cash/Bank)</th>
            <th>Bank Details (if bank)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sponsorBusinessDetails.map((item, index) => (
            <tr key={index}>
              <td>
                <Form.Control
                  type="text"
                  value={item.business_name || ""}
                  onChange={(e) => handleArrayChange('sponsorBusiness', index, 'business_name', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.type || ""}
                  onChange={(e) => handleArrayChange('sponsorBusiness', index, 'type', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.income || ""}
                  onChange={(e) => handleArrayChange('sponsorBusiness', index, 'income', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.license_no || ""}
                  onChange={(e) => handleArrayChange('sponsorBusiness', index, 'license_no', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.income_received || ""}
                  onChange={(e) => handleArrayChange('sponsorBusiness', index, 'income_received', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.bank_details || ""}
                  onChange={(e) => handleArrayChange('sponsorBusiness', index, 'bank_details', e.target.value)}
                />
              </td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => removeRow('sponsorBusiness', index)}
                  disabled={sponsorBusinessDetails.length <= 1}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  if (!loginDetail) {
    return (
      <Container className="mt-5 text-center">
        <h4 className="text-muted">No user is logged in.</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Form onSubmit={handleUpdateProfile}>
        <Row className="justify-content-center">
          <Col md={12}>
            <Card className="container-flud shadow-sm rounded-4 border-0 overflow-hidden">
              <Card.Header
                as="h4"
                className="text-center bg-primary text-white py-3 fw-bold"
              >
                GENERAL INFORMATION
              </Card.Header>

              <ListGroup variant="flush">
                {renderItem("Full Name", "full_name")}
                {renderItem("Email", "email")}
                {renderItem("Phone", "phone")}
                {renderItem("Gender", "gender")}
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4 border-0 border-bottom">
                  <span className="fw-semibold text-secondary">Date of Birth</span>
                  <Form.Control
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth || ""}
                    onChange={handleChange}
                    style={{ width: '60%' }}
                  />
                </ListGroup.Item>
                {renderItem("Address", "address", true)}
                {renderItem("Father's Name", "father_name")}
                {renderItem("ID No.", "id_no")}
                {renderItem("TIN No.", "tin_no")}
                {renderItem("Present Address", "present_address", true)}
                {renderItem("Permanent Address", "permanent_address", true)}
                {renderItem("Marital Status", "marital_status")}
                {renderItem("Spouse's Occupation (If married)", "spouse_occupation")}
                {renderItem("Spouse's Monthly Income (If married)", "spouse_income")}
                {renderItem("Number of Children (If married)", "children_count")}
                {renderItem("Who Will Be Your Sponsor?", "sponsor")}
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={12}>
            <div className="shadow-sm rounded-4 border overflow-hidden">
              <div className="bg-primary text-white py-3 fw-bold text-center h4">
                ACADEMIC INFORMATION
              </div>
              {renderAcademicTable()}
              <div className="text-center bg-light py-3">
                <Button variant="primary" onClick={() => addNewRow('academic')}>
                  Add more
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5">
          <Col md={12}>
            <Card className="container-flud shadow-sm rounded-4 border-0 overflow-hidden">
              <Card.Header
                as="h4"
                className="text-center bg-primary text-white py-3 fw-bold"
              >
                ENGLISH PROFICIENCY TEST (EPT) SCORE
              </Card.Header>

              <ListGroup variant="flush">
                {renderItem("EPT Name", "ept_name")}
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4 border-0 border-bottom">
                  <span className="fw-semibold text-secondary">Expiry Date</span>
                  <Form.Control
                    type="date"
                    name="ept_expiry"
                    value={formData.ept_expiry || ""}
                    onChange={handleChange}
                    style={{ width: '60%' }}
                  />
                </ListGroup.Item>
                {renderItem("Overall Score", "ept_score")}
                {renderItem("Result", "ept_result")}
                {renderItem("Listening", "ept_listening")}
                {renderItem("Reading", "ept_reading")}
                {renderItem("Speaking", "ept_speaking")}
                {renderItem("Writing", "ept_writing")}
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={12}>
            <div className="shadow-sm rounded-4 border overflow-hidden">
              <div className="bg-primary text-white py-3 fw-bold text-center h4">
                APPLICANT'S JOB/PROFESSIONAL DETAILS
              </div>
              {renderJobDetailsTable()}
              <div className="text-center bg-light py-3">
                <Button variant="primary" onClick={() => addNewRow('job')}>
                  Add more
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5">
          <Col md={12}>
            <Card className="container-flud shadow-sm rounded-4 border-0 overflow-hidden">
              <Card.Header
                as="h4"
                className="text-center bg-primary text-white py-3 fw-bold"
              >
                TRAVEL & PASSPORT DETAILS
              </Card.Header>

              <ListGroup variant="flush">
                {renderItem("Previously Refused Countries (Name, Year, Reason)", "refused_countries", true)}
                {renderItem("Travel History (Country Name, Year)", "travel_history", true)}
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4 border-0 border-bottom">
                  <span className="fw-semibold text-secondary">Current Passport No.</span>
                  <div style={{ width: '60%', display: 'flex', gap: '10px' }}>
                    <Form.Control
                      type="text"
                      name="passport_no"
                      value={formData.passport_no || ""}
                      onChange={handleChange}
                      placeholder="Passport No."
                    />
                    <Form.Control
                      type="date"
                      name="passport_expiry"
                      value={formData.passport_expiry || ""}
                      onChange={handleChange}
                      placeholder="Expiry Date"
                    />
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4 border-0 border-bottom">
                  <span className="fw-semibold text-secondary">Passport 2 No. & Expiry Date</span>
                  <div style={{ width: '60%', display: 'flex', gap: '10px' }}>
                    <Form.Control
                      type="text"
                      name="passport2_no"
                      value={formData.passport2_no || ""}
                      onChange={handleChange}
                      placeholder="Passport No."
                    />
                    <Form.Control
                      type="date"
                      name="passport2_expiry"
                      value={formData.passport2_expiry || ""}
                      onChange={handleChange}
                      placeholder="Expiry Date"
                    />
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4 border-0 border-bottom">
                  <span className="fw-semibold text-secondary">Passport 3 No. & Expiry Date</span>
                  <div style={{ width: '60%', display: 'flex', gap: '10px' }}>
                    <Form.Control
                      type="text"
                      name="passport3_no"
                      value={formData.passport3_no || ""}
                      onChange={handleChange}
                      placeholder="Passport No."
                    />
                    <Form.Control
                      type="date"
                      name="passport3_expiry"
                      value={formData.passport3_expiry || ""}
                      onChange={handleChange}
                      placeholder="Expiry Date"
                    />
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={12}>
            <div className="shadow-sm rounded-4 border overflow-hidden">
              <div className="bg-primary text-white py-3 fw-bold text-center h4">
                BUSINESS DETAILS (IF ANY)
              </div>
              {renderBusinessDetailsTable()}
              <div className="text-center bg-light py-3">
                <Button variant="primary" onClick={() => addNewRow('business')}>
                  Add more
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5">
          <Col md={12}>
            <Card className="container-flud shadow-sm rounded-4 border-0 overflow-hidden">
              <Card.Header
                as="h4"
                className="text-center bg-primary text-white py-3 fw-bold"
              >
                SPONSOR'S INFORMATION
              </Card.Header>

              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4 border-0 border-bottom">
                  <span className="fw-semibold text-secondary">Name & Email</span>
                  <div style={{ width: '60%', display: 'flex', gap: '10px' }}>
                    <Form.Control
                      type="text"
                      name="sponsor_name"
                      value={formData.sponsor_name || ""}
                      onChange={handleChange}
                      placeholder="Name"
                    />
                    <Form.Control
                      type="email"
                      name="sponsor_email"
                      value={formData.sponsor_email || ""}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </div>
                </ListGroup.Item>
                {renderItem("Relationship", "sponsor_relationship")}
                {renderItem("Occupation", "sponsor_occupation")}
                {renderItem("Job Position, Company", "sponsor_job_position")}
                {renderItem("Employment Duration", "sponsor_employment_duration")}
                {renderItem("Status (Employed/Unemployed/Business)", "sponsor_status")}
                {renderItem("Business TIN/BIN (if any)", "sponsor_business_tin")}
                {renderItem("Tax Documents Available (Yes/No)", "sponsor_tax_documents")}
                {renderItem("Present Address", "sponsor_address", true)}
                {renderItem("Phone", "sponsor_phone")}
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={12}>
            <div className="shadow-sm rounded-4 border overflow-hidden">
              <div className="bg-primary text-white py-3 fw-bold text-center h4">
                SPONSOR'S BUSINESS DETAILS
              </div>
              {renderSponsorBusinessDetailsTable()}
              <div className="text-center bg-light py-3">
                <Button variant="primary" onClick={() => addNewRow('sponsorBusiness')}>
                  Add more
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5">
          <Col md={12}>
            <Card className="container-flud shadow-sm rounded-4 border-0 overflow-hidden">
              <Card.Header
                as="h4"
                className="text-center bg-primary text-white py-3 fw-bold"
              >
                INFORMATION FOR COVER LETTER
              </Card.Header>

              <ListGroup variant="flush">
                {renderItem("Visa Refusal Explanation", "visa_refusal_explanation", true)}
                {renderItem("Any Name/Age Mismatches (Self or Parents)", "name_mismatch", true)}
                {renderItem("Study Gap Explanation", "study_gap_explanation", true)}
                {renderItem("Deportation Details (if any)", "deportation_details", true)}
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5 mb-5">
          <Col md={6} className="text-center">
            <Button variant="primary" size="lg" type="submit">
              Save All Information
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default MyProfile;